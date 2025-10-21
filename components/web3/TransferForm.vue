<template>
  <div class="transfer-form">
    <h3 class="transfer-form__title">Send {{ token?.symbol || 'ETH' }}</h3>

    <form @submit.prevent="handleSubmit" class="transfer-form__form">
      <div class="form-group">
        <label for="recipient" class="form-label">Recipient Address</label>
        <input
          id="recipient"
          v-model="formData.recipient"
          type="text"
          placeholder="0x..."
          class="token-input"
          :class="{ 'form-input--error': errors.recipient }"
          required
        />
        <span v-if="errors.recipient" class="form-error">{{ errors.recipient }}</span>
      </div>

      <div class="form-group">
        <label for="amount" class="form-label">
          Amount
          <span v-if="tokenBalance" class="form-label-hint">
            Balance: {{ tokenBalance.formatted }} {{ token?.symbol || 'ETH' }}
          </span>
        </label>
        <input
          id="amount"
          v-model="formData.amount"
          type="text"
          placeholder="0.0"
          class="token-input"
          :class="{ 'form-input--error': errors.amount }"
          required
        />
        <span v-if="errors.amount" class="form-error">{{ errors.amount }}</span>
      </div>

      <div v-if="gasEstimation" class="gas-estimation">
        <div class="gas-estimation__row">
          <span>Estimated Gas:</span>
          <span>{{ gasEstimation.totalCostFormatted }} ETH</span>
        </div>
      </div>

      <button
        type="submit"
        :disabled="isLoading || !isFormValid"
        class="submit-button"
      >
        <span v-if="isLoading">Sending...</span>
        <span v-else>Send {{ token?.symbol || 'ETH' }}</span>
      </button>
    </form>

    <div v-if="txHash" class="transaction-status">
      <div class="transaction-status__success">
        ✓ Transaction sent successfully!
      </div>
      <a :href="explorerLink" target="_blank" rel="noopener noreferrer" class="transaction-status__link">
        View on Explorer →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useRuntimeConfig } from '#app'
import type { Address } from 'viem'
import { isValidAddress, normalizeAddress } from '~/lib/utils/format'
import { useTransfer, useTokenTransfer } from '~/composables/web3/useTransfer'
import { useTokenBalance } from '~/composables/web3/useTokenBalance'
import { useGasEstimation } from '~/composables/web3/useGasEstimation'
import { parseEther } from 'viem'

interface Props {
  tokenAddress?: Address
  tokenSymbol?: string
  tokenDecimals?: number
}

const props = defineProps<Props>()

const formData = reactive({
  recipient: '',
  amount: ''
})

const errors = reactive({
  recipient: '',
  amount: ''
})

// Use appropriate transfer composable based on token type
const nativeTransfer = !props.tokenAddress ? useTransfer() : null
const tokenTransfer = props.tokenAddress 
  ? useTokenTransfer(props.tokenAddress) 
  : null

const transfer = nativeTransfer || tokenTransfer!

const tokenBalance = props.tokenAddress 
  ? useTokenBalance(props.tokenAddress)
  : null

const { estimate, estimation: gasEstimation } = useGasEstimation()

const token = computed(() => {
  if (!props.tokenAddress) return null
  return {
    address: props.tokenAddress,
    symbol: props.tokenSymbol || 'TOKEN',
    decimals: props.tokenDecimals || 18
  }
})

const isLoading = computed(() => transfer.isLoading.value)
const txHash = computed(() => transfer.hash.value)

const isFormValid = computed(() => {
  return (
    isValidAddress(formData.recipient) &&
    formData.amount &&
    parseFloat(formData.amount) > 0 &&
    !errors.recipient &&
    !errors.amount
  )
})

const explorerLink = computed(() => {
  if (!txHash.value) return '#'
  const config = useRuntimeConfig()
  return `${config.public.blockExplorerUrl}/tx/${txHash.value}`
})

function validateRecipient() {
  if (!formData.recipient) {
    errors.recipient = ''
    return
  }

  if (!isValidAddress(formData.recipient)) {
    errors.recipient = 'Invalid Ethereum address'
  } else {
    errors.recipient = ''
  }
}

function validateAmount() {
  if (!formData.amount) {
    errors.amount = ''
    return
  }

  const amount = parseFloat(formData.amount)
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be greater than 0'
  } else if (tokenBalance?.balance.value && token.value) {
    const amountBigInt = parseEther(formData.amount)
    if (amountBigInt > tokenBalance.balance.value) {
      errors.amount = 'Insufficient balance'
    } else {
      errors.amount = ''
    }
  } else {
    errors.amount = ''
  }
}

async function handleSubmit() {
  validateRecipient()
  validateAmount()

  if (!isFormValid.value) {
    return
  }

  try {
    const recipient = normalizeAddress(formData.recipient) as Address

    if (token.value && tokenTransfer) {
      // ERC-20 transfer
      await tokenTransfer.transfer({
        to: recipient,
        amount: formData.amount,
        decimals: token.value.decimals
      })
    } else if (nativeTransfer) {
      // Native token transfer
      await nativeTransfer.transfer({
        to: recipient,
        amount: formData.amount
      })
    }

    // Reset form on success
    formData.recipient = ''
    formData.amount = ''
  } catch (err) {
    console.error('Transfer failed:', err)
  }
}

// Estimate gas when form changes
watch(
  () => [formData.recipient, formData.amount],
  async () => {
    if (isFormValid.value && !token.value) {
      try {
        await estimate({
          to: normalizeAddress(formData.recipient) as Address,
          value: parseEther(formData.amount)
        })
      } catch (err) {
        // Silent fail for gas estimation
      }
    }
  }
)

// Validate on input
watch(() => formData.recipient, validateRecipient)
watch(() => formData.amount, validateAmount)
</script>

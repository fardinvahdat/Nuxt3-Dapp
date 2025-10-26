# Nuxt 3 DApp Architecture 🏗️

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.10.0-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Viem](https://img.shields.io/badge/Viem-2.7.15-FF6B35?style=for-the-badge&logo=ethereum)](https://viem.sh/)
[![Vue 3](https://img.shields.io/badge/Vue-3.4.15-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[Live Demo](https://nextjs-dapp-murex.vercel.app/)**

> **Production-ready modular DApp architecture built with Nuxt 3, TypeScript, and Viem for seamless Web3 integration**

A comprehensive, scalable decentralized application (DApp) framework that provides developers with a robust foundation for building modern Web3 applications. This architecture combines the power of Nuxt 3's full-stack capabilities with Viem's lightweight Ethereum library, offering type-safe smart contract interactions, multi-chain support, and an exceptional developer experience.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📦 Tech Stack](#-tech-stack)
- [🏛️ Architecture Overview](#️-architecture-overview)
- [🔗 API & Smart Contracts](#-api--smart-contracts)
- [🧪 Testing Guide](#-testing-guide)
- [🔧 Environment Variables](#-environment-variables)
- [❗ Troubleshooting](#-troubleshooting)
- [🔒 Security Notes](#-security-notes)
- [🤝 Contributing Guide](#-contributing-guide)
- [📚 About/Motivation](#-aboutmotivation)
- [📄 License](#-license)
- [👥 Maintainers](#-maintainers)
- [🙏 Acknowledgements](#-acknowledgements)

## ✨ Features

### 🔗 **Multi-Chain Support**
- **Ethereum Mainnet & Testnets**: Full support for Ethereum, Sepolia, Goerli, Polygon, Polygon Mumbai, Arbitrum, Optimism, and Base
- **Dynamic Chain Switching**: Seamless network switching with automatic provider updates
- **Chain-Specific Configurations**: Optimized RPC endpoints and block explorers per network

### 💰 **Wallet Integration**
- **MetaMask & WalletConnect**: Native support for popular Web3 wallets
- **Auto-Reconnection**: Persistent wallet connections across browser sessions
- **Real-Time Balance Updates**: Live native currency and token balance tracking
- **Transaction Monitoring**: Comprehensive transaction status and confirmation handling

### ⚡ **Smart Contract Interactions**
- **Type-Safe Contract Calls**: Full TypeScript support with Viem's type generation
- **ERC-20 Token Support**: Complete token transfer and balance management
- **Event Listening**: Real-time blockchain event monitoring and notifications
- **Gas Estimation**: Intelligent gas price calculation and transaction cost optimization

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Built-in dark theme with system preference detection
- **Toast Notifications**: User-friendly feedback for all operations
- **Loading States**: Comprehensive loading indicators and skeleton screens

### 🛠️ **Developer Experience**
- **TypeScript First**: 100% type-safe development environment
- **Composable Architecture**: Reusable Vue composables for Web3 operations
- **Hot Module Replacement**: Instant updates during development
- **Comprehensive Error Handling**: User-friendly error messages and recovery

### 📊 **Advanced Features**
- **Multicall Support**: Batch multiple contract calls for optimal performance
- **IPFS Integration**: Decentralized content storage and retrieval
- **Pinia State Management**: Centralized application state with persistence
- **SSR/SSG Ready**: Server-side rendering support for better SEO

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `>=18.0.0`
- **pnpm**: `>=8.0.0` (recommended) or npm/yarn
- **MetaMask**: Browser extension for Web3 wallet functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nuxt-dapp-architecture.git
   cd nuxt-dapp-architecture
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables in `.env`:
   ```env
   # Required: WalletConnect Project ID
   NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

   # Optional: Enhanced RPC performance
   ALCHEMY_API_KEY=your_alchemy_api_key
   INFURA_API_KEY=your_infura_api_key
   ```

4. **Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see your DApp running!

### Build for Production

```bash
# Build the application
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## 📦 Tech Stack

### **Core Framework**
- **[Nuxt 3](https://nuxt.com/)**: The Vue.js framework for production-ready applications
- **[Vue 3](https://vuejs.org/)**: Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript for better developer experience

### **Web3 Integration**
- **[Viem](https://viem.sh/)**: Lightweight, composable, and type-safe Ethereum library
- **[Wagmi Core](https://wagmi.sh/)**: React hooks for Ethereum - adapted for Vue
- **WalletConnect**: Multi-platform Web3 wallet connections

### **State Management**
- **[Pinia](https://pinia.vuejs.org/)**: Intuitive state management for Vue
- **Pinia PersistedState**: Automatic state persistence across browser sessions

### **UI & Styling**
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **Custom SCSS**: Enhanced styling with Sass preprocessing

### **Development Tools**
- **Vitest**: Fast unit testing framework
- **Playwright**: End-to-end testing for modern web apps
- **ESLint + Prettier**: Code linting and formatting
- **Husky**: Git hooks for code quality

### **Build & Deployment**
- **Vite**: Fast build tool with HMR
- **Nitro**: Nuxt's server engine for deployment flexibility
- **TypeChain**: TypeScript bindings for Ethereum smart contracts

## 🏛️ Architecture Overview

### **Project Structure**
```
nuxt-dapp-architecture/
├── components/           # Vue components
│   ├── ui/              # Reusable UI components
│   └── web3/            # Web3-specific components
├── composables/         # Vue composables
│   └── web3/            # Web3 functionality
├── contracts/           # Smart contract ABIs
│   └── abis/            # Contract interfaces
├── layouts/             # Page layouts
├── lib/                 # Utility libraries
│   ├── constants/       # App constants
│   ├── utils/           # Helper functions
│   └── web3/            # Web3 utilities
├── pages/               # File-based routing
├── plugins/             # Nuxt plugins
├── store/               # Pinia stores
├── styles/              # Global styles
├── types/               # TypeScript definitions
└── public/              # Static assets
```

### **Key Architectural Patterns**

#### **Composable-First Approach**
All Web3 functionality is encapsulated in reusable Vue composables:

```typescript
// Wallet management
const { connect, disconnect, address, isConnected } = useWallet()

// Contract interactions
const { data, isLoading, refetch } = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'balanceOf',
  args: [address.value]
})

// Token transfers
const { transfer, isLoading } = useTransfer()
```

#### **Type-Safe Contract Integration**
Full TypeScript support for smart contract interactions:

```typescript
// Type-safe contract calls
const counterValue = useContractRead<bigint>({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  functionName: 'getValue'
})

// Type-safe contract writes
const incrementTx = useContractWrite({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  functionName: 'increment'
})
```

#### **Error Boundary Pattern**
Comprehensive error handling with user-friendly messages:

```typescript
try {
  await transfer({ to: recipient, amount: '0.1' })
} catch (error) {
  // Automatic error parsing and user notification
  console.error('Transfer failed:', error)
}
```

## 🔗 API & Smart Contracts

### **Supported Networks**
- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Goerli Testnet** (Chain ID: 5)
- **Polygon** (Chain ID: 137)
- **Polygon Mumbai** (Chain ID: 80001)
- **Arbitrum One** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Base** (Chain ID: 8453)

### **Smart Contract Integration**

#### **Counter Contract Example**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 private value;

    event Increament(string message);
    event Decreament(string message);

    function getValue() public view returns (uint256) {
        return value;
    }

    function increament() public {
        value += 1;
        emit Increament("Counter incremented successfully");
    }

    function decreament() public {
        value -= 1;
        emit Decreament("Counter decremented successfully");
    }
}
```

#### **Contract Interaction**
```typescript
import { useContractRead, useContractWrite } from '~/composables/web3/useContract'

// Read contract state
const counterValue = useContractRead({
  address: '0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe',
  abi: COUNTER_ABI,
  functionName: 'getValue',
  chainId: 11155111 // Sepolia testnet
})

// Write to contract
const increment = useContractWrite({
  address: '0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe',
  abi: COUNTER_ABI,
  functionName: 'increament'
})
```

### **ERC-20 Token Support**
Full support for ERC-20 token operations:

```typescript
import { useTokenBalance, useTokenTransfer } from '~/composables/web3'

// Check token balance
const tokenBalance = useTokenBalance('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48') // USDC

// Transfer tokens
const transferTokens = useTokenTransfer('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
await transferTokens.transfer({
  to: recipientAddress,
  amount: '100',
  decimals: 6 // USDC decimals
})
```

## 🧪 Testing Guide

### **Unit Testing**
```bash
# Run unit tests
pnpm test

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### **End-to-End Testing**
```bash
# Run E2E tests
pnpm test:e2e
```

### **Type Checking**
```bash
# Run TypeScript type checking
pnpm typecheck
```

### **Code Quality**
```bash
# Format code
pnpm format

# Lint code
pnpm lint
```

## 🔧 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# ===========================================
# WALLET CONNECT & WEB3 CONFIGURATION
# ===========================================

# WalletConnect Project ID (required for WalletConnect integration)
NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Default Chain ID for the application
NUXT_PUBLIC_DEFAULT_CHAIN_ID=1

# Enable testnet networks
NUXT_PUBLIC_ENABLE_TESTNETS=false

# ===========================================
# RPC PROVIDERS & INFRASTRUCTURE
# ===========================================

# Alchemy API Key (optional - for enhanced RPC performance)
ALCHEMY_API_KEY=your_alchemy_api_key_here

# Infura API Key (optional - alternative RPC provider)
INFURA_API_KEY=your_infura_api_key_here

# Private RPC URL (optional - for custom/private networks)
PRIVATE_RPC_URL=https://your-private-rpc-url.com

# ===========================================
# EXTERNAL SERVICES
# ===========================================

# IPFS Gateway URL
NUXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/

# Block Explorer URL
NUXT_PUBLIC_BLOCK_EXPLORER_URL=https://etherscan.io

# ===========================================
# DEVELOPMENT & DEPLOYMENT
# ===========================================

# Node Environment
NODE_ENV=development

# Application Name
NUXT_PUBLIC_APP_NAME=Nuxt DApp
```

## ❗ Troubleshooting

### **Common Issues**

#### **Wallet Connection Issues**
- **Problem**: MetaMask not connecting
- **Solution**: Ensure MetaMask is installed and unlocked. Try refreshing the page.

#### **Network Switching Problems**
- **Problem**: Unable to switch networks
- **Solution**: Add the network manually to your wallet or check network configuration.

#### **Transaction Failures**
- **Problem**: Transactions failing with "insufficient funds"
- **Solution**: Ensure you have enough ETH for gas fees plus the transaction amount.

#### **Contract Interaction Errors**
- **Problem**: Smart contract calls failing
- **Solution**: Verify you're on the correct network and the contract is deployed there.

### **Development Issues**

#### **Build Errors**
```bash
# Clear Nuxt cache
rm -rf .nuxt .output

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### **TypeScript Errors**
```bash
# Regenerate types
pnpm typecheck
```

### **Performance Optimization**

#### **Bundle Size**
- Use dynamic imports for large components
- Implement code splitting for routes
- Optimize images and assets

#### **Web3 Performance**
- Use multicall for multiple contract reads
- Implement caching for frequently accessed data
- Batch transactions when possible

## 🔒 Security Notes

### **Best Practices**
- **Never commit private keys** to version control
- **Use environment variables** for sensitive configuration
- **Validate all user inputs** before processing
- **Implement proper error handling** without exposing sensitive information
- **Use HTTPS** in production environments
- **Regularly update dependencies** for security patches

### **Smart Contract Security**
- **Verify contract addresses** before interaction
- **Use established libraries** for complex operations
- **Test thoroughly** on testnets before mainnet deployment
- **Implement access controls** and input validation
- **Monitor for reentrancy vulnerabilities**

### **Wallet Security**
- **Educate users** about wallet safety
- **Never store private keys** on the application server
- **Use wallet encryption** when available
- **Implement transaction confirmation** dialogs
- **Provide clear transaction details** before signing

## 🤝 Contributing Guide

We welcome contributions from the community! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Install dependencies: `pnpm install`
4. Make your changes
5. Run tests: `pnpm test`
6. Commit your changes: `git commit -am 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature-name`
8. Submit a pull request

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured linting rules
- **Prettier**: Code formatting is enforced
- **Conventional Commits**: Use semantic commit messages

### **Testing Requirements**
- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: Test Web3 interactions
- **E2E Tests**: Critical user flows covered

### **Documentation**
- Update README.md for new features
- Add JSDoc comments for new functions
- Update TypeScript types as needed

## 📚 About/Motivation

This project was created to address the growing need for a modern, production-ready DApp framework that combines the best of Nuxt 3's full-stack capabilities with the lightweight efficiency of Viem. Traditional DApp development often involves complex setups with multiple libraries and inconsistent patterns.

### **Key Motivations**
- **Developer Experience**: Simplify Web3 development with intuitive APIs
- **Type Safety**: Leverage TypeScript for reliable smart contract interactions
- **Performance**: Optimize for fast loading and efficient blockchain calls
- **Scalability**: Build applications that can grow with your needs
- **Maintainability**: Clean architecture that's easy to understand and extend

### **Design Principles**
- **Modular Architecture**: Components and composables that work independently
- **Progressive Enhancement**: Start simple, add complexity as needed
- **Error Resilience**: Graceful handling of network failures and user errors
- **Accessibility**: Inclusive design for all users
- **Performance First**: Optimized for speed and efficiency

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Maintainers

- **Fardin Vahdat** - *Lead Developer* - [GitHub](https://github.com/fardinvahdat) | [LinkedIn](https://www.linkedin.com/in/fardinvahdat/)

## 🙏 Acknowledgements

### **Core Technologies**
- **[Nuxt Team](https://nuxt.com/)**: For the incredible Nuxt 3 framework
- **[Viem](https://viem.sh/)**: For the lightweight Ethereum library
- **[Vue.js](https://vuejs.org/)**: For the progressive JavaScript framework
- **[Tailwind CSS](https://tailwindcss.com/)**: For the utility-first CSS framework

### **Community & Inspiration**
- **Ethereum Community**: For pioneering decentralized applications
- **Open Source Contributors**: For the libraries and tools that make this possible
- **Web3 Developers**: For pushing the boundaries of what's possible

### **Special Thanks**
- **MetaMask Team**: For the browser wallet that started it all
- **WalletConnect**: For enabling cross-platform wallet connections
- **OpenZeppelin**: For secure smart contract patterns

---

**Built with ❤️ by [Fardin Vahdat](https://github.com/fardinvahdat)**

*Ready to build the next generation of decentralized applications? Get started today!* 🚀

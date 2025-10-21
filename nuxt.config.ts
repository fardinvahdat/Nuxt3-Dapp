// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },

  css: ["~/styles/globals.css", "~/styles/ui.scss"],

  runtimeConfig: {
    // Server-side only (secret keys)
    alchemyApiKey: process.env.ALCHEMY_API_KEY || "",
    infuraApiKey: process.env.INFURA_API_KEY || "",
    privateRpcUrl: process.env.PRIVATE_RPC_URL || "",

    // Public runtime config (exposed to client)
    public: {
      appName: "Nuxt DApp",
      environment: process.env.NODE_ENV || "development",
      walletConnectProjectId:
        process.env.NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
      defaultChainId: parseInt(process.env.NUXT_PUBLIC_DEFAULT_CHAIN_ID || "1"),
      enableTestnets: process.env.NUXT_PUBLIC_ENABLE_TESTNETS === "true",
      ipfsGateway:
        process.env.NUXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/",
      blockExplorerUrl:
        process.env.NUXT_PUBLIC_BLOCK_EXPLORER_URL || "https://etherscan.io",
    },
  },

  app: {
    head: {
      title: "Nuxt DApp Architecture",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Production-ready modular DApp architecture built with Nuxt 3",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  nitro: {
    preset: "node-server",
    compressPublicAssets: true,
  },

  experimental: {
    typedPages: true,
    payloadExtraction: false,
  },

  vite: {
    optimizeDeps: {
      include: ["viem", "@wagmi/core"],
    },
  },

  compatibilityDate: "2024-01-19",
});
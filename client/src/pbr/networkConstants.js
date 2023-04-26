import config from '../config'
import {
  arbitrumRpcNodes,
  astarRpcNodes,
  bscNodes,
  bscNodesTestnet,
  harmonyNodes,
  harmonyNodesTestnet,
  moonbaseAlphaTestnet,
  moonriverNodes,
  polygonNodes,
  polygonNodesTestnet,
} from './rpcUrl'

export const bscNetworkDetail = {
  mainnet: {
    chainId: `0x${config.bscChain.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    rpcUrls: bscNodes,
    blockExplorerUrls: [`https://bscscan.com/`],
  },
  testnet: {
    chainId: `0x${config.bscChainTestent.toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    rpcUrls: bscNodesTestnet,
    blockExplorerUrls: [`https://testnet.bscscan.com`],
  },
}

export const polygonNetworkDetail = {
  mainnet: {
    chainId: `0x${config.polygon_chain_mainnet.toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'matic',
      decimals: 18,
    },
    rpcUrls: polygonNodes,
    blockExplorerUrls: [`https://polygonscan.com/`],
  },
  testnet: {
    chainId: `0x${config.polygon_chain_testnet.toString(16)}`,
    chainName: 'Polygon Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'matic',
      decimals: 18,
    },
    rpcUrls: polygonNodesTestnet,
    blockExplorerUrls: [`https://mumbai.polygonscan.com/`],
  },
}

export const harmonyNetworkDetail = {
  mainnet: {
    chainId: `0x${config.hmyChainMainnet.toString(16)}`,
    chainName: 'Harmony Mainnet',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'one',
      decimals: 18,
    },
    rpcUrls: harmonyNodes,
    blockExplorerUrls: [`https://explorer.harmony.one/`],
  },
  testnet: {
    chainId: `0x${config.hmyChainTestnet.toString(16)}`,
    chainName: 'Harmony Testnet',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'one',
      decimals: 18,
    },
    rpcUrls: harmonyNodesTestnet,
    blockExplorerUrls: [`https://explorer.pops.one/`],
  },
}

export const ethereumNetworkDetail = {
  mainnet: {
    chainId: `0x${config.chainId.toString(16)}`,
    chainName: 'Ethereum Mainnet',
    chainRaw: config.chainId,
  },
  testnet: {
    chainId: `0x${config.chainIdTestnet.toString(16)}`,
    chainName: 'Koven Testnet',
    chainRaw: config.chainId,
  },
}

export const moonriverNetworkDetail = {
  mainnet: {
    chainId: `0x${config.moonriverChain.toString(16)}`,
    chainName: 'Moonriver',
    nativeCurrency: {
      name: 'MOVR',
      symbol: 'movr',
      decimals: 18,
    },
    rpcUrls: moonriverNodes,
    blockExplorerUrls: [`https://blockscout.moonriver.moonbeam.network/`],
  },
  testnet: {
    chainId: `0x${config.moonriverChainTestent.toString(16)}`,
    chainName: 'Moonbase Alpha',
    nativeCurrency: {
      name: 'DEV',
      symbol: 'dev',
      decimals: 18,
    },
    rpcUrls: moonbaseAlphaTestnet,
    blockExplorerUrls: [
      `https://moonbase-blockscout.testnet.moonbeam.network/`,
    ],
  },
}

export const astarNetworkDetail = {
  mainnet: {
    chainId: `0x${config.astarChain.toString(16)}`,
    chainName: 'Astar',
    nativeCurrency: {
      name: 'ASTR',
      symbol: 'astr',
      decimals: 18,
    },
    rpcUrls: astarRpcNodes,
    blockExplorerUrls: [`https://astar.subscan.io`],
  },
}

export const arbitrumNetworkDetail = {
  mainnet: {
    chainId: `0x${config.arbitrumChain.toString(16)}`,
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'eth',
      decimals: 18,
    },
    rpcUrls: arbitrumRpcNodes,
    blockExplorerUrls: [`https://arbiscan.io`],
  },
}

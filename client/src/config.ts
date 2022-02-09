export default {
  chainId: 1,
  chainIdTestnet: 42,
  bscChain: 56,
  bscChainTestent: 97,
  bscRpcTestnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  bscRpcMainnet: 'https://bsc-dataseed.binance.org/',
  hmy_rpc_mainnet: 'https://api.harmony.one',
  hmy_rpc_testnet: 'https://api.s0.b.hmny.io',
  hmyChainTestnet: 1666700000,
  hmyChainMainnet: 1666600000,
  polygon_rpc_mainnet:
    'https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}', // matic mainnet rpc infura
  polygon_rpc_testnet: 'https://mumbai-explorer.matic.today', // matic testnet rpc
  polygon_chain_mainnet: 137,
  polygon_chain_testnet: 80001,
  // bscChain: 97,
  api: 'http://localhost:8020',
  coingecko: 'https://api.coingecko.com/api',
  moonriverChain: 1285,
  moonriverRpc: 'https://rpc.api.moonriver.moonbeam.network',
  moonriverChainTestent: 1287,
  moonriverRpcTestnet: 'https://rpc.api.moonbase.moonbeam.network',
  ankrEthereumRpc: 'https://rpc.ankr.com/eth',
  ankrBscRpc: 'https://rpc.ankr.com/bsc',
  ankrPolygonRpc: 'https://rpc.ankr.com/polygon',
  ankrHmyRpc: '',
  ankrMoonriverRpc: '',
}

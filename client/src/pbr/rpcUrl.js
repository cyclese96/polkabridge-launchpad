// Array of available nodes to connect to
export const bscNodes = [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
    'https://bsc-dataseed2.defibit.io/'
]
export const bscNodesTestnet = [
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/'
]

export const polygonNodes = [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro'
]
export const polygonNodesTestnet = [
    `${process.env.REACT_APP_POLYGON_TESTNET_NODE}`,
]


export const harmonyNodes = [
    'https://api.harmony.one'
]

export const harmonyNodesTestnet = [
    'https://api.s0.b.hmny.io'
]

export const moonriverNodes = [
    'https://rpc.moonriver.moonbeam.network'
]

export const moonbaseAlphaTestnet = [
    'https://rpc.testnet.moonbeam.network'
]

// export default { getBscNodeUrl };

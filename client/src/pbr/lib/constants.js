import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000
export const START_REWARD_AT_BLOCK = 3525595 // TODO
export const NUMBER_BLOCKS_PER_YEAR = 2800000 // ~7500 block/day

export const START_NEW_POOL_AT = 1609255800 // 2020/12/29 22h30

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}


// TODO: change the address & set LP pool
export const contractAddresses = {
  pbr: {
    1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695', // pbr token
    4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f'
  },
  masterChef: {
    1: '0x75B8c48Bdb04d426aeD57b36BB835aD2dC321c30',
    4: '0xfEfD5a6aD8407a7582A7207E3095dBbcec7CBE9E' // farming contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    4: '0xc778417e063141139fce010982780140aa0cd5ab' // weth
  }
}

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0xCb37b0027858796ce60ECCe4B54C45afdfF02Aca',
      4: '0x4105b114634dd5ac07a4fbf5bd3925932fcc6e0d',
    },
    tokenAddresses: {
      1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695',
      4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f',
    },
    lpExplorer: '',
    name: 'PolkaBridge PBR',
    symbol: 'polkabridge-pbr',
    description: `PBR/ETH`,
    introduce: `PolkaBridge is a decentralized all-in-one financial application platform. The ecosystem will include Cross-chain AMM, Farming, Launchpad, Lending, Prediction, and more in future.`,
    website: 'https://polkabridge.org/',
    twitter: 'https://twitter.com/realpolkabridge',
    telegram: 'https://t.me/polkabridgegroup',
    whitepaper: 'https://polkabridge.org/assets/docs/whitepaper.pdf',
    tokenSymbol: 'PBR',
    tokenExplorer: '',
    icon: '/img/tokens/pbr.png',
    total: '200 ETH',
    ratio: '100,000 PBR/ETH',
    access: 'Private',
    startAt: 1609255800 // 2020/12/29 22h30
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xCb37b0027858796ce60ECCe4B54C45afdfF02Aca',
      4: '0x4105b114634dd5ac07a4fbf5bd3925932fcc6e0d',
    },
    tokenAddresses: {
      1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695',
      4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f',
    },
    lpExplorer: '',
    name: 'PolkaBridge Public',
    symbol: 'polkabridge-public',
    description: `PBR/ETH`,
    introduce: `PolkaBridge is a decentralized all-in-one financial application platform. The ecosystem will include Cross-chain AMM, Farming, Launchpad, Lending, Prediction, and more in future.`,
    website: 'https://polkabridge.org/',
    twitter: 'https://twitter.com/realpolkabridge',
    telegram: 'https://t.me/polkabridgegroup',
    whitepaper: 'https://polkabridge.org/assets/docs/whitepaper.pdf',
    tokenSymbol: 'PBR',
    tokenExplorer: '',
    icon: '/img/tokens/pbr.png',
    total: '200 ETH',
    ratio: '100,000 PBR/ETH',
    access: 'Public',
    startAt: 1618065796 // 2021/04/10 22h30
  }
]

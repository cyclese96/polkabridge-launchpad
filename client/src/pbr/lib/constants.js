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
    4: '0xb00f8f951dc0c66f5b2a0c4b2343f1dc7c896732'
  },
  masterLaunchpad: {
    1: '0xa24022a3ce78bbe328c401390783b7ea55d77392',
    4: '0xa24022a3ce78bbe328c401390783b7ea55d77392' // launchpad contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    4: '0xc778417e063141139fce010982780140aa0cd5ab' // weth
  }
}

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      1: '0xa24022a3ce78bbe328c401390783b7ea55d77392',
      4: '0xa24022a3ce78bbe328c401390783b7ea55d77392',
    },
    tokenAddresses: {
      1: '0xcd38874f05fc2672bbdb4e2b62b56da38c63f586',
      4: '0xcd38874f05fc2672bbdb4e2b62b56da38c63f586',
    },
    lpExplorer: 'https://etherscan.io/address/0xa24022a3ce78bbe328c401390783b7ea55d77392',
    name: 'Beyond Finance',
    symbol: 'beyond-pbr',
    description: `BYN/ETH`,
    introduce: `Beyond Finance is a decentralized platform for creating and trading synthetic financial products.`,
    website: 'https://beyondfinance.io/',
    twitter: 'https://twitter.com/beyondfinancee',
    telegram: 'https://t.me/beyondfinanceglobal',
    whitepaper: 'https://beyond-finance.gitbook.io/beyond-finance/',
    tokenSymbol: 'BYN',
    tokenExplorer: 'https://etherscan.io/token/0xcd38874f05fc2672bbdb4e2b62b56da38c63f586',
    icon: '/img/tokens/byn.png',
    totalSupply: '100,000,000 BYN',
    total: '17.54 ETH',
    ratio: 3400, // 1 ETH = 3400 BYN
    min: 0.0294, // 0.0294 ETH
    max: 0.0588, // 0.0588 ETH
    access: 'Private',
    distribution: 'April 12th 2021, 15:15 UTC',
    startAt: 1609255800, // 2020/12/29 22h30
    claimAt: 1609255800 // 2020/12/29 22h30
  }
]

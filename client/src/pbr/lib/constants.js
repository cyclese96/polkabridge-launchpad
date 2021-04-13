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
    4: '0xEaa9e6F799366Ca952fE58a93D8711602AAa5d5b'
  },
  masterLaunchpad: {
    1: '0x22c97f0c1b37926dca457b9416ca1e9bc12b32be',
    4: '0x7FAE7A374C1DBfcB189ad8B8BF3b4B83A0D16F65' // launchpad contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    4: '0xc778417e063141139fce010982780140aa0cd5ab' // weth
  }
}

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {//launchpad ct
      1: '0x22c97f0c1b37926dca457b9416ca1e9bc12b32be',
      4: '0x7FAE7A374C1DBfcB189ad8B8BF3b4B83A0D16F65',
    },
    tokenAddresses: {
      1: '0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
      4: '0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
    },
    lpExplorer: 'https://etherscan.io/address/0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
    name: 'Beyond Finance',
    symbol: 'beyond-pbr',
    description: `BYN/ETH`,
    introduce: `Beyond Finance is a decentralized platform for creating and trading synthetic financial products.`,
    website: 'https://beyondfinance.io/',
    twitter: 'https://twitter.com/beyondfinanceio',
    telegram: 'https://t.me/beyondfinanceglobal',
    whitepaper: 'https://beyond-finance.gitbook.io/beyond-finance/',
    tokenSymbol: 'BYN',
    tokenExplorer: 'https://etherscan.io/token/0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
    icon: '/img/tokens/byn.png',
    totalSupply: '100,000,000 BYN',
    total: '13.95 ETH',
    ratio: 4300, // 1 ETH = 4300 BYN, 1eth=2150$
    min: 0.1, // 215$
    max: 0.233, // 500$ , 0.28 600$
    access: 'Private',
    distribution: 'April 13th 2021, 18:00 UTC',
    startAt: 1618329600,
    endAt: 1618333140,
    claimAt: 1618336800
  }
]

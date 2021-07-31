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

export const ethereumNetwork = 'ethereum';
export const bscNetwork = 'bsc';

// TODO: change the address & set LP pool
export const contractAddresses = {
  pbr: {
    1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695', // pbr token
    42: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0'
  },
  masterLaunchpad: {
    1: '0xa7bd4E1C3D08DfFCBfA60b7619c76788D114b664',
    42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD' // launchpad contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    42: '0xd0a1e359811322d97991e03f863a0c30c2cf029c' // weth
  },
  launchpadBsc: {
    56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
    97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930'
  }
}

export const supportedPools = [
  {
    pid: -1,
    lpAddresses: {//launchpad ct
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
      42: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
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
    network: ethereumNetwork,
    distribution: 'April 13th 2021, 18:00 UTC',
    startAt: 1618329600,
    endAt: 1618333140,
    claimAt: 1618336800,
    startDate: "April 14th 2021, 15:00 UTC"
  },
  {
    pid: -2,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'Zenchain',
    symbol: 'ZEN-PBR',
    description: `ZEN/ETH`,
    introduce: `ZenChain is a dedicated blockchain that is optimized specifically for DeFi and NFT applications`,
    website: 'https://zenchain.co',
    twitter: 'https://twitter.com/zenchainco',
    telegram: 'https://t.me/zenchaingroup',
    whitepaper: 'https://docs.zenchain.co',
    tokenSymbol: 'ZEN',
    tokenExplorer: 'https://etherscan.io/token',
    icon: '/img/tokens/zen.png',
    totalSupply: '100,000,000 ZEN',
    total: '17.647 ETH',//1eth=3k4$
    ratio: 11333,
    min: 0.1,
    max: 0.1176,
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'May 24th 2021, 21:00 UTC',
    startAt: 1621350000,
    endAt: 1621353600,
    claimAt: 1621894200,
    startDate: "May 18th 2021, 15:00 UTC"
  },
  {
    pid: -3,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930'
    },
    tokenAddresses: {
      1: '0x16153214e683018d5aa318864c8e692b66e16778',
      42: '0x16153214e683018d5aa318864c8e692b66e16778',
      56: "0x16153214E683018D5aA318864c8e692b66E16778",
      97: "0x16153214e683018d5aa318864c8e692b66e16778"
    },
    lpBscExplorer: 'https://bscscan.com/address/0x16153214e683018d5aa318864c8e692b66e16778',//
    lpExplorer: 'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    name: 'PolkaWar',
    symbol: 'PWAR',
    description: `PWAR/BNB`,
    introduce: `PolkaWar is a blockchain based NFT gaming platform and marketplace. Inspired by the recent crypto NFT and gaming narratives, PolkaWar will combine and synergize them both to build an attractive platform.`,
    website: 'https://polkawar.com/',
    twitter: 'https://twitter.com/polkawarnft',
    telegram: 'https://t.me/polkawarchat',
    whitepaper: 'https://polkawar.com/docs/whitepaper.pdf',
    tokenSymbol: 'PWAR',
    tokenExplorer: 'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    icon: '/img/tokens/polkawar.png',
    totalSupply: '100,000,000 PWAR',
    total: '433.3 BNB',//1BNB=300$
    ratio: 2000,
    min: 1,//300$
    max: 2.66,//800$
    maxTier1: 1,//300$
    maxTier2: 2,//600$
    maxTier3: 2.66,//800$
    access: 'Public',
    network: bscNetwork,
    distribution: 'June 28th 2021, 16:15 UTC',
    startAt: 1624894215,//test data
    endAt: 1624896000,//test data
    claimAt: 1624896900,//1724378323,//test data
    startDate: "June 28th 2021"
  },
  {
    pid: -4,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930'
    },
    tokenAddresses: {
      1: '0x16153214e683018d5aa318864c8e692b66e16778',
      42: '0x16153214e683018d5aa318864c8e692b66e16778',
      56: "0x16153214E683018D5aA318864c8e692b66E16778",
      97: "0x16153214e683018d5aa318864c8e692b66e16778"
    },
    lpExplorer: 'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    name: 'PolkaWar',
    symbol: 'PWAR',
    description: `PWAR/BNB`,
    introduce: `PolkaWar is a blockchain based NFT gaming platform and marketplace. Inspired by the recent crypto NFT and gaming narratives, PolkaWar will combine and synergize them both to build an attractive platform.`,
    website: 'https://polkawar.com/',
    twitter: 'https://twitter.com/polkawarnft',
    telegram: 'https://t.me/polkawarchat',
    whitepaper: 'https://polkawar.com/docs/whitepaper.pdf',
    tokenSymbol: 'PWAR',
    tokenExplorer: 'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    icon: '/img/tokens/polkawar.png',
    totalSupply: '100,000,000 PWAR',
    total: '566.6 BNB',//1BNB=300$
    ratio: 2000,
    min: 1,//300$
    max: 2.66,//800$
    maxTier1: 1,//300$
    maxTier2: 2,//600$
    maxTier3: 2.66,//800$
    access: 'Private',
    network: bscNetwork,
    distribution: 'June 28th 2021, 16:15 UTC',
    startAt: 1624894215,//test data
    endAt: 1624896000,//test data
    claimAt: 1624896900,//test data
    startDate: "June 28th 2021"
  },
  {
    pid: -5,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
      42: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    },
    lpExplorer: 'https://etherscan.io/address/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    name: 'DragonBite',
    symbol: 'BITE-PBR',
    description: `BITE/ETH`,
    introduce: `DragonBite is a truly open decentralised Asset Management platform for customers to store and swap all kinds of digital assets in One App with One password`,
    website: 'https://dragonbite.io',
    twitter: 'https://twitter.com/DragonBiteDB',
    telegram: 'https://t.me/DragonBite',
    whitepaper: 'https://dragonbite-media.s3-ap-southeast-1.amazonaws.com/media/DragonBiteWhitePaper_8c67.pdf',
    tokenSymbol: 'BITE',
    tokenExplorer: 'https://etherscan.io/token/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    icon: '/img/tokens/bite.png',
    totalSupply: '1,000,000,000 BITE',
    total: '16 ETH',//1eth=2k500
    ratio: 100000,
    min: 0.12,//300$
    max: 0.2,//500$
    maxTier1: 0.12,//300$
    maxTier2: 0.16,//400$
    maxTier3: 0.2,//500$
    access: 'Public',
    network: ethereumNetwork,
    distribution: 'June 11th 2021, 16:15 UTC',
    startAt: 1623420000,
    //startAt: 1523420000,//test
    endAt: 1623423600,
    //endAt: 1623219170,
    claimAt: 1623428100,
    startDate: "June 11th 2021"
  },
  {
    pid: -6,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
      42: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    },
    lpExplorer: 'https://etherscan.io/address/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    name: 'DragonBite',
    symbol: 'BITE-PBR',
    description: `BITE/ETH`,
    introduce: `DragonBite is a truly open decentralised Asset Management platform for customers to store and swap all kinds of digital assets in One App with One password`,
    website: 'https://dragonbite.io',
    twitter: 'https://twitter.com/DragonBiteDB',
    telegram: 'https://t.me/DragonBite',
    whitepaper: 'https://dragonbite-media.s3-ap-southeast-1.amazonaws.com/media/DragonBiteWhitePaper_8c67.pdf',
    tokenSymbol: 'BITE',
    tokenExplorer: 'https://etherscan.io/token/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    icon: '/img/tokens/bite.png',
    totalSupply: '1,000,000,000 BITE',
    total: '24 ETH',
    ratio: 100000,
    min: 0.12,//300$
    max: 0.2,//500$
    maxTier1: 0.12,//300$
    maxTier2: 0.16,//400$
    maxTier3: 0.2,//500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'June 11th 2021, 16:15 UTC',
    startAt: 1623420000,
    // startAt: 1523420000,//test
    endAt: 1623423600,
    //endAt: 1623219170,
    claimAt: 1623428100,
    startDate: "June 11th 2021"
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xa7bd4E1C3D08DfFCBfA60b7619c76788D114b664',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '0xD342EEBE6FE7e12d727815e532dF53e27E1E6be7',
      42: '0xD342EEBE6FE7e12d727815e532dF53e27E1E6be7',
    },
    lpExplorer: 'https://etherscan.io/address/0xD342EEBE6FE7e12d727815e532dF53e27E1E6be7',
    name: 'CFL365 Finance',
    symbol: 'CFL365-ETH',
    description: `CFL365/ETH`,
    introduce: `CFL365 Finance is a trustless, decentralized oracle for skill based virtual trading contests for cryptocurrencies and stocks markets.`,
    website: 'https://www.cfl365.finance',
    twitter: 'https://twitter.com/cfl365_finance',
    telegram: 'https://t.me/cfl365finance',
    whitepaper: 'https://docsend.com/view/99u5akxhmcpfai3i',
    tokenSymbol: 'CFL365',
    tokenExplorer: 'https://etherscan.io/token/0xD342EEBE6FE7e12d727815e532dF53e27E1E6be7',
    icon: '/img/tokens/cfl.svg',
    totalSupply: '400,000,000 CFL365',
    total: '30 ETH',
    ratio: 41666,//1eth=2k5
    min: 0.16,//400$
    max: 0.24,//600$
    maxTier1: 0.16,//400$
    maxTier2: 0.2,//500$
    maxTier3: 0.24,//600$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'Aug 05th 2021',
    startAt: 1628172000,
    endAt: 1628175600,
    claimAt: 1628180100,
    startDate: "Aug 05th 2021"
  },
  {
    pid: 4,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'Cryptopunt',
    symbol: 'PUN-PBR',
    description: `PUN/ETH`,
    introduce: `Cryptopunt is quickly becoming the leading blockchain-based gaming and gambling platform.`,
    website: 'https://www.cryptopunt.com/',
    twitter: 'https://twitter.com/PuntCrypto',
    telegram: 'https://t.me/CryptoPunt',
    whitepaper: 'https://www.cryptopunt.com/download_file/74/1',
    tokenSymbol: 'PUN',
    tokenExplorer: 'https://etherscan.io/token',
    icon: '/img/tokens/punt.jpg',
    totalSupply: '160,000,000 PUN',
    total: 'TBA',
    ratio: 0,
    min: 0.12,//300$
    max: 0.2,//500$
    maxTier1: 0.12,//300$
    maxTier2: 0.16,//400$
    maxTier3: 0.2,//500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'TBA',
    startAt: 0,
    endAt: 1921147665,
    claimAt: 0,
    startDate: "TBA"
  },
  {
    pid: 5,
    lpAddresses: {
      1: '',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'Cryptopunt',
    symbol: 'PUN-PBR',
    description: `PUN/ETH`,
    introduce: `Cryptopunt is quickly becoming the leading blockchain-based gaming and gambling platform.`,
    website: 'https://www.cryptopunt.com/',
    twitter: 'https://twitter.com/PuntCrypto',
    telegram: 'https://t.me/CryptoPunt',
    whitepaper: 'https://www.cryptopunt.com/download_file/74/1',
    tokenSymbol: 'PUN',
    tokenExplorer: 'https://etherscan.io/token',
    icon: '/img/tokens/punt.jpg',
    totalSupply: '160,000,000 PUN',
    total: 'TBA',
    ratio: 0,
    min: 0.12,//300$
    max: 0.2,//500$
    maxTier1: 0.12,//300$
    maxTier2: 0.16,//400$
    maxTier3: 0.2,//500$
    access: 'Public',
    network: ethereumNetwork,
    distribution: 'TBA',
    startAt: 0,
    endAt: 1921147665,
    claimAt: 0,
    startDate: "TBA"
  }

]

export const bscChainIds = [56, 97]
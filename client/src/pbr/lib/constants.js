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

export const ethereumNetwork = 'ethereum'
export const bscNetwork = 'bsc'
export const polygonNetwork = 'polygon'
export const harmonyNetwork = 'harmony'
export const moonriverNetwork = 'moonriver'
export const astarNetwork = 'astar'

export const tokenIdMapping = {
  ethereum: 'ethereum',
  bsc: 'binancecoin',
  polygon: 'polygon',
  harmony: 'harmony',
  moonriver: 'moonriver',
  astar: "astar"
}

// TODO: change the address & set LP pool
export const contractAddresses = {
  pbr: {
    1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695', // pbr token
    42: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
  },
  masterLaunchpad: {
    1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
    42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d', // launchpad contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    42: '0xd0a1e359811322d97991e03f863a0c30c2cf029c', // weth
  },
  launchpadBsc: {
    56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
    97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
  },
  // launchpadHarmony: {
  //   1666700000: '',  //mainnet
  //   1666600000: '0xae8aaf92013dc8f7fa22fe01e56271c93b24058f'//testnet
  // }
}

const testing = false

export const currentConnection = testing ? 'testnet' : 'mainnet'

export const stakeContractAddresses = {
  ethereum: {
    1: '0x1b46b72c5280f30Fbe8A958B4f3c348FD0fD2E55',
    42: '0x7678f0AF7304e01554E2D49D96E55C8de4975c66',
  },
  polygon: {
    137: '0x6335aF028e77B574423733443678aD4cb9e15B3D',
    80001: '0x55950cF279Ba5b43263f4Df54833b85F684B333F',
  },
  bsc: {
    56: '0x064dE1e65df3F40Afd7fb9E8A1Af61bD4545f4a1',
  },
  harmony: {
    //todo:
  },
}

// access types
export const PUBLIC = 'Public'
export const PRIVATE = 'Private'
export const WHITELIST = 'Whitelist'
export const GUARANTEED = 'Guaranteed'

export const supportedPools = [
  {
    pid: -1,
    lpAddresses: {
      //launchpad ct
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
      42: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
    },
    lpExplorer:
      'https://etherscan.io/address/0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
    name: 'Beyond Finance',
    symbol: 'beyond-pbr',
    description: `BYN/ETH`,
    introduce: `Beyond Finance is a decentralized platform for creating and trading synthetic financial products.`,
    website: 'https://beyondfinance.io/',
    twitter: 'https://twitter.com/beyondfinanceio',
    telegram: 'https://t.me/beyondfinanceglobal',
    whitepaper: 'https://beyond-finance.gitbook.io/beyond-finance/',
    tokenSymbol: 'BYN',
    tokenExplorer:
      'https://etherscan.io/token/0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca',
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
    startDate: 'April 14th 2021, 15:00 UTC',
  },
  {
    pid: -2,
    lpAddresses: {
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
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
    total: '17.647 ETH', //1eth=3k4$
    ratio: 11333,
    min: 0.1,
    max: 0.1176,
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'May 24th 2021, 21:00 UTC',
    startAt: 1621350000,
    endAt: 1621353600,
    claimAt: 1621894200,
    startDate: 'May 18th 2021, 15:00 UTC',
  },
  {
    pid: -3,
    lpAddresses: {
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    tokenAddresses: {
      1: '0x16153214e683018d5aa318864c8e692b66e16778',
      42: '0x16153214e683018d5aa318864c8e692b66e16778',
      56: '0x16153214E683018D5aA318864c8e692b66E16778',
      97: '0x16153214e683018d5aa318864c8e692b66e16778',
    },
    lpBscExplorer:
      'https://bscscan.com/address/0x16153214e683018d5aa318864c8e692b66e16778', //
    lpExplorer:
      'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    name: 'PolkaWar',
    symbol: 'PWAR',
    description: `PWAR/BNB`,
    introduce: `PolkaWar is a blockchain based NFT gaming platform and marketplace. Inspired by the recent crypto NFT and gaming narratives, PolkaWar will combine and synergize them both to build an attractive platform.`,
    website: 'https://polkawar.com/',
    twitter: 'https://twitter.com/polkawarnft',
    telegram: 'https://t.me/polkawarchat',
    whitepaper: 'https://polkawar.com/docs/whitepaper.pdf',
    tokenSymbol: 'PWAR',
    tokenExplorer:
      'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    icon: '/img/tokens/polkawar.png',
    totalSupply: '100,000,000 PWAR',
    total: '433.3 BNB', //1BNB=300$
    ratio: 2000,
    min: 1, //300$
    max: 2.66, //800$
    maxTier1: 1, //300$
    maxTier2: 2, //600$
    maxTier3: 2.66, //800$
    access: 'Public',
    network: bscNetwork,
    distribution: 'June 28th 2021, 16:15 UTC',
    startAt: 1624894215, //test data
    endAt: 1624896000, //test data
    claimAt: 1624896900, //1724378323,//test data
    startDate: 'June 28th 2021',
  },
  {
    pid: -4,
    lpAddresses: {
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    tokenAddresses: {
      1: '0x16153214e683018d5aa318864c8e692b66e16778',
      42: '0x16153214e683018d5aa318864c8e692b66e16778',
      56: '0x16153214E683018D5aA318864c8e692b66E16778',
      97: '0x16153214e683018d5aa318864c8e692b66e16778',
    },
    lpExplorer:
      'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    name: 'PolkaWar',
    symbol: 'PWAR',
    description: `PWAR/BNB`,
    introduce: `PolkaWar is a blockchain based NFT gaming platform and marketplace. Inspired by the recent crypto NFT and gaming narratives, PolkaWar will combine and synergize them both to build an attractive platform.`,
    website: 'https://polkawar.com/',
    twitter: 'https://twitter.com/polkawarnft',
    telegram: 'https://t.me/polkawarchat',
    whitepaper: 'https://polkawar.com/docs/whitepaper.pdf',
    tokenSymbol: 'PWAR',
    tokenExplorer:
      'https://bscscan.com/token/0x16153214e683018d5aa318864c8e692b66e16778',
    icon: '/img/tokens/polkawar.png',
    totalSupply: '100,000,000 PWAR',
    total: '566.6 BNB', //1BNB=300$
    ratio: 2000,
    min: 1, //300$
    max: 2.66, //800$
    maxTier1: 1, //300$
    maxTier2: 2, //600$
    maxTier3: 2.66, //800$
    access: 'Private',
    network: bscNetwork,
    distribution: 'June 28th 2021, 16:15 UTC',
    startAt: 1624894215, //test data
    endAt: 1624896000, //test data
    claimAt: 1624896900, //test data
    startDate: 'June 28th 2021',
  },
  {
    pid: -5,
    lpAddresses: {
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
      42: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    },
    lpExplorer:
      'https://etherscan.io/address/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    name: 'DragonBite',
    symbol: 'BITE-PBR',
    description: `BITE/ETH`,
    introduce: `DragonBite is a truly open decentralised Asset Management platform for customers to store and swap all kinds of digital assets in One App with One password`,
    website: 'https://dragonbite.io',
    twitter: 'https://twitter.com/DragonBiteDB',
    telegram: 'https://t.me/DragonBite',
    whitepaper:
      'https://dragonbite-media.s3-ap-southeast-1.amazonaws.com/media/DragonBiteWhitePaper_8c67.pdf',
    tokenSymbol: 'BITE',
    tokenExplorer:
      'https://etherscan.io/token/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    icon: '/img/tokens/bite.png',
    totalSupply: '1,000,000,000 BITE',
    total: '16 ETH', //1eth=2k500
    ratio: 100000,
    min: 0.12, //300$
    max: 0.2, //500$
    maxTier1: 0.12, //300$
    maxTier2: 0.16, //400$
    maxTier3: 0.2, //500$
    access: 'Public',
    network: ethereumNetwork,
    distribution: 'June 11th 2021, 16:15 UTC',
    startAt: 1623420000,
    //startAt: 1523420000,//test
    endAt: 1623423600,
    //endAt: 1623219170,
    claimAt: 1623428100,
    startDate: 'June 11th 2021',
  },
  {
    pid: -6,
    lpAddresses: {
      1: '',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
      42: '0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    },
    lpExplorer:
      'https://etherscan.io/address/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    name: 'DragonBite',
    symbol: 'BITE-PBR',
    description: `BITE/ETH`,
    introduce: `DragonBite is a truly open decentralised Asset Management platform for customers to store and swap all kinds of digital assets in One App with One password`,
    website: 'https://dragonbite.io',
    twitter: 'https://twitter.com/DragonBiteDB',
    telegram: 'https://t.me/DragonBite',
    whitepaper:
      'https://dragonbite-media.s3-ap-southeast-1.amazonaws.com/media/DragonBiteWhitePaper_8c67.pdf',
    tokenSymbol: 'BITE',
    tokenExplorer:
      'https://etherscan.io/token/0x4eed0fa8de12d5a86517f214c2f11586ba2ed88d',
    icon: '/img/tokens/bite.png',
    totalSupply: '1,000,000,000 BITE',
    total: '24 ETH',
    ratio: 100000,
    min: 0.12, //300$
    max: 0.2, //500$
    maxTier1: 0.12, //300$
    maxTier2: 0.16, //400$
    maxTier3: 0.2, //500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'June 11th 2021, 16:15 UTC',
    startAt: 1623420000,
    // startAt: 1523420000,//test
    endAt: 1623423600,
    //endAt: 1623219170,
    claimAt: 1623428100,
    startDate: 'June 11th 2021',
  },
  {
    pid: -7,
    lpAddresses: {
      1: '0xa7bd4E1C3D08DfFCBfA60b7619c76788D114b664',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '0xcd6adc6b8bd396e2d53ccd7d7257b4de55be4fbe',
      42: '0xcd6adc6b8bd396e2d53ccd7d7257b4de55be4fbe',
    },
    lpExplorer:
      'https://etherscan.io/address/0xcd6adc6b8bd396e2d53ccd7d7257b4de55be4fbe',
    name: 'CFL365 Finance',
    symbol: 'CFL365-ETH',
    description: `CFL365/ETH`,
    introduce: `CFL365 Finance is a trustless, decentralized oracle for skill based virtual trading contests for cryptocurrencies and stocks markets.`,
    website: 'https://www.cfl365.finance',
    twitter: 'https://twitter.com/cfl365_finance',
    telegram: 'https://t.me/cfl365finance',
    whitepaper: 'https://docsend.com/view/99u5akxhmcpfai3i',
    tokenSymbol: 'CFL365',
    tokenExplorer:
      'https://etherscan.io/token/0xcd6adc6b8bd396e2d53ccd7d7257b4de55be4fbe',
    icon: '/img/tokens/cfl.svg',
    totalSupply: '400,000,000 CFL365',
    total: '30 ETH',
    ratio: 41666, //1eth=2k5
    min: 0.01, //400$
    max: 0.24, //600$
    maxTier1: 0.16, //400$
    maxTier2: 0.2, //500$
    maxTier3: 0.24, //600$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'Aug 05th 2021',
    startAt: 1628172000,
    endAt: 1628175600,
    claimAt: 1628191800,
    startDate: 'Aug 05th 2021',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'Shoefy',
    symbol: 'SHOE-PBR',
    description: `SHOE/ETH`,
    introduce: `Shoefy - Contemporary way of repositioning the Non-Fungible Token (NFT) in an unprecedented method with the help of Fungible Tokens (FT`,
    website: 'https://www.shoefy.io/',
    twitter: 'https://twitter.com/ShoeFyio',
    telegram: 'https://t.me/ShoeFy_Official',
    whitepaper: 'https://docsend.com/view/s/3y24gmfcbcdnvmmg',
    tokenSymbol: 'SHOE',
    tokenExplorer: 'https://etherscan.io/token',
    icon: '/img/tokens/shoefy.png',
    totalSupply: '100,000,000 SHOE',
    total: '28.57 ETH', //1ETH =3k5$
    ratio: 8750, //1 SHOE 0.4$
    min: 0.142, //500$
    max: 0.2, //700$
    maxTier1: 0.142, //500$
    maxTier2: 0.171, //600$
    maxTier3: 0.2, //700$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '50% TGE after 1h Uniswap listing, 50% next month',
    startAt: 1633960800, //real 1633960800
    endAt: 1633964400, //real 1633964400
    claimAt: 1634648400, //real 1634648400
    startDate: '2PM UTC 11th Oct',
    claimTimeArr: [1634648400, 1637280000],
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0x31903e333809897ee57af57567f4377a1a78756c',
      42: '0x31903e333809897ee57af57567f4377a1a78756c',
    },
    lpExplorer:
      'https://etherscan.io/address/0x31903e333809897ee57af57567f4377a1a78756c',
    name: 'Cryptopunt',
    symbol: 'PUN-PBR',
    description: `PUN/ETH`,
    introduce: `Cryptopunt is quickly becoming the leading blockchain-based gaming and gambling platform.`,
    website: 'https://www.cryptopunt.com/',
    twitter: 'https://twitter.com/PuntCrypto',
    telegram: 'https://t.me/CryptoPunt',
    whitepaper: 'https://www.cryptopunt.com/download_file/74/1',
    tokenSymbol: 'PUN',
    tokenExplorer:
      'https://etherscan.io/token/0x31903e333809897ee57af57567f4377a1a78756c',
    icon: '/img/tokens/punt.jpg',
    totalSupply: '160,000,000 PUN',
    total: '16.2 ETH', //1ETH =3k7$
    ratio: 16818, //1PUN =0.22$
    min: 0.081, //300$
    max: 0.135, //500$
    maxTier1: 0.081, //300$
    maxTier2: 0.108, //400$
    maxTier3: 0.135, //500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '50% TGE after  Uniswap listing, 50% next month',
    startAt: 1634554800,
    endAt: 1634558400,
    claimAt: 1634563800,
    startDate: '2PM UTC Oct 18th 2021',
    claimTimeArr: [1634563800, 1637168400],
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
      42: '0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
    },
    lpExplorer:
      'https://etherscan.io/token/0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
    name: 'ReBaked',
    symbol: 'BAKED-PBR',
    description: `BAKED/MATIC`,
    introduce: `ReBaked is building a set of governance, management, and operations tools for DAOs and Web 3.0 ecosystems to better distribute and manage their treasuries- focusing on value creation`,
    website: 'https://www.rebaked.com/',
    twitter: 'https://twitter.com/rebakedinc',
    telegram: 'https://t.me/rebakedann',
    whitepaper: 'https://docsend.com/view/axuv2dhmiqpbk7vu',
    tokenSymbol: 'BAKED',
    tokenExplorer:
      'https://etherscan.com/address/0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
    icon: '/img/tokens/rebaked.png',
    totalSupply: '300,000,000 BAKED',
    total: '7.5 ETH', //1ETH=4k
    ratio: 133333.33, //1 BAKED=0.03$
    min: 0.075, //300$
    max: 0.125, //500$
    maxTier1: 0.075, //300$
    maxTier2: 0.1, //400$
    maxTier3: 0.125, //500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '33% on TGE, then 33% monthly over 2 months',
    startAt: 1636253020,
    endAt: 1634907600,
    claimAt: 1636253020, //1635831420,//1635249600,
    startDate: '12PM UTC 22nd Oct, 2021',
    claimTimeArr: [1635249600, 1637859600, 1640451600],
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0x65e6b60ea01668634d68d0513fe814679f925bad',
      42: '0x65e6b60ea01668634d68d0513fe814679f925bad',
    },

    lpExplorer:
      'https://etherscan.com/address/0x65e6b60ea01668634d68d0513fe814679f925bad',
    name: 'PixelVerse',
    symbol: 'PIXEL-PBR',
    description: `PIXEL/ETH`,
    introduce: `PixielVerse is a virtual world platform and toolset that lets creators and communities create their own NFTs in a next generation metaverse.`,
    website: 'https://pixelverse.ai/',
    twitter: 'https://twitter.com/pixelverse1',
    telegram: 'https://t.me/pixelverseofficial',
    whitepaper: 'https://pixelverse.ai/assets/pdf/deck.pdf',
    tokenSymbol: 'PIXEL',
    tokenExplorer:
      'https://etherscan.com/token/0x65e6b60ea01668634d68d0513fe814679f925bad',
    icon: '/img/tokens/pixelverse.png',
    totalSupply: '1,000,000,000 PIXEL',
    total: '11.9 ETH',
    ratio: 280000, // 1ETH=4200,  $0.015
    min: 0.071, //300$
    max: 0.119, //500$
    maxTier1: 0.071, //300$
    maxTier2: 0.095, //400$
    maxTier3: 0.119, //500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '100% on TGE',
    startAt: 1635781661,
    endAt: 1635865200,
    claimAt: 1636171200,
    startDate: '2PM UTC, 2nd Nov 2021',
    claimTimeArr: [1636171200],
  },

  {
    pid: 9,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0xdefac16715671b7b6aeefe012125f1e19ee4b7d7',
      42: '0xdefac16715671b7b6aeefe012125f1e19ee4b7d7',
    },
    lpExplorer:
      'https://etherscan.io/address/0xdefac16715671b7b6aeefe012125f1e19ee4b7d7',
    name: 'Defactor',
    tokenId: 'defactor',
    symbol: 'FACTR-PBR',
    description: `FACTR/ETH`,
    introduce: `Defactor reduces the barriers to entry for Real World Asset Originators by providing tools to manage and scale their processes and giving investors transparency and governance over the assets being traded.`,
    website: 'https://defactor.com/',
    twitter: 'https://twitter.com/defactor_',
    telegram: ' https://t.me/defactor_official',
    whitepaper: ' https://defactor.docsend.com/view/ndqzghfjjat5a5ik',
    tokenSymbol: 'FACTR',
    tokenExplorer:
      'https://etherscan.io/token/0xdefac16715671b7b6aeefe012125f1e19ee4b7d7',
    icon: '/img/tokens/defactor.svg',
    totalSupply: '300,000,000 FACTR',
    total: '10.86 ETH', //1ETH =4k6$
    ratio: 65714.28, //0.07$
    min: 0.065, //300$
    max: 0.108, //500$
    maxTier1: 0.065, //300$
    maxTier2: 0.086, //400$
    maxTier3: 0.108, //500$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '25% TGE. 25% per month, for next 3 months',
    startAt: 1636380000,
    endAt: 1636383600,
    claimAt: 1636812000,
    startDate: '2PM UTC 8th Nov, 2021',
    claimTimeArr: [1636812000, 1639328400, 1642006800],
    harvestDistribution: [25, 25, 25],
  },
  {
    pid: 10,
    poolId: 1, // add pool id in this symbol if pool ID of the ido is not same as pid
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    tokenAddresses: {
      1: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
      42: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
      137: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
      80001: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
    },
    lpExplorer:
      'https://polygonscan.com/address/0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
    name: 'FabWelt',
    tokenId: 'fabwelt',
    symbol: 'WELT-PBR',
    description: `WELT/MATIC`,
    introduce: `FABWELT creates a gaming platform that brings blockchain technology into the core of high quality games of all types or genres. We achieve this by utilizing the finest tech of both worlds, beautiful high-quality games and the latest blockchain technology.`,
    website: 'https://www.fabwelt.com/',
    twitter: 'https://twitter.com/fabwelttoken',
    telegram: 'https://t.me/FabweltToken',
    whitepaper: 'https://www.fabwelt.com/public/Fabwelt-whitepaper.pdf',
    tokenSymbol: 'WELT',
    tokenExplorer:
      'https://polygonscan.com/address/0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
    icon: '/img/tokens/fbwelt.jpg',
    totalSupply: '500,000,000 WELT',
    total: '29411 MATIC', //1Matic=1.7$
    ratio: 121.42, //0.014
    min: 176.47, //300$
    max: 294.11, //500$
    maxTier1: 176.47, //300$
    maxTier2: 235.29, //400$
    maxTier3: 294.11, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution:
      '50% at TGE after 30 minutes. 50% after one month of DEX listing',
    startAt: 1636725600, //1636725540
    endAt: 1636729200,
    claimAt: 1637069400,
    startDate: '2PM UTC 12th Nov, 2021',
    claimTimeArr: [1637069400, 1639661400],
  },

  {
    pid: 11,
    poolId: 3,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    tokenAddresses: {
      1: '',
      42: '',
      137: '',
      80001: '',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'PlayerMon',
    tokenId: 'playermon',
    symbol: 'PYM-PBR',
    description: `PYM/MATIC`,
    introduce: `Playermon is a boundless NFT Game where anyone can explore and battle in the universe with their favorite space companions called Playermons!`,
    website: 'https://playermon.com/',
    twitter: 'https://twitter.com/playermons',
    telegram: 'https://t.me/playermonofficial',
    whitepaper: 'https://whitepaper.playermon.com/',
    tokenSymbol: 'PYM',
    tokenExplorer: 'https://polygonscan.com/address',
    icon: '/img/tokens/playmon.png',
    totalSupply: '1,000,000,000 PYM',
    total: '32258 MATIC', //1Matic=1.55$,1 PYM = 0.038 USD
    ratio: 40.78, //0.038$
    min: 193.5, //300$
    max: 322.5, //500$
    maxTier1: 193.5, //300$
    maxTier2: 258, //400$
    maxTier3: 322.5, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: '50% during TGE, 50% 1 month after TGE',
    startAt: 1637244000,
    endAt: 1637247600,
    claimAt: 1637551800,
    startDate: '2PM UTC 18th Nov, 2021',
    claimTimeArr: [1637551800, 1640131200],
  },
  {
    pid: 12,
    poolId: 5,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    tokenAddresses: {
      1: '',
      42: '',
      137: '',
      80001: '',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'TryHards',
    tokenId: 'tryhards',
    symbol: 'TRY-PBR',
    description: `TRY/MATIC`,
    introduce: `Tryhards is an NFT Based Blockchain Shooter game. Play Win Earn. Gain more power, Fight for honour and conquer Planet X.`,
    website: 'https://tryhards.io/',
    twitter: 'https://twitter.com/Tryhardsio',
    telegram: 'https://t.me/Tryhards_io_official',
    whitepaper: 'https://tryhards.io/assets/Tryhards_Alpha_Battle_Log.pdf',
    tokenSymbol: 'TRY',
    tokenExplorer: 'https://polygonscan.com/address',
    icon: '/img/tokens/tryhards.png',
    totalSupply: '200,000,000 TRY',
    total: '19480 MATIC', //1Matic=1.54$
    ratio: 17.1, //1 TRY=0.09$
    min: 194.8, //300$
    max: 324.6, //500$
    maxTier1: 194.8, //300$
    maxTier2: 259.7, //400$
    maxTier3: 324.6, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: '34% on TGE, then 33% monthly over 2 months',
    startAt: 1637330400,
    endAt: 1637334000,
    claimAt: 1637773200,
    startDate: '2PM UTC 19th Nov, 2021',
    claimTimeArr: [1637773200, 1640304000, 1642982400],
  },
  {
    pid: 13,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0xE5d0AbA2e6429A469b4a1AA427ED85Fcc38526aa',
      97: '0x7f35Cc76091f477fdB4B06D54463699d1bBe6EF3',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '0xa2e3e2817f00822f3c1e71a604eca4196af923d6',
      97: '',
    },
    lpExplorer:
      'https://bscscan.com/address/0xa2e3e2817f00822f3c1e71a604eca4196af923d6',
    name: 'Torekko',
    tokenId: 'torekko',
    symbol: 'TRK-PBR',
    description: `TRK/BNB`,
    introduce: `Torekko is an ecosystem that allows users to acquire NFT collectibles representing characters, places or entities from the world of Japanese animation with real licences. The project is based on the Bsc and Eth blockchain (BEP-20 / ERC-721).`,
    website: 'https://torekko.com/',
    twitter: 'https://twitter.com/torekkocom',
    telegram: 'https://t.me/torekko',
    whitepaper: 'https://docsend.com/view/s3nnspuswq6w9yyq/d/h5v7983cv274w9u6',
    tokenSymbol: 'TRK',
    tokenExplorer:
      'https://bscscan.com/token/0xa2e3e2817f00822f3c1e71a604eca4196af923d6',
    icon: '/img/tokens/torekko.png',
    totalSupply: '100,000,000 TRK',
    total: '89.2 BNB', // 1BNB = 560$
    ratio: 4307.69, //token price 0.13, 1BNB = 560$
    min: 0.17, //100$
    max: 0.53, //300$
    maxTier1: 0.17, //100$
    maxTier2: 0.35, //200$
    maxTier3: 0.53, //300$
    maxWhitelistPurchase: 0.89,
    access: 'Private',
    network: bscNetwork,
    distribution: '34% on TGE, then 33% monthly over 2 months',
    startAt: 1637766000,
    endAt: 1637769600,
    claimAt: 1638279000,
    startDate: '2PM UTC 24th Nov, 2021',
    claimTimeArr: [1638279000, 1641043800, 1643549400],
    harvestDistribution: [34, 33, 33],
  },
  {
    pid: 14,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0xFee058c0a75f096e7d16a4f2d3b9b6C6419f2187',
      97: '0x15AD83591E091cE24dAE664a195bDB60F5CBF877',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'Cheesus DeFi',
    symbol: 'CHEESUS-PBR',
    description: `CHEESUS/BNB`,
    introduce: `Multichain analytical platform & aggregator for all DeFi Industry. Real-time precise & reliable data about all Yield Farming, Liquidity pools, Upcoming tokensales & Indexes throughout Ethereum, BSC, HECO Chain and Polkadot.`,
    website: 'https://defirating.finance/',
    twitter: 'https://twitter.com/CheesusDeFi',
    telegram: 'https://t.me/cheesus_MAIN_eng',
    whitepaper:
      'https://168aggregator.notion.site/DeFi-Rating-Multichain-DeFi-Dashboard-Analytical-Platform-c23701169e35493f801dff7dc0b42ac1',
    tokenSymbol: 'CHEESUS',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/chessus.png',
    totalSupply: '200,000,000 CHEESUS',
    total: '84.7 BNB', // 1BNB = 590$
    ratio: 15526.3, //token price 0.038, 1BNB = 590$
    min: 0.16, //100$
    max: 0.5, //300$
    maxTier1: 0.16, //100$
    maxTier2: 0.33, //200$
    maxTier3: 0.5, //300$
    maxWhitelistPurchase: 0.84,
    access: 'Private',
    network: bscNetwork,
    distribution: 'TGE: 30%, 1st month 30%, 2nd month 30%, 3rd month 10%',
    startAt: 1637848860,
    endAt: 1637852400,
    claimAt: 0,
    startDate: '2PM UTC 25th Nov, 2021',
    claimTimeArr: [0, 0, 0, 0],
    harvestDistribution: [30, 30, 30, 10],
  },
  {
    pid: 15,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0x1ced64bc451ae89b435f4a6b0c089ce308b593ca',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'PeopleZ',
    tokenId: 'peoplez',
    symbol: 'LEZ-PBR',
    description: `LEZ/BNB`,
    introduce: `The engagment between a VIP and the community is always hard, and the social network are not a solution. Peoplez is here to give you a new experience, where you can be part of something that actually is impossible. A total involvment where you can finally touch something of concrete, and have an interaction with your idols which seemed impossible until now. `,
    website: 'https://www.peoplez.io/',
    twitter: 'https://twitter.com/Peoplez_io',
    telegram: 'https://t.me/Peoplez_io',
    whitepaper:
      'https://ce251279-e551-4984-841a-5796bf3cd4ff.filesusr.com/ugd/491357_c78348f1d22e44d1925af7e39b3e2326.pdf',
    tokenSymbol: 'LEZ',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/peoplez.svg',
    totalSupply: '18,000,000 LEZ',
    total: '83.3 BNB', //1BNB = 600$
    ratio: 857.1, //0.7$
    min: 0.16, //100$
    max: 0.5, //300$
    maxTier1: 0.16, //100$
    maxTier2: 0.33, //200$
    maxTier3: 0.5, //300$
    maxWhitelistPurchase: 1.66, //1k
    access: 'Private',
    network: bscNetwork,
    distribution: '50% TGE, 50% next month',
    startAt: 1638196230,
    endAt: 1638199800,
    claimAt: 1638278100,
    startDate: '2PM UTC 29th Nov, 2021',
    claimTimeArr: [1638278100, 1640869200],
    harvestDistribution: [50, 50],
  },
  {
    pid: 16,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0x76498dc2a3074c5f4d1b7bd9b1ae7ee19bbc9cb9',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'WidiLand',
    tokenId: 'widiland',
    symbol: 'WIDI-PBR',
    description: `WIDI/BNB`,
    introduce: `WidiLand is an NFT Game started in June 2021, aiming to become a globally well-known social networking game.`,
    website: 'https://widiland.com/',
    twitter: 'https://twitter.com/WidiLand/',
    telegram: 'https://t.me/widilandglobal',
    whitepaper: 'https://docs.widiland.com/widiland-1/',
    tokenSymbol: 'WIDI',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/widiland.png',
    totalSupply: '400,000,000 WIDI',
    total: '116.6 BNB', //1BNB = 600$
    ratio: 15000, //token price 0.04, 1BNB = 600$
    min: 0.16, //100$
    max: 0.5, //300$
    maxTier1: 0.16, //100$
    maxTier2: 0.33, //200$
    maxTier3: 0.5, //300$
    maxWhitelistPurchase: 0.08, //special 1k, public whitelist 50$,1.66
    access: 'Private', //Private
    network: bscNetwork,
    distribution: '25% at TGE, 25% per month in next 3 months',
    startAt: 1638284430, //whitelist round 1638280830, private round 1638284430
    endAt: 1638287100, //whitelist round 1638283500, private round 1638287100
    claimAt: 1638352800,
    startDate: '2PM UTC 30th Nov, 2021',
    claimTimeArr: [1638352800, 1641031200, 1643709600, 1646128800],
    harvestDistribution: [25, 25, 25, 25],
  },
  {
    pid: 17,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
      56: '0x2e19653139e70c600aab7cb541674a456b1fbe23',
      97: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '0x3Fb2Adf906030a5BebDBf9EF42AAD978151a2676',
      97: '',
    },
    lpExplorer:
      'https://bscscan.com/address/0x3Fb2Adf906030a5BebDBf9EF42AAD978151a2676',
    name: 'ArcadeNetwork',
    tokenId: 'arcadenetwork',
    symbol: 'ARC-PBR',
    description: `ARC/BNB`,
    introduce: `ArcadeNetwork is the world’s first decentralised platform providing cross metaverse asset interoperability. Making use of Blockchain technology & NFTs, ArcadeNetwork creates a unified relayer bridge that enables seamless movement of in-game assets`,
    website: 'https://arcadenet.io/',
    twitter: 'https://twitter.com/ArcadeNetwork_',
    telegram: 'https://t.me/ArcadeNetworkOfficial',
    whitepaper: 'https://arcadenet.io/Arcadenet_white_paper-.pdf',
    tokenSymbol: 'ARC',
    tokenExplorer:
      'https://bscscan.com/address/0x3Fb2Adf906030a5BebDBf9EF42AAD978151a2676',
    icon: '/img/tokens/arcade.png',
    totalSupply: '222,500,000 ARC',
    total: '81.9 BNB', //1BNB=610$
    ratio: 10166.6, //0.06$
    min: 0.16, //100$
    max: 0.49, //300$
    maxTier1: 0.16, //100$
    maxTier2: 0.32, //200$
    maxTier3: 0.49, //300$
    maxWhitelistPurchase: 1.63,
    access: 'Private',
    network: bscNetwork,
    distribution: '25% TGE, 25% per month in next 3 months',
    startAt: 1638453630,
    endAt: 1638457200,
    claimAt: 1638799800,
    startDate: '2PM UTC 2nd Dec, 2021',
    claimTimeArr: [1638799800, 1641477630, 1644156030, 1646575230],
    harvestDistribution: [25, 25, 25, 25],
  },
  {
    pid: 18,
    poolId: 3,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
      56: '0xb1a6dd107d6c2885497a6fb6d5b13218244154e8',
      97: '0x978E55b71E74051B136AAbAE2d6e4bD0cA714439',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'SolClout',
    tokenId: 'solclout',
    symbol: 'SCT-PBR',
    description: `SCT/ETH`,
    introduce: `SolClout is envisioning a platform to build a formidable community powered by Solana, a high throughput, scalable public blockchain project. Powered by blockchain technology, users are able to also utilize a social networking platform free from censorship.`,
    website: 'https://solclout.com/',
    twitter: 'https://twitter.com/solclout',
    telegram: 'https://t.me/solclout',
    whitepaper:
      'https://drive.google.com/file/d/1bM_b8CsMD8AQkd5F8hCt-lTKBRNvWiCs/view?usp=sharing',
    tokenSymbol: 'SCT',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/solc.png',
    totalSupply: '1,000,000,000 SCT',
    total: '175.4 BNB', //1BNB = 570$
    ratio: 38000, //1 SOLC = 0.015
    min: 0.17, //100$
    max: 0.17, //300$
    maxTier1: 0.17, //100$
    maxTier2: 0.17, //200$
    maxTier3: 0.17, //300$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '50% TGE, 25% per month in next 2 months',
    startAt: 1638986400,
    endAt: 1638990000,
    claimAt: 0,
    startDate: '2PM UTC 8th Dec, 2021',
    claimTimeArr: [],
    harvestDistribution: [],
    registerForm: '',
  },

  {
    pid: 20,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
      56: '0x921cad4688dc908b89f83cd3b2c7c69bc3838d69',
      97: '0x259D9aD2D584477A99396Eef8A4fee1798B0daaA',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'DeflyBall',
    symbol: 'DEFLY-PBR',
    description: `DEFLY/BNB`,
    introduce: `DeflyBall - THE FIRST-EVER FLYBALL DOGS METAVERSE RACING GAME ON BSC`,
    website: 'https://www.deflyball.com/',
    twitter: 'https://twitter.com/DeflyBall',
    telegram: 'https://t.me/deflyball_official',
    whitepaper:
      'https://drive.google.com/file/d/1ydxIjgCGM5ly_305ibra-i3eFLqw9ibw/view',
    tokenSymbol: 'DEFLY',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/defly.svg',
    totalSupply: '100,000,000 DEFLY',
    total: '87.7 BNB', // 1BNB = 570$
    ratio: 5700, //token price 0.1, 1BNB = 590$
    min: 0, //100$
    max: 0, //300$
    maxTier1: 0, //100$
    maxTier2: 0, //200$
    maxTier3: 0, //300$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '34% at TGE, 33% per month in next 2 months',
    startAt: 1639144800,
    endAt: 1639148400,
    claimAt: 1639573800,
    startDate: '2PM UTC 10th Dec, 2021',
    claimTimeArr: [1639573800, 1642179600, 1644858000],
    harvestDistribution: [34, 33, 33],
    registerForm: 'https://forms.gle/nPvKNvUwmNv2DpUL9',
  },
  {
    pid: 21,
    poolId: 3,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x921cad4688dc908b89f83cd3b2c7c69bc3838d69',
      97: '0x259D9aD2D584477A99396Eef8A4fee1798B0daaA',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'CasperPad',
    tokenId: 'casperpad',
    symbol: 'CSPD-PBR',
    description: `CSPD/BNB`,
    introduce: `CasperPad is the first Casper-supported decentralized Launchpad built to launch next level projects on the Casper Network.`,
    website: 'https://www.casper-pad.com/',
    twitter: 'https://twitter.com/Casper_Pad',
    telegram: 'http://t.me/CasperPadPublic',
    whitepaper: 'https://www.casper-pad.com/',
    tokenSymbol: 'CSPD',
    tokenExplorer: 'https://bscscan.com/token/',
    icon: '/img/tokens/cspd.png',
    totalSupply: '500,000,000 CSPD',
    total: '175.4 BNB', //1BNB=570
    ratio: 71250, //0.008$
    min: 0, //100$
    max: 0, //300$
    maxTier1: 0, //100$
    maxTier2: 0, //200$
    maxTier3: 0, //300$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: 'TGE 5% and then each month for 5 months 19%',
    startAt: 1639152000,
    endAt: 1639155600,
    claimAt: 1639166400,
    startDate: '4PM UTC 10th Dec, 2021',
    claimTimeArr: [
      1639166400, 1641841200, 1644519600, 1646938800, 1649617200, 1652209200,
    ],
    harvestDistribution: [5, 19, 19, 19, 19, 19],
    registerForm: 'https://forms.gle/UdGDPxk5HYux4wD2A',
  },

  {
    pid: 22,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xc95d0846dd8342c112844c6c3d04199897acf903',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'SnapEx',
    tokenId: 'snapex',
    symbol: 'SNAP-PBR',
    description: `SNAP/BNB`,
    introduce: `THE SNAP TOKEN IS THE NATIVE BLOCKCHAIN PROTOCOL OF SNAPEX, BRINGING TOGETHER BOTH DEFI AND CEX MODELS, ALLOWING BOTH RETAIL AND INSTITUTIONAL-LEVEL CUSTOMERS TO PARTICIPATE IN CRYPTO CFD TRADING (CONTRACT FOR DIFFERENCES). WE ARE MAKING THE MASS-ADOPTION OF DIGITAL ASSETS HAPPEN BY ACTING AS THE FINAL BRIDGE BETWEEN TRADITIONAL AND DIGITAL FINANCE.`,
    website: 'https://token.snapex.com/',
    twitter: 'https://twitter.com/snapexofficial',
    telegram: 'https://t.me/snapex_en',
    whitepaper:
      'https://token.snapex.com/wp-content/uploads/2021/11/Whitepaper-November-2021.pdf',
    tokenSymbol: 'SNAP',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/snapex.png',
    totalSupply: '2,000,000,000 SNAP',
    total: '190.47 BNB', //525$
    ratio: 17500, //0.03$
    min: 0, //100$
    max: 0, //300$
    maxTier1: 0, //100$
    maxTier2: 0, //200$
    maxTier3: 0, //300$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: 'Unlock 25% on day 1, and 15% monthly for following 5 months',
    startAt: 1639490400,
    endAt: 1639494000,
    claimAt: 1639746000,
    startDate: '2PM UTC 14th Dec, 2021',
    claimTimeArr: [
      1639746000, 1642428000, 1645106400, 1647525600, 1650204000, 1652796000,
    ],
    harvestDistribution: [25, 15, 15, 15, 15, 15],
    registerForm: 'https://forms.gle/jZQDxSvVNymV7WAV9',
  },
  {
    pid: 23,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xcd4f3d7ed4fd3dfb675a329dc72a4f8f1795a2d3',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'Calo',
    symbol: 'CALO-PBR',
    description: `CALO/BNB`,
    introduce: `Calo App is a healthy application based on blockchain technology. Workout everyday, burn your calories, participate in challenges and earn money`,
    website: 'https://calo.run/',
    twitter: 'https://twitter.com/AppCalo',
    telegram: 'https://t.me/caloapp',
    whitepaper: 'https://docs.calo.run/',
    tokenSymbol: 'CALO',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/calo.png',
    totalSupply: '500,000,000 CALO',
    total: '100 BNB', // 1BNB = 500$
    ratio: 14285.7, //token price 0.035, 1BNB = 600$
    min: 0,
    max: 0,
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '25% TGE, 25% monthly vesting',
    startAt: 1640008800,
    endAt: 1640012400,
    claimAt: 1640105100,
    startDate: '2PM UTC 20th Dec, 2021',
    claimTimeArr: [1640105100, 1642782600, 1645461000, 1647880200],
    harvestDistribution: [25, 25, 25, 25],
    registerForm: 'https://forms.gle/NzFyrFrL5bBzZRyZA',
  },
  {
    pid: 24,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x302b7f2351f7f064f7c2be48386e0762c0cf5348',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Graviton Zero',
    tokenId: 'graviton-zero',
    symbol: 'GRAV-PBR',
    description: `GRAV/BNB`,
    introduce: `Graviton Zero is a Play to Earn Star Citizen Eve Online inspired next gen Sci-Fi MMORPG METAVERSE that will enable players to actually own in game Assets, Ships and Land all verified on the blockchain. Players will be able to trade/fight/explore in a fully decentralized universe with immersive and groundbreaking gameplay. Ecosystem to be fully player run, with player trade missions and bounties.`,
    website: 'https://gravitonzero.com/',
    twitter: 'https://twitter.com/GravitonZero',
    telegram: 'https://t.me/GravitonZero',
    whitepaper: 'https://docsend.com/view/y8kd99rup5jbdh4y/d/tivncrheisckx84r',
    tokenSymbol: 'GRAV',
    tokenExplorer: 'https://bscscan.com/token/',
    icon: '/img/tokens/grv.png',
    totalSupply: '300,000,000 GRAV',
    total: '97 BNB', //1BNB=515
    ratio: 5150, //0.1$
    min: 0,
    max: 0,
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '10% at TGE, 30% per month in next 3 months',
    startAt: 1640095200,
    endAt: 1640098800,
    claimAt: 1640109600,
    startDate: '2PM UTC 21th Dec, 2021',
    claimTimeArr: [1640109600, 1642788000, 1645466400, 1647885600],
    harvestDistribution: [10, 30, 30, 30],
    registerForm: 'https://forms.gle/ii2DzcWYkQa18eh6A',
  },
  {
    pid: 25,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x56d750197ec332fceb574ca22cd4e40965712c86',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Battle Saga',
    tokenId: 'battle-saga',
    symbol: 'BTL-PBR',
    description: `BTL/BNB`,
    introduce: `Battle Saga is a decentralized and innovative DAO gaming platform. Players can build their base camps, train troops and crush their opponents.`,
    website: 'https://www.battlesaga.io/',
    twitter: 'https://twitter.com/BattleSagaio',
    telegram: 'https://t.me/BattleSaga_Official',
    whitepaper: 'https://docsend.com/view/s/xyywe48d3aarig5b',
    tokenSymbol: 'BTL',
    tokenExplorer: 'https://bscscan.com/token/',
    icon: '/img/tokens/battlesaga.png',
    totalSupply: '300,000,000 BTL',
    total: '192.3 BNB', //1BNB=520
    ratio: 4333.3, //0.12$
    min: 0,
    max: 0,
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '10% at TGE, 30% per month in next 3 months',
    startAt: 1640181600,
    endAt: 1640185200,
    claimAt: 0,
    startDate: '2PM UTC 22th Dec, 2021',
    claimTimeArr: [],
    harvestDistribution: [],
    registerForm: 'https://forms.gle/fDQFDMeETr89PpPb8',
  },
  {
    pid: 26,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x9ce703762878c69874e8951f92e8ba2142dc9dce',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Age Of Gods',
    symbol: 'AOG-PBR',
    description: `AOG/BNB`,
    introduce: `AOG is an AFKArena inspired game that uses the fundamentals of the 6.6 million! player count success story and combining it with a Blockchain Token economy and Play-to-Earn, Idle Game mechanics. Developed by a Premier Game Studio`,
    website: 'https://ageofgods.net/',
    twitter: 'https://twitter.com/ageofgodsnet',
    telegram: 'https://t.me/ageofgodsnet',
    whitepaper: 'https://docsend.com/view/rrpekisnfmcyyvf4',
    tokenSymbol: 'AOG',
    tokenExplorer: 'https://bscscan.com/token/',
    icon: '/img/tokens/aog.png',
    totalSupply: '270,000,000 AOG',
    total: '94.3 BNB', //1BNB=530$
    ratio: 4416.6, //0.12$
    min: 0.37,
    max: 0.37,
    maxTier1: 0.37,
    maxTier2: 0.37,
    maxTier3: 0.37,
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '10% at TGE, 30% per month in next 3 months',
    startAt: 1640621700,
    endAt: 1640624340,
    claimAt: 0,
    startDate: '2PM UTC 27th Dec, 2021',
    claimTimeArr: [],
    harvestDistribution: [],
    registerForm: 'https://forms.gle/aX3kfJxyDCsAwEsY7',
  },
  {
    pid: 26,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xf5658d4a37975489541f8dc03fedada605c78c8b',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '0xACf34Edcc424128CccC730Bf85CDaceEbCb3eEce',
      97: '',
    },
    lpExplorer:
      'https://bscscan.com/address/0xACf34Edcc424128CccC730Bf85CDaceEbCb3eEce',
    name: 'VoiceStreet',
    symbol: 'VST-PBR',
    description: `VST/BNB`,
    introduce: `VoiceStreet is an music-based NFT platform with the goal of building Web3.0 on-chain infrastructure for intellectual properties mainly including Music all rights, Artists related IPs, Music derivatives NFTs, and NFT Gamification.`,
    website: 'https://voicestreet.org/',
    twitter: 'https://twitter.com/voicestreetnft',
    telegram: 'https://t.me/VoiceStreet',
    whitepaper: ' https://voicestreet.org/whitepaper/VoiceStreetwhitepaper.pdf',
    tokenSymbol: 'VST',
    tokenExplorer:
      'https://bscscan.com/token/0xACf34Edcc424128CccC730Bf85CDaceEbCb3eEce',
    icon: '/img/tokens/vst.png',
    totalSupply: '2B VST',
    total: '96.1 BNB', //1BNB=520
    ratio: 13000, //0.04$
    min: 0, //100$
    max: 0, //300$
    maxTier1: 0, //100$
    maxTier2: 0, //200$
    maxTier3: 0, //300$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '100% at TGE',
    startAt: 1640786400,
    endAt: 1640790000,
    claimAt: 1643112000,
    startDate: '2PM UTC 29th Dec, 2021',
    claimTimeArr: [1643112000],
    harvestDistribution: [100],
    registerForm: 'https://forms.gle/jZi9LynDxgdeJZ9TA',
  },
  {
    pid: 27,
    poolId: 1,
    lpAddresses: {
      1: '0xa090c395f674f74e1ac71a79769bd33ebaece502',
      42: '0xa090c395f674f74e1ac71a79769bd33ebaece502',
      56: '0xa090c395f674f74e1ac71a79769bd33ebaece502',
      97: '0xa090c395f674f74e1ac71a79769bd33ebaece502',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: '',
    name: 'DefiYield Private Sale - ',
    symbol: 'DEFI-PBR',
    description: `DEFI/BNB`,
    introduce: `The DEFIYIELD ecosystem is the best place for anyone to participate in DeFi because it has been built by yield farming experts who want as many people as possible to stay safe and succeed in the Finance 3.0 revolution. Read more at https://blog.defiyield.app/introducing-defiyield-the-safest-and-most-accessible-defi-yield-farming-ecosystem-1c1248c8982a`,
    website: 'https://defiyield.app/',
    twitter: 'https://twitter.com/defiyield_app',
    telegram: 'https://t.me/defiyield_app',
    whitepaper: 'https://docsend.com/view/t64qjsqeinrtceg8',
    tokenSymbol: 'DEFI',
    tokenExplorer: '',
    icon: '/img/tokens/defiyield.png',
    totalSupply: '1,000,000,000 DEFI',
    price: 0.24,
    total: '265 BNB', // 1BNB = 415$, 110k$
    ratio: 1729.1, //0.24$
    min: 1,
    max: 2,
    maxTier1: 1,
    maxTier2: 2,
    maxTier3: 2,
    access: PUBLIC,
    network: bscNetwork,
    distribution:
      'Vested over 9 months with daily linear unlock at DefiYield portal (will be shared in another announcement)',
    startAt: 1645110900,
    endAt: 1645113600,
    claimAt: 0,
    startDate: '2PM UTC 17th Feb, 2022',
    harvestDistribution: [0],
    registerForm: 'https://forms.gle/7FTfZH5XWhifJwBa9',
  },
  {
    pid: 28,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x39f2e22e971eb1144643bc22d84e039e59768373',
      97: '0x39f2e22e971eb1144643bc22d84e039e59768373',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'CloudName',
    symbol: 'CNAME-PBR',
    description: `CNAME/BNB`,
    introduce: `Cloudname is a simple yet powerful tool through which you can discover new domains and find meaningful data of almost every registered domain. Everything comes with a brand new design wrapper by a top-in-class platform.`,
    website: 'https://cloudname.com/',
    twitter: 'https://twitter.com/cloudnamecom',
    telegram: 'https://t.me/cloudnameofficial',
    whitepaper: 'https://cloudname.com',
    tokenSymbol: 'CNAME',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/cname.png',
    totalSupply: '380,000,000 CNAME',
    price: 0.06,
    total: '135 BNB', // 1BNB = 370$, 50k$
    ratio: 6166.6, //0.06$
    min: 0.3, //300$
    max: 0.5, //500$
    maxTier1: 0.3, //300$
    maxTier2: 0.4, //400$
    maxTier3: 0.5, //500$
    access: PRIVATE,
    network: bscNetwork,
    distribution: '100% at TGE',
    startAt: 1645370103,
    endAt: 1645372800,
    claimAt: 1645549200,
    startDate: '2PM UTC 20th Feb, 2022',
    harvestDistribution: [100],
    registerForm: 'https://forms.gle/S7r2SRpVizgoH4X49',
  },
  {
    pid: 29,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x2b728f8b396e8f8cfc390a65186a1d2eb0623685',
      97: '0x2b728f8b396e8f8cfc390a65186a1d2eb0623685',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '0xA41eE9a01fd417c372B318746d8891c0C240A73c',
      97: '',
    },
    lpExplorer:
      'https://bscscan.com/address/0xA41eE9a01fd417c372B318746d8891c0C240A73c',
    name: 'Endless Battlefield',
    symbol: 'EB-PBR',
    description: `EB/BNB`,
    introduce: `Endless Battlefield, abbreviated as EB, is a military strategy and exploration sandbox metaverse built on Unreal Engine. Using planets as the map, it provides multiple modes to fulfill the needs of different players such as collection module, hunting and fishing module, face-squeezing module, building module. The game supports intensive FPS/TPS modes which allows competitive players to enjoy the experience of galloping over the battlefield and conquering the military points. The Metaverse also creates immersive environments for casual players, allowing them to harvest, mine, lumber, fish, hunt and craft tools.It also includes various FPS competitive game play methods to satisfy competitive players.Aiming to build a rich and entertaining metaverse, EB also introduces unique Alliance System, Construction System, Homeland System and Trading System`,
    website: 'https://ebgame.io/',
    twitter: 'https://twitter.com/EBMetaverse',
    telegram: 'https://t.me/ebgame_global',
    whitepaper:
      'https://ebgame.io/files/EndlessBattlefield_Introduction.V2.7.en.pdf?v=1',
    tokenSymbol: 'EB',
    tokenExplorer:
      'https://bscscan.com/address/0xA41eE9a01fd417c372B318746d8891c0C240A73c',
    icon: '/img/tokens/eb.JPG',
    totalSupply: '1,000,000,000 EB',
    price: 0.2,
    total: '133.3 BNB', // 1BNB = 375$, 50k$
    ratio: 1875, //0.2$
    min: 0.37,
    max: 1,
    maxTier1: 0.37,
    maxTier2: 0.7,
    maxTier3: 1,
    access: PRIVATE,
    network: bscNetwork,
    distribution:
      '25% at TGE, 75% will release in 4 months with 18,75% per month',
    startAt: 1645634700,
    endAt: 1645639200,
    claimAt: 1645804800,
    startDate: '3:30PM UTC 23rd Feb, 2022',
    harvestDistribution: [25, 18.75, 18.75, 18.75, 18.75],
    registerForm: 'https://forms.gle/TpHeTFzW2GnLBWfdA',
  },
  {
    pid: 30,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      1287: '0x7A2d1a8Ee512De3810b153883257Bf865CA0ec3f', //testnet
      1285: '0xe8a46C6CE5c39b54b854bf91a1CC34F72c97B483', //mainnet
    },
    tokenAddresses: {
      1: '',
      42: '',
      1287: '',
      1285: '',
    },
    lpExplorer: 'https://moonriver.moonscan.io/address/',
    name: 'AlphaDex',
    tokenId: 'alphadex',
    symbol: 'ROAR-PBR',
    description: `ROAR/MOVR`,
    introduce: `Alphadex is an innovative decentralized AMM, Incubator, Yield Farming & NFT Launch solution powered by MoonRiver & Ethereum.`,
    website: 'https://alphadex.io/',
    twitter: 'https://twitter.com/thealphadex',
    telegram: 'https://t.me/alphadexio',
    whitepaper: 'https://docsend.com/view/s/i97dbf746he9wmd3',
    tokenSymbol: 'ROAR',
    tokenExplorer: 'https://moonriver.moonscan.io/address/',
    icon: '/img/tokens/alphadex.jpg',
    totalSupply: '120,000,000 ROAR',
    total: '727.2 MOVR', //110$
    ratio: 500, //0.22$
    min: 1.26,
    max: 4.98,
    maxTier1: 4.98,
    maxTier2: 4.98,
    maxTier3: 4.98,
    access: PUBLIC,
    network: moonriverNetwork,
    distribution: '20% at TGE, 40% per month in next 2 months',
    startAt: 1642605300,
    endAt: 1642608000,
    claimAt: 1643277600,
    startDate: '2PM UTC 19th Jan, 2022',
    claimTimeArr: [1643277600, 1645956000, 1648375200],
    harvestDistribution: [20, 40, 40],
    registerForm: 'https://forms.gle/fjuprj9yqSrWbwhk9',
  },
  {
    pid: 31,
    poolId: 1,
    lpAddresses: {
      1: '0xc479b7909dd33fb036fda62f66bc3ebbe480c766',
      42: '0xc479b7909dd33fb036fda62f66bc3ebbe480c766',
      56: '',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'AnimalConcerts',
    symbol: 'ANML-PBR',
    description: `ANML/ETH`,
    introduce: `Animal Concerts is creating the next generation entertainment experience. We provide intimate and truly unique venues for top artists to perform and leverage cutting edge VR technology to stream to audiences globally in the metaverse. Our cryptocurrency, marketplace and NFT platform will change the shape of the music industry enabling new revenues and markets, rewarding artists and fans.`,
    website: 'https://animalconcerts.com/',
    twitter: 'https://twitter.com/animalconcerts',
    telegram: 'https://t.me/animalconcertsofficial',
    whitepaper:
      'https://animalconcerts.com/wp-content/uploads/2021/12/Animal-White-Paper-V1.1.pdf',
    tokenSymbol: 'ANML',
    tokenExplorer: 'https://etherscan.io/address',
    icon: '/img/tokens/animal.png',
    totalSupply: '12.5B ANML',
    total: '33.3 ETH', // 1eth = 3k$, 100k$
    ratio: 666666.6, //$0.0045
    min: 0.1,
    max: 0.25,
    maxTier1: 0.25,
    maxTier2: 0.25,
    maxTier3: 0.25,
    access: GUARANTEED,
    network: ethereumNetwork,
    distribution: '25% TGE, 25% every 2 months in next 6 months',
    startAt: 1642522500,
    endAt: 1642525140,
    claimAt: 1648573200,
    startDate: '2PM UTC 18th Jan, 2022',
    claimTimeArr: [1648573200, 1653843600, 1659114000, 1664470800],
    harvestDistribution: [25, 25, 25, 25],
    registerForm: 'https://forms.gle/6VvBTPWzv8g5g1so8',
  },
  {
    pid: 32,
    poolId: 1,
    lpAddresses: {
      1: '0x55ad2ff5363f2a155187e644bbb66f3584fd18dc',
      42: '0x55ad2ff5363f2a155187e644bbb66f3584fd18dc',
      56: '0x55ad2ff5363f2a155187e644bbb66f3584fd18dc',
      97: '0x55ad2ff5363f2a155187e644bbb66f3584fd18dc',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Nomad Exiles',
    symbol: 'PRIDE-PBR',
    description: `PRIDE/BNB`,
    introduce: `Nomad Exiles is an exciting crypto RPG game with the integrated NFTs and free-to-play mechanics! The project is being developed on the basis of a mobile RPG game with more than a million installations around the world.`,
    website: 'https://pridemetaverse.io/',
    twitter: 'https://twitter.com/NomadExiles',
    telegram: 'https://t.me/NomadExiles',
    whitepaper:
      'https://nomad-exiles.gitbook.io/internal-wiki/nomad-exiles/about-the-game',
    tokenSymbol: 'PRIDE',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/nomad.svg',
    totalSupply: '250,000,000 PRIDE',
    price: 0.1,
    total: '246.9 BNB', // 1BNB = 405$
    ratio: 4050, //0.1$
    min: 1,
    max: 2,
    maxTier1: 1,
    maxTier2: 1.5,
    maxTier3: 2,
    access: PRIVATE,
    network: bscNetwork,
    distribution: '10% at TGE, 90% will release in 9 months with 10% per month',
    startAt: 1648307700,
    endAt: 1648310400,
    claimAt: 1648905000,
    startDate: '2PM UTC 26th March, 2022',
    harvestDistribution: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    claimTimeArr: [
      1648905000, 1651496400, 1654088400, 1656680400, 1659272400, 1661864400,
      1664456400, 1667048400, 1669640400, 1672232400,
    ],
    registerForm: 'https://forms.gle/1G6w1AUfRZvCCVvP6',
  },
  {
    pid: 33,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x17c40b2a10d7f05cac876247d8d9e4d561e27fcf',
      97: '0x17c40b2a10d7f05cac876247d8d9e4d561e27fcf',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Kyte',
    symbol: 'KTE-PBR',
    description: `KTE/BNB`,
    introduce: `Innovative tools for blockchain startups & traditional marketers alike. Run customized campaigns, distribute rewards on-chain & boost your project instantaneously.`,
    website: 'https://www.kyte.one/',
    twitter: 'https://twitter.com/kyteone',
    telegram: 'https://t.me/kyteone',
    whitepaper: 'https://www.kyte.one/papers/whitepaper.pdf',
    tokenSymbol: 'KTE',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/kyte.png',
    totalSupply: '50,000,000 KTE',
    price: 0.18,
    total: '128 BNB', // 1BNB = 390$
    ratio: 2166.6, //0.18$
    min: 0.5,
    max: 1.5,
    maxTier1: 0.5,
    maxTier2: 1,
    maxTier3: 1.5,
    access: PRIVATE,
    network: bscNetwork,
    distribution: '40% upfront release, then 20% every month',
    startAt: 1650294900,
    endAt: 1650297600,
    claimAt: 1650502800,
    startDate: '2PM UTC 18th April, 2022',
    harvestDistribution: [40, 20, 20, 20],
    claimTimeArr: [1650502800, 1653094800, 1655773200, 1658365200],
    registerForm: 'https://forms.gle/oCXMEGtNchuUrjHS6',
  },
  {
    pid: 34,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xcb705a6101e9250c7c867bd50a23f3aa6242f982',
      97: '0xcb705a6101e9250c7c867bd50a23f3aa6242f982',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Legend of Galaxy',
    symbol: 'GAE-PBR',
    description: `GAE/BNB`,
    introduce: `Legend of Galaxy is an appealing blockchain game with personalized NFT integrated in LFW Gamehub and ecosystem toward a true metaverse for the community. Players will embark on a galactic adventure, collect stylish and powerful NFT hero cards as rewards of fierce battles. Everyone is free to explore the galaxy, team up with friends and build forces to wage wars against other clans for valuable lands. `,
    website: 'https://legendofgalaxy.io/',
    twitter: 'https://twitter.com/Legend_LFW',
    telegram: 'https://t.me/LFWCommunity',
    whitepaper: 'https://docs.legendofgalaxy.io/',
    tokenSymbol: 'GAE',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/legend.png',
    totalSupply: '500,000,000 GAE',
    price: 0.02,
    total: '129.8 BNB', // 1BNB = 385$
    ratio: 19250, //0.02$
    min: 0.4,
    max: 1.2,
    maxTier1: 0.4,
    maxTier2: 0.8,
    maxTier3: 1.2,
    access: PRIVATE,
    network: bscNetwork,
    distribution: '100% TGE',
    startAt: 1650899700,
    endAt: 1650902400,
    claimAt: 1651069800,
    startDate: '2PM UTC 25th April, 2022',
    harvestDistribution: [100],
    claimTimeArr: [1651069800],
    registerForm: 'https://forms.gle/sM7YGtzjthrmfNEp7',
  },
  {
    pid: 35,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0x57724e83cc64d76e79c68caf0fb1b8b882a13ef0',
      97: '0x57724e83cc64d76e79c68caf0fb1b8b882a13ef0',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address/',
    name: 'Outlanders',
    symbol: 'LAND-PBR',
    description: `LAND/BNB`,
    introduce: `Outlanders is an MMORPG that allows players to compete in an adventure-based gameplay environment where they can compete conquests and battle players to tap into lucrative earning opportunities.`,
    website: 'https://outlanders.com',
    twitter: 'https://twitter.com/PlayOutlanders',
    telegram: 'https://t.me/OutlandersOfficial',
    whitepaper: 'https://outlanders.com/docs/Outlanders_Whitepaper.pdf',
    tokenSymbol: 'LAND',
    tokenExplorer: 'https://bscscan.com/address/',
    icon: '/img/tokens/land.png',
    totalSupply: '2,000,000,000 LAND',
    price: 0.012,
    total: '178.5 BNB', // 1BNB = 280$
    ratio: 23333.3, //0.012$
    min: 0.5,
    max: 2,
    maxTier1: 0.5,
    maxTier2: 1,
    maxTier3: 2,
    access: PRIVATE,
    network: bscNetwork,
    distribution: '50% TGE, 25% in next 30 days and 25% in next 60 days',
    startAt: 1654874100,
    endAt: 1654876800,
    claimAt: 0,
    startDate: '2PM UTC 10th June, 2022',
    harvestDistribution: [50, 25, 25],
    claimTimeArr: [],
    registerForm: 'https://forms.gle/H2udQb5w4PvqorTt9',
  },

  {
    pid: 50,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xce673d1326ff6772dc8a5d8c651330a883b72a8e',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'GEMS ESPORTS 3.0 PLATFORM - PBR Pool',
    symbol: 'GEMS-PBR',
    description: `GEMS/BNB`,
    introduce: `GEMS stands for GameFi, Esports, Metaverse and SocialFi.

    Proudly presenting Esports 3.0, GEMS is an Esports 3.0 Aggregator Platform within a unique O2O (online-to-offline) Ecosystem. Our one-of-a-kind ecosystem is designed to be the ultimate, one-stop GameFi destination, allowing crypto and Esports gamers to learn, connect, and immerse themselves in different metaverses and GameFi worlds via online and offline touch points.`,
    website: 'https://thegems.gg/',
    twitter: 'https://twitter.com/gemsgg_official',
    telegram: 'https://t.me/thegemsgg',
    whitepaper: 'https://official-gems.gitbook.io/gemsofficial/',
    tokenSymbol: 'GEMS',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/gems.webp',
    totalSupply: '10,000,000,000 GEMS',
    total: '227 BNB', // 1BNB = 220$, 50k$
    ratio: 44000, //$0.005
    price: 0.005,
    min: 2,
    max: 2,
    maxTier1: 2,
    maxTier2: 2,
    maxTier3: 2,
    access: PUBLIC,
    network: bscNetwork,
    distribution: '10% @TGE, 3 Months Vesting With Monthly Unlock',
    startAt: 1659024000,
    endAt: 1659024000,
    claimAt: 0,
    startDate: '2PM UTC 27th July, 2022',
    registerForm: 'https://forms.gle/jqadUuQmKhzSrf678',
    harvestDistribution: [10, 30, 30, 30],
    claimTimeArr: [],
  },
  {
    pid: 51,
    poolId: 3,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xce673d1326ff6772dc8a5d8c651330a883b72a8e',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'GEMS ESPORTS 3.0 PLATFORM',
    symbol: 'GEMS-LABS',
    description: `GEMS/BNB`,
    introduce: `GEMS stands for GameFi, Esports, Metaverse and SocialFi.

    Proudly presenting Esports 3.0, GEMS is an Esports 3.0 Aggregator Platform within a unique O2O (online-to-offline) Ecosystem. Our one-of-a-kind ecosystem is designed to be the ultimate, one-stop GameFi destination, allowing crypto and Esports gamers to learn, connect, and immerse themselves in different metaverses and GameFi worlds via online and offline touch points.`,
    website: 'https://thegems.gg/',
    twitter: 'https://twitter.com/gemsgg_official',
    telegram: 'https://t.me/thegemsgg',
    whitepaper: 'https://official-gems.gitbook.io/gemsofficial/',
    tokenSymbol: 'GEMS',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/gems.webp',
    totalSupply: '10,000,000,000 GEMS',
    total: '227 BNB', // 1BNB = 220$, 50k$
    ratio: 44000, //$0.005
    price: 0.005,
    min: 2,
    max: 2,
    maxTier1: 2,
    maxTier2: 2,
    maxTier3: 2,
    access: PUBLIC,
    network: bscNetwork,
    distribution: '10% @TGE, 3 Months Vesting With Monthly Unlock',
    startAt: 1659103200,
    endAt: 1659110400,
    claimAt: 0,
    startDate: '2PM UTC 27th July, 2022',
    registerForm: 'https://forms.gle/jqadUuQmKhzSrf678',
    harvestDistribution: [10, 30, 30, 30],
    claimTimeArr: [],
  },
  {
    pid: 52,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'MeMusic',
    symbol: 'MUSIC-PBR',
    description: `MUSIC/BNB`,
    introduce: `Memusic is a blockchain-based platform to provide an inclusive ecosystem through a multitude of services.`,
    website: 'https://memusic.io/',
    twitter: 'https://twitter.com/MeMusicNews',
    telegram: 'https://t.me/memusic_official',
    whitepaper: 'https://memusic.io/#',
    tokenSymbol: 'MUSIC',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/memusic.png',
    totalSupply: '100,000,000 MUSIC',
    price: 0.1,
    total: '166.6 BNB', // 1BNB = 600$, 100k$
    ratio: 10909, //0.055$
    min: 0.46, //300$
    max: 0.76, //500$
    maxTier1: 0.46, //300$
    maxTier2: 0.61, //400$
    maxTier3: 0.76, //500$
    access: GUARANTEED,
    network: bscNetwork,
    distribution: '20% TGE, 20% per month in next 4 months',
    startAt: 1669940201,
    endAt: 1669940201,
    claimAt: 0,
    startDate: 'TBA',
  },
  {
    pid: 53,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '0xe77105e3eef6e6f1d0e43a38dff735530cd6fda0',
      97: '',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'CrypCade',
    symbol: 'iCADE-PBR',
    description: `iCADE/BNB`,
    introduce: `CrypCade City - a functional fullstack open entertainment metaverse on blockchain. Enter a world of spectacular graphics, fully functional NFTs, social interactions and engaging Play 2 Earn games.`,
    website: 'https://www.crypcade.city/',
    twitter: 'https://twitter.com/CrypCade',
    telegram: 'https://t.me/CrypCade',
    whitepaper: 'https://docsend.com/view/igdgawrgjub3fr7n',
    tokenSymbol: 'iCADE',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/icade.png',
    totalSupply: '750,000,000 iCADE',
    price: 0.04,
    total: '172.4 BNB', // 1BNB = 290$, 50k$
    ratio: 7250, //0.04
    min: 1, //300$
    max: 2, //500$
    maxTier1: 2, //300$
    maxTier2: 2, //400$
    maxTier3: 2, //500$
    access: PUBLIC,
    network: bscNetwork,
    distribution: '20% TGE, 3% after 30 days, 5 months linear vesting https://bit.ly/3d5IHgi',
    startAt: 1660144500,
    endAt: 1660147200,
    claimAt: 0,
    startDate: '2PM UTC 10th Aug, 2022',
    registerForm: "https://forms.gle/CX8tFawfE6qwinYYA"
  },
  {
    pid: 54,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    tokenAddresses: {
      1: '0x637b1c41e3e34a2B0C77BeB57BCFEE3c88cC50fC',
      42: '',
      56: '',
      97: '',
    },
    lpExplorer: 'https://etherscan.io/address/0x637b1c41e3e34a2B0C77BeB57BCFEE3c88cC50fC',
    name: 'Spume',
    symbol: 'SPUME-PBR',
    description: `SPUME/BNB`,
    introduce: `Spume is a community governed holder-owned NFT marketplace that facilitates the non-fungible tokenization of physical and digital assets and removes brokers, banks, and other centralized authorities from unjustifiably taxing the transactions and property of individuals.`,
    website: 'http://spume.io/',
    twitter: 'http://www.twitter.com/spumeio',
    telegram: 'https://www.t.me/spumeio',
    whitepaper: 'https://spume.io/wp-content/uploads/2022/01/spume-white-paper.pdf',
    tokenSymbol: 'SPUME',
    tokenExplorer: 'https://etherscan.io/address/0x637b1c41e3e34a2B0C77BeB57BCFEE3c88cC50fC',
    icon: '/img/tokens/spume.png',
    totalSupply: '100,000,000 SPUME',
    price: 0.4,
    total: '59 ETH', // 1eth = 1k6, 100k$
    ratio: 4250, //0.4
    min: 0,
    max: 0,
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    access: GUARANTEED,
    network: ethereumNetwork,
    distribution: '50% TGE, then 50%  20 days after TGE.',
    startAt: 1660572000,
    endAt: 1660575600,
    claimAt: 0,
    startDate: '2PM UTC 15th Aug, 2022',
    registerForm: "https://forms.gle/1g3oKeS7wKtNQbeT7"
  },
  {
    pid: 56,
    poolId: 1,
    lpAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
      592: ''
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
      592: '0x9448610696659de8F72e1831d392214aE1ca4838'
    },
    lpExplorer: 'https://blockscout.com/astar/address/0x9448610696659de8F72e1831d392214aE1ca4838',
    name: 'Sirius Finance',
    symbol: 'SRS-PBR',
    description: `SRS/ASTR`,
    introduce: `Sirius Finance is the first stablecoin AMM infrastructure on Astar Network, easy for everyone to begin their journey on Polkadot.`,
    website: 'https://www.sirius.finance/',
    twitter: 'http://www.twitter.com/Sirius_Finance',
    telegram: 'https://www.t.me/siriusfinanceofficial',
    whitepaper: 'https://github.com/SiriusFinance/gitbook/blob/main/Litepaper.pdf',
    tokenSymbol: 'SRS',
    tokenExplorer: 'https://blockscout.com/astar/address/0x9448610696659de8F72e1831d392214aE1ca4838',
    icon: '/img/tokens/srs.svg',
    totalSupply: '1,000,000,000 SRS',
    price: 0.08,
    total: '1,000,000 ASTR', // 1astar=0.05, 
    ratio: 0.625, //0.08
    min: 0,
    max: 0,
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    access: GUARANTEED,
    network: astarNetwork,
    distribution: '20% TGE, then 16% monthly in 5 months',
    startAt: 1660485600,
    endAt: 1660489200,
    claimAt: 0,
    startDate: '2PM UTC 14th Aug, 2022',
    registerForm: ""
  },
  // {
  //   pid: 50,
  //   poolId: 2,
  //   lpAddresses: {
  //     1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
  //     42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
  //     1666700000: '0x5d59e661ebe223e6b5f6ea865eab2c7e51e79b2a',  //testnet
  //     1666600000: '0xdcad5608a4ec6b5146b1873c2c9aea19b329769c'//mainnet
  //   },
  //   tokenAddresses: {
  //     1: '',
  //     42: '',
  //     56: '',
  //     97: '',
  //   },
  //   lpExplorer: 'https://explorer.pops.one/address/0xfc649ce83d2b25086bf645ca88a9621b5e8a36fa',
  //   name: 'HarmonyLauncher Private Pool',
  //   symbol: 'IDO-PBR',
  //   description: `IDO/ONE`,
  //   introduce: `Harmony Launcher is the first Decentralized IGO + IDO Incubation Launchpad on Harmony Blockchain`,
  //   website: 'https://harmonylauncher.io/',
  //   twitter: 'https://twitter.com/Harmonylauncher',
  //   telegram: 'https://t.me/Harmonylauncher',
  //   whitepaper: '',
  //   tokenSymbol: 'IDO',
  //   tokenExplorer: 'https://explorer.pops.one/address/0xfc649ce83d2b25086bf645ca88a9621b5e8a36fa',
  //   icon: '/img/tokens/harmonylauncher.png',
  //   totalSupply: '100,000,000 IDO',
  //   total: '1000000 ONE',
  //   ratio: 100,
  //   min: 5, //300$
  //   max: 10, //500$
  //   maxTier1: 5, //300$
  //   maxTier2: 7, //400$
  //   maxTier3: 10, //500$
  //   access: 'Public',
  //   network: harmonyNetwork,
  //   distribution: '50% at TGE, 50% after 1 month',
  //   startAt: 1533939514,
  //   endAt: 1734569200,
  //   claimAt: 1533939514,
  //   startDate: '11th November',
  // claimTimeArr: [1533939514, 1639029546]
  // }
]
// given pid and network name -> launchpad pool id
export const getPoolId = (pid, network) => {
  const _pidIndex = supportedPools.findIndex(
    (item) => item.pid === pid && item.network === network,
  )
  if (_pidIndex === -1) {
    return 0
  }
  return supportedPools[_pidIndex].poolId
    ? supportedPools[_pidIndex].poolId
    : supportedPools[_pidIndex].pid
}

export const stakeAddressMatic = '0x6335aF028e77B574423733443678aD4cb9e15B3D'

export const HMY_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io'
export const HMY_MAINNET_RPC_URL = 'https://api.harmony.one'

export const harmonyChainIds = {
  shard0: {
    mainnet: 1666600000,
    testnet: 1666700000,
  },
  shard1: {
    mainnet: 1666600001,
    testnet: 1666700001,
  },
  shard2: {
    mainnet: 1666600002,
    testnet: 1666700002,
  },
  shard3: {
    mainnet: 1666600003,
    testnet: 1666700003,
  },
}

export const bscChainIds = [56, 97]

export const tierConditions = {
  maxTier1: {
    min: 500,
    max: 1500,
  },
  maxTier2: {
    min: 1500,
    max: 3000,
  },
  maxTier3: {
    min: 3000,
  },
}

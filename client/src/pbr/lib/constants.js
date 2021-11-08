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

const testing = false;

export const currentConnection = testing ? 'testnet' : 'mainnet';

export const stakeContractAddresses = {
  'ethereum': {
    1: '0x1b46b72c5280f30Fbe8A958B4f3c348FD0fD2E55',
    42: '0x7678f0AF7304e01554E2D49D96E55C8de4975c66'
  },
  'polygon': {
    137: '0x6335aF028e77B574423733443678aD4cb9e15B3D',
    80001: '0x55950cF279Ba5b43263f4Df54833b85F684B333F',
  },
  'harmony': {
    //todo:
  }
}

export const ethereumInfuraTestnetRpc = `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`;
export const ethereumInfuraRpc = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`;

export const polygonMainnetInfuraRpc = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`
export const polygonTestnetInfuraRpc = `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`

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
    },
    lpBscAddresses: {
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
    },
    lpBscAddresses: {
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
    total: '28.57 ETH',//1ETH =3k5$
    ratio: 8750,//1 SHOE 0.4$
    min: 0.142,//500$
    max: 0.2,//700$
    maxTier1: 0.142,//500$
    maxTier2: 0.171,//600$
    maxTier3: 0.2,//700$
    access: 'Private',
    network: ethereumNetwork,
    distribution: '50% TGE after 1h Uniswap listing, 50% next month',
    startAt: 1633960800,//real 1633960800
    endAt: 1633964400,//real 1633964400
    claimAt: 1634648400,//real 1634648400
    startDate: "2PM UTC 11th Oct",
    claimTimeArr: [1634648400, 1637254800]
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
    lpExplorer: 'https://etherscan.io/address/0x31903e333809897ee57af57567f4377a1a78756c',
    name: 'Cryptopunt',
    symbol: 'PUN-PBR',
    description: `PUN/ETH`,
    introduce: `Cryptopunt is quickly becoming the leading blockchain-based gaming and gambling platform.`,
    website: 'https://www.cryptopunt.com/',
    twitter: 'https://twitter.com/PuntCrypto',
    telegram: 'https://t.me/CryptoPunt',
    whitepaper: 'https://www.cryptopunt.com/download_file/74/1',
    tokenSymbol: 'PUN',
    tokenExplorer: 'https://etherscan.io/token/0x31903e333809897ee57af57567f4377a1a78756c',
    icon: '/img/tokens/punt.jpg',
    totalSupply: '160,000,000 PUN',
    total: '16.2 ETH', //1ETH =3k7$
    ratio: 16818,//1PUN =0.22$
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
    claimTimeArr: [1634563800, 1637168400]
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
      42: '0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce'
    },
    lpExplorer: 'https://etherscan.io/token/0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
    name: 'ReBaked',
    symbol: 'BAKED-PBR',
    description: `BAKED/MATIC`,
    introduce: `ReBaked is building a set of governance, management, and operations tools for DAOs and Web 3.0 ecosystems to better distribute and manage their treasuries- focusing on value creation`,
    website: 'https://www.rebaked.com/',
    twitter: 'https://twitter.com/rebakedinc',
    telegram: 'https://t.me/rebakedann',
    whitepaper: 'https://docsend.com/view/axuv2dhmiqpbk7vu',
    tokenSymbol: 'BAKED',
    tokenExplorer: 'https://etherscan.com/address/0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce',
    icon: '/img/tokens/rebaked.png',
    totalSupply: '300,000,000 BAKED',
    total: '7.5 ETH', //1ETH=4k
    ratio: 133333.33,//1 BAKED=0.03$
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
    claimAt: 1636253020,//1635831420,//1635249600,
    startDate: '12PM UTC 22nd Oct, 2021',
    claimTimeArr: [1635249600, 1637859600, 1640451600]

  },
  {
    pid: 7,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '0x65e6b60ea01668634d68d0513fe814679f925bad',
      42: '0x65e6b60ea01668634d68d0513fe814679f925bad'
    },

    lpExplorer: 'https://etherscan.com/address/0x65e6b60ea01668634d68d0513fe814679f925bad',
    name: 'PixelVerse',
    symbol: 'PIXEL-PBR',
    description: `PIXEL/ETH`,
    introduce: `PixielVerse is a virtual world platform and toolset that lets creators and communities create their own NFTs in a next generation metaverse.`,
    website: 'https://pixelverse.ai/',
    twitter: 'https://twitter.com/pixelverse1',
    telegram: 'https://t.me/pixelverseofficial',
    whitepaper:
      'https://pixelverse.ai/assets/pdf/deck.pdf',
    tokenSymbol: 'PIXEL',
    tokenExplorer: 'https://etherscan.com/token/0x65e6b60ea01668634d68d0513fe814679f925bad',
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
    claimTimeArr: [1636171200]
  },

  {
    pid: 9,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0x221AcD0Cc5f31Aea65FacEC2343C804ce43CbD6d',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address/',
    name: 'Defactor',
    symbol: 'FACTR-PBR',
    description: `FACTR/ETH`,
    introduce: `Defactor reduces the barriers to entry for Real World Asset Originators by providing tools to manage and scale their processes and giving investors transparency and governance over the assets being traded.`,
    website: 'https://defactor.com/',
    twitter: 'https://twitter.com/defactor_',
    telegram: ' https://t.me/defactor_official',
    whitepaper: ' https://defactor.docsend.com/view/ndqzghfjjat5a5ik',
    tokenSymbol: 'FACTR',
    tokenExplorer: 'https://etherscan.io/token/',
    icon: '/img/tokens/defactor.svg',
    totalSupply: '300,000,000 FACTR',
    total: '10.86 ETH', //1ETH =4k6$
    ratio: 65714.28,//0.07$
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
  },
  {
    pid: 10,
    poolId: 0,// add pool id in this symbol if pool ID of the ido is not same as pid
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpPolygonAddresses: { // lp address for polygon network
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'FabWelt',
    symbol: 'WELT-PBR',
    description: `WELT/MATIC`,
    introduce: `FABWELT creates a gaming platform that brings blockchain technology into the core of high quality games of all types or genres. We achieve this by utilizing the finest tech of both worlds, beautiful high-quality games and the latest blockchain technology.`,
    website: 'https://www.fabwelt.com/',
    twitter: 'https://twitter.com/fabwelttoken',
    telegram: 'https://t.me/FabweltToken',
    whitepaper: 'https://www.fabwelt.com/public/Fabwelt-whitepaper.pdf',
    tokenSymbol: 'WELT',
    tokenExplorer: 'https://polygonscan.com/address',
    icon: '/img/tokens/fbwelt.jpg',
    totalSupply: '500,000,000 WELT',
    total: '26315 MATIC', //1Matic=1.9$
    ratio: 135.7,//0.014
    min: 157.89, //300$
    max: 263.15, //500$
    maxTier1: 157.89, //300$
    maxTier2: 210.52, //400$
    maxTier3: 263.15, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: '50% at TGE after 30 minutes. 50% after one month of DEX listing',
    startAt: 1636725808,
    endAt: 1636729408,
    claimAt: 1637069400,
    startDate: '2PM UTC 12th Nov',
  },
  {
    pid: 11,
    poolId: 2,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'ADASwap',
    symbol: 'ASW-PBR',
    description: `ASW/BNB`,
    introduce: `ADASwap - The next-gen DEX based on Cardano Ecosystem. The  main goal is to develop tools for creators and users, as well as bringing high-yield staking pools and NFT content through our launchpads and marketplaces.`,
    website: 'https://adaswap.app/',
    twitter: 'https://twitter.com/adaswapapp',
    telegram: 'https://t.me/adaswapcommunity',
    whitepaper: 'https://adaswap.app/AdaSwap-Whitepaper.pdf',
    tokenSymbol: 'ASW',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/adaswap.PNG',
    totalSupply: '16,500,000,000 ASW',
    total: '100 BNB',
    ratio: 0, // 1BNB = 500$
    min: 0.6, //300$
    max: 1, //500$
    maxTier1: 0.6, //300$
    maxTier2: 0.8, //400$
    maxTier3: 1, //500$
    access: 'Private',
    network: bscNetwork,
    distribution: 'TBA',
    startAt: 1636988106,
    endAt: 1734569200,
    claimAt: 0,
    startDate: 'TBA',
  },
  {
    pid: 12,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
    },
    lpExplorer: 'https://etherscan.io/address',
    name: 'SolClout',
    symbol: 'SOLC-PBR',
    description: `SOLC/ETH`,
    introduce: `SolClout is envisioning a platform to build a formidable community powered by Solana, a high throughput, scalable public blockchain project. Powered by blockchain technology, users are able to also utilize a social networking platform free from censorship.`,
    website: 'https://solclout.com/',
    twitter: 'https://twitter.com/solclout',
    telegram: 'https://t.me/solclout',
    whitepaper: 'https://drive.google.com/file/d/1bM_b8CsMD8AQkd5F8hCt-lTKBRNvWiCs/view?usp=sharing',
    tokenSymbol: 'SOLC',
    tokenExplorer: 'https://etherscan.io/token',
    icon: '/img/tokens/solc.png',
    totalSupply: '1,000,000,000 SOLC',
    total: '33 ETH',//1ETH =3k$
    ratio: 0,
    min: 0.166,//500$
    max: 0.233,//700$
    maxTier1: 0.166,//500$
    maxTier2: 0.2,//600$
    maxTier3: 0.233,//700$
    access: 'Private',
    network: ethereumNetwork,
    distribution: 'TBA',
    startAt: 1636045200,
    endAt: 1736045200,
    claimAt: 0,
    startDate: "TBA"
  },

  {
    pid: 13,
    poolId: 5,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'PeopleZ',
    symbol: 'LEZ-PBR',
    description: `LEZ/BNB`,
    introduce: `The engagment between a VIP and the community is always hard, and the social network are not a solution. Peoplez is here to give you a new experience, where you can be part of something that actually is impossible. A total involvment where you can finally touch something of concrete, and have an interaction with your idols which seemed impossible until now. `,
    website: 'https://www.peoplez.io/',
    twitter: 'https://twitter.com/Peoplez_io',
    telegram: 'https://t.me/Peoplez_io',
    whitepaper: 'https://ce251279-e551-4984-841a-5796bf3cd4ff.filesusr.com/ugd/491357_c78348f1d22e44d1925af7e39b3e2326.pdf',
    tokenSymbol: 'LEZ',
    tokenExplorer: 'https://bscscan.com/address',
    icon: '/img/tokens/peoplez.svg',
    totalSupply: '18,000,000 LEZ',
    total: '125 BNB', //1BNB = 400$
    ratio: 0,
    min: 0.75, //300$
    max: 1.25, //500$
    maxTier1: 0.75, //300$
    maxTier2: 1, //400$
    maxTier3: 1.25, //500$
    access: 'Private',
    network: bscNetwork,
    distribution: 'TBA',
    startAt: 1636524814,
    endAt: 1734569200,
    claimAt: 0,
    startDate: 'TBA',
  },
  {
    pid: 14,
    poolId: 1,// add pool id in this symbol if pool ID of the ido is not same as pid
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpPolygonAddresses: { // lp address for polygon network
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'ArcadeNetwork',
    symbol: 'ARC-PBR',
    description: `ARC/MATIC`,
    introduce: `ArcadeNetwork is the world’s first decentralised platform providing cross metaverse asset interoperability. Making use of Blockchain technology & NFTs, ArcadeNetwork creates a unified relayer bridge that enables seamless movement of in-game assets`,
    website: 'https://arcadenet.io/',
    twitter: 'https://twitter.com/ArcadeNetwork_',
    telegram: 'https://t.me/ArcadeNetworkOfficial',
    whitepaper: 'https://arcadenet.io/Arcadenet_white_paper-.pdf',
    tokenSymbol: 'ARC',
    tokenExplorer: 'https://polygonscan.com/address',
    icon: '/img/tokens/arcade.png',
    totalSupply: '222,500,000 ARC',
    total: '16666 MATIC', //1Matic=1.8$
    ratio: 2.6,
    min: 166.6, //300$
    max: 277.7, //500$
    maxTier1: 166.6, //300$
    maxTier2: 222.2, //400$
    maxTier3: 277.7, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: 'TBA',
    startAt: 1636940091,
    endAt: 1736940091,
    claimAt: 0,
    startDate: 'TBA',
  },

  {
    pid: 15,
    poolId: 2,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'PlayerMon',
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
    total: '38461 MATIC', //1Matic=1.3$
    ratio: 34.2,
    min: 230.76, //300$
    max: 384.61, //500$
    maxTier1: 230.71, //300$
    maxTier2: 307.69, //400$
    maxTier3: 384.61, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: 'TBA',
    startAt: 1638236241,
    endAt: 1738236241,
    claimAt: 0,
    startDate: 'TBA',
  },



  {
    pid: 16,
    poolId: 1,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    lpPolygonAddresses: { // lp address for polygon network
      137: '0xdcAD5608a4ec6b5146B1873c2C9AEA19B329769C',
      80001: '0xaE8aAf92013dc8F7fa22Fe01e56271c93B24058F',
    },
    lpExplorer: 'https://polygonscan.com/address',
    name: 'TryHards',
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
    totalSupply: '200,000,000 BAKED',
    total: '21428 MATIC', //1Matic=1.4$
    ratio: 15.5,//1 TRYE=0.09$
    min: 214.28, //300$
    max: 357.14, //500$
    maxTier1: 214.28, //300$
    maxTier2: 285.71, //400$
    maxTier3: 357.1, //500$
    access: 'Private',
    network: polygonNetwork,
    distribution: '33% on TGE, then 33% monthly over 2 months',
    startAt: 1637330400,
    endAt: 1737330400,
    claimAt: 1737330400,
    startDate: '2PM UTC 19th Nov, 2021',
  },
  {
    pid: 17,
    poolId: 3,
    lpAddresses: {
      1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
      42: '0xd49Ab54b85cF7DE4964888bD3002bEE9Da1fdBDf',
    },
    tokenAddresses: {
      1: '',
      42: '',
      56: '',
      97: '',
    },
    lpBscAddresses: {
      56: '0x95B4cC2217706b22D7dfe918FA1049aA34e19D1D',
      97: '0xADa1BC883B2681f476C0C7dF32d94E3c8f5bb930',
    },
    lpExplorer: 'https://bscscan.com/address',
    name: 'Cheesus DeFi and NFT Rating Tool',
    symbol: 'DRATE-PBR',
    description: `DRATE/BNB`,
    introduce: `Multichain analytical platform & aggregator for all DeFi Industry. Real-time precise & reliable data about all Yield Farming, Liquidity pools, Upcoming tokensales & Indexes throughout Ethereum, BSC, HECO Chain and Polkadot.`,
    website: 'https://defirating.finance/',
    twitter: 'https://twitter.com/CheesusDeFi',
    telegram: 'https://t.me/cheesus_MAIN_eng',
    whitepaper:
      'https://168aggregator.notion.site/DeFi-Rating-Multichain-DeFi-Dashboard-Analytical-Platform-c23701169e35493f801dff7dc0b42ac1',
    tokenSymbol: 'DRATE',
    tokenExplorer: 'https://bscscan.com/token',
    icon: '/img/tokens/defirate.png',
    totalSupply: '200,000,000 DRATE',
    total: '125 BNB',
    ratio: 10554, //token price 0.0379, 1BNB = 400$
    min: 0.75, //300$
    max: 1.25, //500$
    maxTier1: 0.75, //300$
    maxTier2: 1, //400$
    maxTier3: 1.25, //500$
    access: 'Private',
    network: bscNetwork,
    distribution: 'TBA',
    startAt: 1637848800,
    endAt: 1637852400,
    claimAt: 0,
    startDate: '2PM UTC 25th Nov',
  },


  // {
  //   pid: 17,
  //   poolId: 1,
  //   lpAddresses: {
  //     1: '0x7Df76A64aE3dc2f818f969fe081ea52ab8cBC350',
  //     42: '0xdB1B2cCdca2142a6297994101E83Da279F6c20dD',
  //   },
  //   tokenAddresses: {
  //     1: '',
  //     42: '',
  //     56: '',
  //     97: '',
  //   },
  //   lpHarmonyAddresses: { // used shard0  lp addresses for harmony network
  //     1666700000: '0x5d59e661ebe223e6b5f6ea865eab2c7e51e79b2a',  //testnet
  //     1666600000: '0xdcad5608a4ec6b5146b1873c2c9aea19b329769c'//mainnet
  //   },
  //   lpExplorer: 'https://explorer.pops.one/address/0xfc649ce83d2b25086bf645ca88a9621b5e8a36fa',
  //   name: 'IDO Token Harmony',
  //   symbol: 'IDO-PBR',
  //   description: `ARC/ONE`,
  //   introduce: `Harmony test token IDO`,
  //   website: '',
  //   twitter: '',
  //   telegram: 'l',
  //   whitepaper: '',
  //   tokenSymbol: 'IDO',
  //   tokenExplorer: 'https://explorer.pops.one/address/0xfc649ce83d2b25086bf645ca88a9621b5e8a36fa',
  //   icon: '/img/tokens/test.png',
  //   totalSupply: '100,000,000 IDO',
  //   total: '23076 ONE', //1Matic=1.3$
  //   ratio: 2.6,
  //   min: 23.076, //300$
  //   max: 38.461, //500$
  //   maxTier1: 24.071, //300$
  //   maxTier2: 30.769, //400$
  //   maxTier3: 38.461, //500$
  //   access: 'Private',
  //   network: harmonyNetwork,
  //   distribution: 'TBA',
  //   startAt: 1633939514,
  //   endAt: 1734569200,
  //   claimAt: 1633939514,
  //   startDate: 'TBA',
  // }
]
// given pid and network name -> launchpad pool id
export const getPoolId = (pid, network) => {
  const _pidIndex = supportedPools.findIndex(item => item.pid === pid && item.network === network);
  if (_pidIndex === -1) {
    return 0
  }
  return supportedPools[_pidIndex].poolId ? supportedPools[_pidIndex].poolId : supportedPools[_pidIndex].pid;
}

export const stakeAddressMatic = '0x6335aF028e77B574423733443678aD4cb9e15B3D'

export const HMY_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io';
export const HMY_MAINNET_RPC_URL = 'https://api.harmony.one';

export const harmonyChainIds = {
  'shard0': {
    'mainnet': 1666600000,
    'testnet': 1666700000
  },
  'shard1': {
    'mainnet': 1666600001,
    'testnet': 1666700001
  },
  'shard2': {
    'mainnet': 1666600002,
    'testnet': 1666700002
  },
  'shard3': {
    'mainnet': 1666600003,
    'testnet': 1666700003
  },
}


export const bscChainIds = [56, 97]
import BigNumber from 'bignumber.js'
import axios from 'axios'
import config from '../config'
import {
  supportedPools,
  bscNetwork,
  ethereumNetwork,
  stakeContractAddresses,
  currentConnection,
  polygonNetwork,
  harmonyNetwork,
  harmonyChainIds,
  moonriverNetwork,
  astarNetwork,
  networkToChain,
} from './lib/constants'
import Web3 from 'web3'

import stakingAbi from '../pbr/lib/abi/staking.json'
import LaunchpadAbi from './lib/abi/masterLaunchpad.json'
import launchpadBscAbi from './lib/abi/ido/launchpad.json'
import launchpadBscAbi2 from './lib/abi/ido/launchpad2.json'
import launchpadBscAbi3 from './lib/abi/ido/launchpad3.json'
import lpAstarAbi from './lib/abi/ido/astarLp.json'
import arbitrumIdoABI from './lib/abi/ido/abitrumIdo.json'

import ERC20Abi from './lib/abi/erc20.json'

import { getBalanceNumber } from '../utils/formatBalance'
import {
  constantPrice,
  getProfit,
  getTokenId,
  getTokenPriceFromCoinGecko,
} from './helpers'
import { readContract, readContracts } from '@wagmi/core'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const abiMapping = {
  Private: launchpadBscAbi,
  Public: LaunchpadAbi,
  Whitelist: launchpadBscAbi,
  Guaranteed: launchpadBscAbi2,
  '0xb1a6dd107d6c2885497a6fb6d5b13218244154e8': launchpadBscAbi2, //solclout mainnet
  '0x978E55b71E74051B136AAbAE2d6e4bD0cA714439': launchpadBscAbi2, // solclout testnet
  '0x259D9aD2D584477A99396Eef8A4fee1798B0daaA': launchpadBscAbi3, // deflyBall testnet
  '0x921cad4688dc908b89f83cd3b2c7c69bc3838d69': launchpadBscAbi3, // deflyBall testnet
  '0xc95d0846dd8342c112844c6c3d04199897acf903': launchpadBscAbi3, // snapEx mainnet
  '0xcd4f3d7ed4fd3dfb675a329dc72a4f8f1795a2d3': launchpadBscAbi3, // Calo mainnet
  '0x302b7F2351F7f064F7c2BE48386e0762c0cF5348': launchpadBscAbi3, // Gravitation zero mainnet
  '0x56d750197ec332fceb574ca22cd4e40965712c86': launchpadBscAbi3, // put battle saga  mainnet address if ABi same
  '0x9ce703762878c69874e8951f92e8ba2142dc9dce': launchpadBscAbi3,
  '0xf5658d4a37975489541f8dc03fedada605c78c8b': launchpadBscAbi3,
  '0xc479b7909dd33fb036fda62f66bc3ebbe480c766': launchpadBscAbi3,
  '0xe8a46C6CE5c39b54b854bf91a1CC34F72c97B483': launchpadBscAbi3,
  '0xa090c395f674f74e1ac71a79769bd33ebaece502': launchpadBscAbi3,
  '0x39f2e22e971eb1144643bc22d84e039e59768373': launchpadBscAbi3,
  '0x2b728f8b396e8f8cfc390a65186a1d2eb0623685': launchpadBscAbi3,
  '0x55ad2ff5363f2a155187e644bbb66f3584fd18dc': launchpadBscAbi3,
  '0x17c40b2a10d7f05cac876247d8d9e4d561e27fcf': launchpadBscAbi3,
  '0xcb705a6101e9250c7c867bd50a23f3aa6242f982': launchpadBscAbi3,
  '0x57724e83cc64d76e79c68caf0fb1b8b882a13ef0': launchpadBscAbi3,
  '0xe77105e3eef6e6f1d0e43a38dff735530cd6fda0': launchpadBscAbi3,
  '0xB9Ffb5Fe5760f0dCb537e50Bee620CFbA646Ea71': lpAstarAbi,
  '0x584fc75ca47910150441d0751d031a33297dc085': launchpadBscAbi3,
  '0x29b1B910b62fE3AEDBb59F77fE94aDCd09e38b86': arbitrumIdoABI, //arbitrum testnet
  '0x58Cd3C39541A077ac464b49BBd98E9bb11Cfc831': arbitrumIdoABI, //arbitrum  mainnet
}

const MaxUint256 = '999999999900000000000000000000000000000'

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (pbr) => {
  return pbr && pbr.masterChefAddress
}
export const getPolkaBridgeAddress = (pbr) => {
  return pbr && pbr.pbrAddress
}

export const getXPBRAddress = (pbr) => {
  return pbr && pbr.xPolkaBridgeAddress
}

export const getMasterChefContract = (pbr, pid) => {
  return pbr && pbr.contracts && pbr.contracts.masterChef
}

export const getUniswapETHPBRPair = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pools[0].lpContract
}
export const getLPAddress = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pools[0].lpAddress
}
export const getWETHAddress = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pools[0].token2Address
}
export const getPBRAddress = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pools[0].tokenAddress
}

export const getPolkaBridgeContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pbr
}
export const getXPolkaBridgeStakingContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.xPolkaBridgeStaking
}

export const getLaunchpadContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.masterLaunchpad
}

export const getBscLaunchpadContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.lanchpadBsc
}

export const getLaunchpads = (pbr) => {
  if (!pbr) {
    return getDefaultLaunchpads()
  }
  return pbr
    ? pbr.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          description,
          introduce,
          website,
          twitter,
          telegram,
          whitepaper,
          lpAddress,
          lpContract,
          lpExplorer,
          tokenAddress,
          tokenContract,
          tokenExplorer,
          tokenSymbol,
          total,
          totalSupply,
          ratio,
          min,
          max,
          maxTier1,
          maxTier2,
          maxTier3,
          maxWhitelistPurchase,
          access,
          network,
          distribution,
          startAt,
          endAt,
          claimAt,
          startDate,
        }) => ({
          pid,
          name,
          id: symbol,
          icon,
          description,
          introduce,
          website,
          twitter,
          telegram,
          whitepaper,
          lpAddress,
          lpContract,
          lpExplorer,
          tokenAddress,
          tokenContract,
          tokenExplorer,
          tokenSymbol,
          total,
          totalSupply,
          ratio,
          min,
          max,
          maxTier1,
          maxTier2,
          maxTier3,
          maxWhitelistPurchase,
          access,
          network,
          distribution,
          startAt,
          endAt,
          claimAt,
          startDate,
        }),
      )
    : []
}

// default launchpads
export const getDefaultLaunchpads = () => {
  // set default thereum connection with infura if metamask is not available.
  const chainId = currentConnection === 'mainnet' ? 1 : 42

  const pools = supportedPools.map((pool) => {
    if (pool.network === bscNetwork) {
      const _bscChain =
        currentConnection === 'mainnet'
          ? config.bscChain
          : config.bscChainTestent
      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[_bscChain],
        lpAddress: pool.lpAddresses?.[_bscChain],
      })
    } else if (pool.network === harmonyNetwork) {
      const _harmonyChain =
        currentConnection === 'mainnet'
          ? config.hmyChainMainnet
          : config.hmyChainTestnet
      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[_harmonyChain],
        lpAddress: pool.lpAddresses?.[_harmonyChain],
      })
    } else if (pool.network === polygonNetwork) {
      const _polygonChain =
        currentConnection === 'mainnet'
          ? config.polygon_chain_mainnet
          : config.polygon_chain_testnet

      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[_polygonChain],
        lpAddress: pool.lpAddresses?.[_polygonChain],
      })
    } else if (pool.network === moonriverNetwork) {
      const _chain =
        currentConnection === 'mainnet'
          ? config.moonriverChain
          : config.moonriverChainTestent

      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[_chain],
        lpAddress: pool.lpAddresses?.[_chain],
      })
    } else if (pool.network === astarNetwork) {
      const _chain = config.astarChain

      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[_chain],
        lpAddress: pool.lpAddresses?.[_chain],
      })
    } else {
      return Object.assign(pool, {
        tokenAddress: pool.tokenAddresses?.[chainId],
        lpAddress: pool.lpAddresses?.[chainId],
      })
    }
  })

  return pools.map(
    ({
      pid,
      name,
      symbol,
      icon,
      description,
      introduce,
      website,
      twitter,
      telegram,
      whitepaper,
      lpAddress,
      lpContract,
      lpExplorer,
      tokenAddress,
      tokenContract,
      tokenExplorer,
      tokenSymbol,
      total,
      totalSupply,
      ratio,
      min,
      max,
      maxTier1,
      maxTier2,
      maxTier3,
      maxWhitelistPurchase,
      access,
      network,
      distribution,
      startAt,
      endAt,
      claimAt,
      startDate,
    }) => ({
      pid,
      name,
      id: symbol,
      symbol,
      icon,
      description,
      introduce,
      website,
      twitter,
      telegram,
      whitepaper,
      lpAddress,
      lpContract,
      lpExplorer,
      tokenAddress,
      tokenContract,
      tokenExplorer,
      tokenSymbol,
      total,
      totalSupply,
      ratio,
      min,
      max,
      maxTier1,
      maxTier2,
      maxTier3,
      maxWhitelistPurchase,
      access,
      network,
      distribution,
      startAt,
      endAt,
      claimAt,
      startDate,
    }),
  )
}

export const checkPoolActive = async (startAt) => {
  let now = new Date().getTime()
  return startAt > 0 ? now * 1000 >= startAt : false
}

export const getETHBalance = async (provider, account) => {
  if (!provider || !account) {
    return 0
  }
  const web3 = new Web3(provider || config.rpc)
  let balance = await web3.eth.getBalance(account)
  return getBalanceNumber(new BigNumber(balance))
}

export const getHistory = async (account) => {
  let history = []
  return history
}

export const getProgress = async (
  lpAddress,
  pid,
  access,
  startAt,
  endAt,
  lpNetwork,
) => {
  try {
    if (!lpAddress) {
      return
    }

    //if pool not started yet show no progress
    if (startAt && startAt * 1000 >= new Date().getTime()) {
      return null
    }

    // if pool ended show 100% progress
    if (endAt && endAt * 1000 <= new Date().getTime()) {
      return new BigNumber(100)
    }

    const idoContract = {
      address: lpAddress,
      abi: abiMapping?.[lpAddress],
    }

    const [remainToken, totalToken] = await readContracts({
      contracts: [
        {
          ...idoContract,
          functionName: 'getRemainIDOToken',
          args: [pid],
          chainId: networkToChain?.[lpNetwork],
        },
        {
          ...idoContract,
          functionName: 'getBalanceTokenByPoolId',
          args: [pid],
          chainId: networkToChain?.[lpNetwork],
        },
      ],
    })

    if (remainToken?.toString() && totalToken?.toString()) {
      let remain = new BigNumber(remainToken.toString())
      let total = new BigNumber(totalToken.toString())

      if (total > 0) {
        return total.minus(remain).div(total).times(100)
      }
    }
    return null
  } catch (e) {
    console.log('lpTest: getProgress error: ', { e, pid, lpAddress })
    if (pid < 0) {
      return new BigNumber(100)
    } else {
      return null
    }
  }
}

export const getIsWhitelist = async (
  lpAddress,
  pid,
  access,
  stakeAmount,
  account,
  lpNetwork,
) => {
  try {
    const data = await readContract({
      address: lpAddress,
      abi: abiMapping?.[lpAddress],
      functionName: 'IsWhitelist',
      args: [account, 1, stakeAmount],
      chainId: networkToChain?.[lpNetwork],
    })

    return data
  } catch (e) {
    console.log('ethTest:  isWhiteList error', {
      pid,
      e,
      account,
      stakeAmount: stakeAmount,
      lpAddress,
      lpNetwork,
    })
    return false
  }
}

export const getPurchasesAmount = async (
  lpAddress,
  pid,
  access,
  account,
  lpNetwork,
) => {
  try {
    if (!lpAddress) {
      return null
    }

    // const chainId = await getCurrentNetworkId()
    // const currentNetwork = getNetworkName(chainId)

    // const lpContract = getCurrentLaunchpadContract(
    //   lpAddress,
    //   pid,
    //   access,
    //   lpNetwork,
    //   currentNetwork,
    // )

    // const info = await lpContract.methods
    //   .getWhitelistfo(pid)
    //   .call({ from: account })

    const idoContract = {
      address: lpAddress,
      abi: abiMapping?.[lpAddress],
    }

    const [info, purchasesAmount] = await readContracts({
      contracts: [
        {
          ...idoContract,
          functionName: 'getWhitelistfo',
          args: [pid],
          chainId: networkToChain?.[lpNetwork],
        },
        {
          ...idoContract,
          functionName: 'getUserTotalPurchasenew',
          args: [pid, account],
          chainId: networkToChain?.[lpNetwork],
        },
      ],
      overrides: { from: account },
    })

    console.log('getPurchased amount from lpcontarct ', {
      purchasesAmount: purchasesAmount.toString(),
      account,
      info: info.toString(),
    })

    // if (info[5]) {
    //   return getBalanceNumber(new BigNumber('0'))
    // }

    // // const purchasesAmount = await lpContract.methods
    // //   .getUserTotalPurchase(pid)
    // //   .call({ from: account })

    return getBalanceNumber(new BigNumber(purchasesAmount?.toString()))
  } catch (e) {
    console.log('getPurchased error: ', { e, lpAddress })
    return null
  }
}

export const signedIdoString = async (account, network, symbol) => {
  try {
    const _api =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_IDO_API_PRODUCTION
        : process.env.REACT_APP_IDO_API_DEVELOPMENT

    const signedRes = await axios.post(`${_api}/api/ido/sign/v1`, {
      network,
      symbol,
      userAddress: account,
      apiKey: process.env.REACT_APP_IDO_API_KEY.split('').reverse().join(''),
    })

    return signedRes.data
  } catch (error) {
    console.log('join pool test signedIdoString', error)
    return null
  }
}

export const verifyCaptcha = async (value) => {
  try {
    const _api =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_IDO_API_PRODUCTION
        : process.env.REACT_APP_IDO_API_DEVELOPMENT

    const res = await axios.post(`${_api}/api/recaptcha/verify/v1`, {
      verificationValue: value,
      apiKey: process.env.REACT_APP_IDO_API_KEY.split('').reverse().join(''),
    })

    return res.data
  } catch (error) {
    console.log('verifyCaptcha exception', error)
    return error
  }
}

const convertToWei = (amount) => {
  const _amount = !amount ? '0' : amount
  return new BigNumber(_amount).times(new BigNumber(10).pow(18)).toString()
}

export const joinpool = async (
  lpAddress,
  pid,
  access,
  stakeAmount,
  ethValue,
  account,
  network,
  symbol,
) => {
  try {
    const chainId = await getCurrentNetworkId()
    const currentNetwork = getNetworkName(chainId)

    const _launchpadContract = getCurrentLaunchpadContract(
      lpAddress,
      pid,
      access,
      network,
      currentNetwork,
    )
    const signedData = await signedIdoString(account, network, symbol)

    const v = signedData && signedData.v
    const r = signedData && signedData.r
    const s = signedData && signedData.s

    if (network === polygonNetwork) {
      return _launchpadContract.methods
        .purchaseIDO(stakeAmount, pid, v, r, s)
        .send({
          from: account,
          value: convertToWei(ethValue),
          gasPrice: 100000000000,
        })
        .on('transactionHash', (tx) => {
          console.log('joinpool', tx)
          return tx.transactionHash
        })
    } else if (network === moonriverNetwork) {
      // console.log('running trx', { network, stakeAmount, pid, account, eth: convertToWei(ethValue) })
      return _launchpadContract.methods
        .purchaseIDO(stakeAmount, pid, v, r, s)
        .send({
          from: account,
          value: convertToWei(ethValue),
          gasLimit: 12950000,
        })
        .on('transactionHash', (tx) => {
          console.log('joinpool', tx)
          return tx.transactionHash
        })
    }
    // console.log('purchase ido params', { stakeAmount, pid, v, r, s })
    return _launchpadContract.methods
      .purchaseIDO(stakeAmount, pid, v, r, s)
      .send({ from: account, value: convertToWei(ethValue) })
      .on('transactionHash', (tx) => {
        console.log('joinpool', tx)
        return tx.transactionHash
      })
  } catch (error) {
    console.log('joinpool', { error, ethValue, pid, stakeAmount })
    return null
  }
}

export const harvest = async (lpAddress, pid, access, account, network) => {
  try {
    const chainId = await getCurrentNetworkId()
    const currentNetwork = getNetworkName(chainId)
    const _launchpadContract = getCurrentLaunchpadContract(
      lpAddress,
      pid,
      access,
      network,
      currentNetwork,
    )

    if (network === polygonNetwork) {
      return _launchpadContract.methods
        .claimToken(pid)
        .send({ from: account, gasPrice: 100000000000 })
        .on('transactionHash', (tx) => {
          console.log(tx)
          return tx.transactionHash
        })
    } else if (network === moonriverNetwork) {
      return _launchpadContract.methods
        .claimToken(pid)
        .send({ from: account, gasLimit: 12950000 })
        .on('transactionHash', (tx) => {
          console.log(tx)
          return tx.transactionHash
        })
    }

    return _launchpadContract.methods
      .claimToken(pid)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } catch (error) {
    console.log('harvest exception  ', error)
    return null
  }
}

export const getMaxAllocation = async (
  lpAddress,
  pid,
  access,
  account,
  network,
) => {
  try {
    if (!lpAddress) {
      return null
    }

    const chainId = await getCurrentNetworkId()
    const currentNetwork = getNetworkName(chainId)
    const _launchpadContract = getCurrentLaunchpadContract(
      lpAddress,
      pid,
      access,
      network,
      currentNetwork,
    )

    const maxAllocation = await _launchpadContract.methods
      .getUserPurchaseAllocation(pid, account)
      .call()

    return maxAllocation
  } catch (error) {
    console.log('ethTest: getMaxAllocation exception  ', {
      error,
      lpAddress,
      pid,
    })
    return '0'
  }
}

// fetch user staking data
export const getUserStakingData = async (account) => {
  try {
    if (!account) {
      return null
    }

    const stakingContractEth = {
      address: stakeContractAddresses.ethereum?.[1],
      abi: stakingAbi,
    }
    const stakingContractBsc = {
      address: stakeContractAddresses.bsc[56],
      abi: stakingAbi,
    }
    const stakingContractPolygon = {
      address: stakeContractAddresses.polygon[137],
      abi: stakingAbi,
    }

    const [stakedDataEth, stakedDataPoly, stakeDataBsc] = await readContracts({
      contracts: [
        {
          ...stakingContractEth,
          functionName: 'userInfo',
          args: [0, account],
          chainId: 1,
        },

        {
          ...stakingContractPolygon,
          functionName: 'userInfo',
          args: [0, account],
          chainId: 137,
        },
        {
          ...stakingContractBsc,
          functionName: 'userInfo',
          args: [5, account],
          chainId: 56,
        },
      ],
    })

    const _totalStakedAmount = new BigNumber(stakedDataEth?.amount?.toString())
      .plus(stakedDataPoly?.amount?.toString())
      .plus(stakeDataBsc?.amount?.toString())
      .toFixed(0)
      .toString()

    console.log('getUserStakingData total staked ', {
      _totalStakedAmount,
    })
    return _totalStakedAmount
  } catch (e) {
    console.log('getUserStakingData', { e })
    return '0'
  }
}

export const getUserInfo = async (lpAddress, pid, access, account, network) => {
  try {
    if (!lpAddress) {
      return null
    }

    const idoContract = {
      address: lpAddress,
      abi: abiMapping?.[lpAddress],
    }

    const [userInfo, harvestInfo] = await readContracts({
      contracts: [
        {
          ...idoContract,
          functionName: 'getUserInfo',
          args: [pid, account],
          chainId: networkToChain?.[network],
        },
        {
          ...idoContract,
          functionName: 'users',
          args: [pid, account],
          chainId: networkToChain?.[network],
        },
      ],
    })

    // console.log('harvest fetched ', { userInfo, harvestInfo })

    return { userInfo, harvestInfo }
  } catch (e) {
    console.log('getUserInfo ', e)
    return {}
  }
}

export const getPurchaseStats = async (
  tokenName,
  purchasedToken,
  ratio,
  network,
) => {
  const stats = { amountUsd: 0, profit: 0 }
  try {
    const tokenId = getTokenId(tokenName, network)

    const defaultTokenPrice = constantPrice(tokenName, network)

    const [tokenCurrentPrice, nativeTokenPrice] = await Promise.all([
      !defaultTokenPrice
        ? getTokenPriceFromCoinGecko(network, tokenId)
        : defaultTokenPrice,
      getTokenPriceFromCoinGecko(network),
    ])

    // console.log('getPurchaseStats state', {
    //   tokenCurrentPrice,
    //   nativeTokenPrice,
    // })

    const tokenCurrentUsdValue = new BigNumber(purchasedToken)
      .times(tokenCurrentPrice)
      .toFixed(4)
      .toString()

    const tokenInitialUsdValue = new BigNumber(
      purchasedToken ? purchasedToken : 0,
    )
      .times(nativeTokenPrice)
      .div(ratio)
      .toFixed(4)
      .toString()

    stats.amountUsd = tokenInitialUsdValue
    stats.profit = getProfit(tokenInitialUsdValue, tokenCurrentUsdValue)
    return stats
  } catch (error) {
    console.log('ethTest: getPurchaseStats', error)
    return stats
  }
}

export const toWei = (tokens) => {
  if (!tokens) {
    tokens = '0'
  }
  return Web3.utils.toWei(tokens, 'ether')
}

export const fromWei = (tokens) => {
  if (!tokens) {
    tokens = '0'
  }

  return Web3.utils.fromWei(tokens, 'ether')
}

export const getCurrentNetworkId = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    const id = await web3.eth.getChainId()

    if (id) {
      return id
    } else {
      try {
        const web3 = getWeb3Provider('ethereum')
        return await web3.eth.getChainId()
      } catch (error) {
        return config.chainId
      }
    }
  } else {
    return config.chainId
  }
}

export const getCurrentAccount = async () => {
  let accounts = []

  try {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const accountAddress = accounts.length > 0 ? accounts[0] : null
    return accountAddress
  } catch (error) {
    console.log('getAccounts', error)
    return error
  }
}

export const isMetaMaskInstalled = () => {
  return typeof window.web3 !== 'undefined'
}

const isHarmonyNetwork = (networkId) => {
  let _flag = false
  Object.keys(harmonyChainIds).forEach((value, index) => {
    if (
      harmonyChainIds?.[value]?.testnet.toString() === networkId?.toString() ||
      harmonyChainIds?.[value]?.mainnet.toString() === networkId?.toString()
    ) {
      _flag = true
    }
  })
  return _flag
}

export const getNetworkName = (networkId) => {
  if ([56, 97].includes(parseInt(networkId))) {
    return bscNetwork
  } else if ([137, 80001].includes(parseInt(networkId))) {
    return polygonNetwork
  } else if (isHarmonyNetwork(networkId)) {
    return harmonyNetwork
  } else if (
    [config.moonriverChain, config.moonriverChainTestent].includes(
      parseInt(networkId),
    )
  ) {
    return moonriverNetwork
  } else if (config.astarChain === parseInt(networkId)) {
    return astarNetwork
  } else {
    return ethereumNetwork
  }
}

const getTokenContract = (tokenAddress, account, lpNetwork, currentNetwork) => {
  const tokenContract = getContractInstance(
    ERC20Abi,
    tokenAddress,
    lpNetwork,
    currentNetwork,
  )

  return tokenContract
}

const getCurrentLaunchpadContract = (
  lpAddress,
  poolId,
  access,
  lpNetwork,
  currentNetwork,
) => {
  const abi = Object.keys(abiMapping).includes(lpAddress)
    ? abiMapping[lpAddress]
    : abiMapping[access]

  const _lpContract = getContractInstance(
    abi,
    lpAddress,
    lpNetwork,
    currentNetwork,
  )

  return _lpContract
}

const getWeb3Provider = (network, nativeNetwork) => {
  let rpc
  if (network === polygonNetwork) {
    // set polygon rpc native or infura
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : new Web3.providers.HttpProvider(config.ankrPolygonRpc)
  } else if (network === harmonyNetwork) {
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : currentConnection === 'mainnet'
        ? new Web3.providers.HttpProvider(config.hmy_rpc_mainnet)
        : new Web3.providers.HttpProvider(config.hmy_rpc_testnet)
  } else if (network === bscNetwork) {
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : currentConnection === 'mainnet'
        ? new Web3.providers.HttpProvider(config.bscRpcMainnet)
        : new Web3.providers.HttpProvider(config.bscRpcTestnet)
  } else if (network === moonriverNetwork) {
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : currentConnection === 'mainnet'
        ? new Web3.providers.HttpProvider(config.moonriverRpc)
        : new Web3.providers.HttpProvider(config.moonriverRpcTestnet)
  } else if (network === astarNetwork) {
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : currentConnection === 'mainnet'
        ? new Web3.providers.HttpProvider(config.astarRpc)
        : new Web3.providers.HttpProvider(config.astarRpc)
  } else {
    rpc =
      nativeNetwork === network
        ? window.ethereum
        : new Web3.providers.HttpProvider(config.ankrEthereumRpc)
  }

  const web3 = new Web3(rpc)
  return web3
}

//matic connector
export const getContractInstance = (
  abi,
  contractAddress,
  network,
  nativeNetwork,
) => {
  const web3 = getWeb3Provider(network, nativeNetwork)
  const _instance = new web3.eth.Contract(abi, contractAddress)
  _instance.isNative = network === nativeNetwork
  return _instance
}

export const formatFloatValue = (value, precision = 2) => {
  const _value = !value ? '0' : value

  return new BigNumber(_value).toFixed(precision).toString()
}

export const formattedNetworkName = (network) => {
  const networks = {
    polygon: 'Polygon',
    ethereum: 'Ethereum',
    bsc: 'Binance Smart Chain',
    harmony: 'Harmony',
    polygon: 'Polygon',
    moonriver: 'Moonriver',
    astar: 'Astar',
    arbitrum: 'Arbitrum One',
  }
  if (Object.keys(networks).includes(network)) {
    return networks[network]
  }
  return network
}

//input  { chainId, chainName, currency: {name, symbol, decimals }, rpcUrls, blockExplorer }
export const setupNetwork = async (networkObject) => {
  const provider = window.ethereum
  if (provider) {
    // const _chainId = parseInt(networkObject.chainId, 10)
    try {
      if (
        networkObject.chainId === `0x${config.chainId.toString(16)}` ||
        networkObject.chainId === `0x${config.chainIdTestnet.toString(16)}`
      ) {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkObject.chainId }],
        })
      }
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [networkObject],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    )
    return false
  }
}

export const getPoolClaimTimeArr = (poolId, network) => {
  const lp = supportedPools.find(
    (_lp) => parseInt(_lp.pid) === parseInt(poolId) && _lp.network === network,
  )
  if (!lp) {
    // console.log('ethTest: lp not found ', { poolId, network })
    return []
  }

  const distribution = lp.harvestDistribution ? lp.harvestDistribution : []
  if (lp.claimTimeArr && lp.claimTimeArr.length > 0) {
    return [lp.claimTimeArr, distribution]
  } else {
    return [[lp.claimAt], distribution]
  }
}

export const formatCurrency = (
  value,
  usd = false,
  fractionDigits = 1,
  currencyFormat = false,
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 4,
  })

  //for currency format with $symbol
  if (usd) {
    return formatter.format(value ? value : 0)?.slice(1)
  }

  if (typeof window.web3 === 'undefined') {
    return formatter.format(value ? value : 0).slice(1)
  }

  return formatter.format(value ? value : 0).slice(1)
}

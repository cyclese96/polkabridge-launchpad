import BigNumber from 'bignumber.js'
// import { ethers } from 'ethers'
import axios from 'axios'
import config from '../config'
import { supportedPools, START_NEW_POOL_AT, bscNetwork, ethereumNetwork, stakeAddressMatic, stakeContractAddresses, currentConnection, infuraMainnetApi, infuraKovenApi, ethereumInfuraRpc, ethereumInfuraTestnetRpc, polygonMainnetInfuraRpc, polygonTestnetInfuraRpc, polygonNetwork } from './lib/constants'
import { pbr, pbrAddress, pbrAddressMainnet } from '../constants/tokenAddresses'
import Web3 from 'web3'
import { createAwait } from 'typescript'
import maticStakeAbi from '../contracts/MaticStakeContract.json'
import stakingAbi from '../contracts/staking.json'
import LaunchpadAbi from './lib/abi/masterLaunchpad.json';
import ERC20Abi from './lib/abi/erc20.json'


import { getBalanceNumber } from '../utils/formatBalance';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

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
        lpBscAddress,
        lpBscContract,
        lpBscExplorer,
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
        access,
        network,
        distribution,
        startAt,
        endAt,
        claimAt,
        startDate
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
        lpBscAddress,
        lpBscContract,
        lpBscExplorer,
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
        access,
        network,
        distribution,
        startAt,
        endAt,
        claimAt,
        startDate
      }),
    )
    : []
}

// default launchpads
export const getDefaultLaunchpads = () => {

  const bscChainId = currentConnection === 'mainnet' ? 56 : 97;
  const chainId = currentConnection === 'mainnet' ? 1 : 42;

  const pools = supportedPools.map((pool) => {

    if (pool.network === bscNetwork) {
      return Object.assign(pool, {
        lpAddress: pool.lpAddresses[bscChainId],
        tokenAddress: pool.tokenAddresses[bscChainId],
        lpBscAddress: pool.lpBscAddresses[bscChainId],//set network id for current bsc
        lpBscContract: null,
        lpContract: getContractInstance(LaunchpadAbi, pool.lpAddresses[chainId], 'ethereum'),
        tokenContract: getContractInstance(ERC20Abi, pool.tokenAddresses[chainId], 'ethereum'),
      })
    } else {
      return Object.assign(pool, {
        lpAddress: pool.lpAddresses[chainId],
        tokenAddress: pool.tokenAddresses[chainId],
        lpContract: getContractInstance(LaunchpadAbi, pool.lpAddresses[chainId], 'ethereum'),
        tokenContract: getContractInstance(ERC20Abi, pool.tokenAddresses[chainId], 'ethereum'),
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
      lpBscAddress,
      lpBscContract,
      lpBscExplorer,
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
      access,
      network,
      distribution,
      startAt,
      endAt,
      claimAt,
      startDate
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
      lpBscAddress,
      lpBscContract,
      lpBscExplorer,
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
      access,
      network,
      distribution,
      startAt,
      endAt,
      claimAt,
      startDate
    }),
  )
}


export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getTotalLocked = async (masterChefContract) => {
  return masterChefContract.methods.totalLock().call()
}



export const getTotalLockedValue = async (tokenContract, lpContract, pbrPrice) => {
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  const tokenAmountTotal = new BigNumber(tokenAmountWholeLP)
    .div(new BigNumber(10).pow(tokenDecimals))
  var usdValue = tokenAmountTotal.times(pbrPrice).times(2);
  return usdValue;
}



export const getLPValue = async (
  masterChefContract,
  lpContract,
  tokenAContract,
  tokenBContract,
  pid,
  pbrPrice,
  tokenASymbol,
  tokenBSymbol,
  isActived,
  poolWeight
) => {
  var usdtAddress;
  var usdcAddress;
  var daiAddress;
  var wethAddress;
  var finalpbrAddress;
  if (config.chainId == 1) {//mainnet{
    usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
    wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    finalpbrAddress = pbrAddressMainnet;
  }
  else {//rinkeby =4
    usdtAddress = '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02'
    usdcAddress = '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b'
    daiAddress = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735';
    wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
    finalpbrAddress = pbrAddress;
  }
  var tokenAmount = new BigNumber(0)
  var token2Amount = new BigNumber(0)
  var totalToken2Value = new BigNumber(0)
  var tokenPriceInToken2 = new BigNumber(0)
  var tokenAmountTotal = new BigNumber(0)
  var token2AmountTotal = new BigNumber(0)
  var usdValue = new BigNumber(0);
  var totalRewardsClaimed = new BigNumber(0);

  if (isActived == true) {


    // Get balance of the token address
    const balanceTokenA = await tokenAContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    //console.log("balanceTokenA ", tokenASymbol, pid, balanceTokenA);

    const tokenADecimals = await tokenAContract.methods.decimals().call()
    // const balance = await lpContract.methods
    //   .balanceOf(masterChefContract.options.address)
    //   .call()

    const balanceTokenB = await tokenBContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    //console.log("balanceTokenB ", tokenBSymbol, pid, balanceTokenB);

    const tokenBDecimals = await tokenBContract.methods.decimals().call()


    const totalSupplyLPToken = await lpContract.methods.totalSupply().call()
    var priceTokenA, priceTokenB;
    if (tokenBContract._address.toLowerCase() == usdtAddress
      || tokenBContract._address.toLowerCase() == usdcAddress
      || tokenBContract._address.toLowerCase() == daiAddress) {
      priceTokenB = 1;
    }
    else if (tokenBContract._address.toLowerCase() == wethAddress) {
      const { data } = await axios.get(config.coingecko + "/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false");
      priceTokenB = data.ethereum.usd;
    }
    else {
      priceTokenB = 1;
    }
    //console.log("priceTokenB ", tokenBSymbol, pid, priceTokenB)
    //price tokenA
    if (tokenAContract._address.toLowerCase() == finalpbrAddress) {
      priceTokenA = pbrPrice;
    }
    else {
      priceTokenA = new BigNumber(1);
    }
    //console.log("totalSupplyLPToken", pid, Web3.utils.fromWei(totalSupplyLPToken, 'ether'));

    var lpValuce = (new BigNumber((new BigNumber(balanceTokenA).times(priceTokenA))).plus(
      (new BigNumber(new BigNumber(balanceTokenB).times(new BigNumber(priceTokenB)))))).dividedBy(new BigNumber(totalSupplyLPToken));
    //console.log("lpValuce", pid, lpValuce.toString());

    //total locked value=lpvalue*totalLPLockedPool
    var totalLpInFarmPool = await lpContract.methods.balanceOf(masterChefContract._address).call()
    //console.log("totalLpInFarmPool", pid, totalLpInFarmPool.toString());

    usdValue = new BigNumber(totalLpInFarmPool).times(lpValuce);
    //console.log("usdValue", pid, usdValue.toString());


    var dataClaimed = await masterChefContract.methods.totalRewardClaimed(pid).call()
    totalRewardsClaimed = new BigNumber(dataClaimed)

  }

  var finaldata = {
    pid,
    tokenAmount,
    token2Amount,
    totalToken2Value,
    tokenPriceInToken2,
    usdValue,
    tokenAmountTotal,
    token2AmountTotal,
    poolWeight,
    totalRewardsClaimed
  }

  return finaldata

}


export const getPBRPrice = async (farms) => {

  if (!farms || !farms[0] || !farms[0].lpContract) {

    return new BigNumber(0);
  }

  const amountPBRInPool = await farms[0].tokenContract.methods
    .balanceOf(farms[0].lpTokenAddress)
    .call()
  //console.log("amountPBRInPool", amountPBRInPool);
  const amountETHInPool = await farms[0].token2Contract.methods
    .balanceOf(farms[0].lpTokenAddress)
    .call()
  // console.log("amountETHInPool", amountETHInPool);

  const { data } = await axios.get(config.coingecko + "/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false");
  var ethprice = 0;

  if (data) {
    ethprice = data.ethereum.usd;
  }
  return new BigNumber((new BigNumber(amountETHInPool).dividedBy(amountPBRInPool)).times(ethprice))



}


export const getLPTokenStaked = async (
  pbr,
  lpContract,
) => {
  var chef = getMasterChefContract(pbr)

  try {
    const balance = await lpContract.methods
      .balanceOf(chef.options.address)
      .call()
    return new BigNumber(balance)
  } catch (e) {
    return
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
    .approve(address, MaxUint256)
    .send({ from: account })
}

export const checkPoolActive = async (startAt) => {
  let now = new Date().getTime()
  return startAt > 0 ? now * 1000 >= startAt : false
}

export const getETHBalance = async (provider, account) => {
  if (!provider || !account) {
    return 0;
  }
  const web3 = new Web3(provider || config.rpc)
  let balance = await web3.eth.getBalance(account)
  return getBalanceNumber(new BigNumber(balance))
}

export const getHistory = async (account) => {
  let history = []
  return history
}

export const getProgress = async (lpContract, pid) => {
  try {
    //if (pid == 1) return new BigNumber(100)
    const [remainToken, totalToken] = await Promise.all([
      lpContract.methods
        .getRemainIDOToken(pid)
        .call(),
      lpContract.methods
        .getBalanceTokenByPoolId(pid)
        .call()
    ])

    // console.log({remainToken, totalToken } )
    if (remainToken && totalToken) {
      let remain = new BigNumber(remainToken);
      let total = new BigNumber(totalToken);

      if (total > 0) {
        //return pid === 1 ? total.minus(remain).div(total).times(100) : new BigNumber(100) //
        return total.minus(remain).div(total).times(100);
      }
    }
  } catch (e) {
    console.log('getProgress: ', e)
    if (pid < 0) {
      return new BigNumber(100)
    } else {
      return
    }
  }
}

export const getIsWhitelist = async (lpContract, pid, stakeAmount, account) => {
  try {
    const isWhitelist = await lpContract.methods
      .IsWhitelist(account, pid, convertToWei(stakeAmount))
      .call()
    // console.log('getIsWhitelist fetched from lpContract ', isWhitelist)
    return isWhitelist
  } catch (e) {
    console.log('getIsWhitelist', e)
    return
  }
}

export const getPurchasesAmount = async (lpContract, pid, account) => {
  try {
    const info = await lpContract.methods
      .getWhitelistfo(pid)
      .call({ from: account })

    // console.log('getPurchased amount from lpcontarct ', info)
    if (info[5]) {
      return getBalanceNumber(new BigNumber("0"))
    }

    const purchasesAmount = await lpContract.methods
      .getUserTotalPurchase(pid)
      .call({ from: account })

    return getBalanceNumber(new BigNumber(purchasesAmount))
  } catch (e) {
    console.log('getPurchasesAmount', e)
    return
  }
}

const signedIdoString = async (account) => {
  try {
    const signedRes = await axios.post("http://localhost:5000/api/ido/sign/v1", { userAddress: account, apiKey: process.env.REACT_APP_IDO_API_KEY })

    return signedRes.data;
  } catch (error) {
    console.log("signedIdoString", error)
    return null
  }

}

const convertToWei = (amount) => {
  const _amount = !amount ? '0' : amount;
  return new BigNumber(_amount).times(new BigNumber(10).pow(18)).toString()
}

export const joinpool = async (launchpadContract, pid, stakeAmount, ethValue, account) => {

  try {
    const signedData = await signedIdoString(account)
    // console.log('signedIdoString', signedData)

    const v = signedData.v;
    const r = signedData.r;
    const s = signedData.s;


    // console.log({ stakeAmount })
    return launchpadContract.methods
      .purchaseIDO(
        stakeAmount,
        pid,
        v,
        r,
        s
      )
      .send({ from: account, value: convertToWei(ethValue) })
      .on('transactionHash', (tx) => {
        console.log('joinpool', tx)
        return tx.transactionHash
      })
  } catch (error) {
    console.log('joinpool', error)
    return null
  }

}

export const harvest = async (launchpadContract, pid, account) => {
  return launchpadContract.methods
    .claimToken(
      pid
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
// export const harvest = async (masterChefContract, pid, account) => {
//   return masterChefContract.methods
//     .claimReward(pid)
//     .send({ from: account })
//     .on('transactionHash', (tx) => {
//       console.log(tx)
//       return tx.transactionHash
//     })
// }

export const getStaked = async (pid, account) => {
  try {

    const abi = maticStakeAbi
    const address = currentConnection === 'mainnet' ? stakeContractAddresses.polygon[137] : stakeContractAddresses.polygon[80001];
    const maticStakeContract = getContractInstance(abi, address)

    const stakeDate = await maticStakeContract.methods
      .userInfo(0, account)
      .call()
    return stakeDate
  } catch (e) {
    console.log('getStaked', e)
    return {}
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}


export const getXPolkaBridgeSupply = async (pbr) => {
  return new BigNumber(await pbr.contracts.xPolkaBridgeStaking.methods.totalSupply().call())
}

export const getLockOf = async (pbr, account) => {
  var pbr = getPolkaBridgeContract(pbr)

  return new BigNumber(await pbr.methods.lockOf(account).call())
}

export const unlock = async (pbr, account) => {
  var pbr = getPolkaBridgeContract(pbr)
  return pbr.methods
    .unlock()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const enter = async (contract, amount, account) => {
  return contract.methods
    .enter(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}



export const leave = async (contract, amount, account) => {
  return contract.methods
    .leave(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
// fetch user staking data
export const getUserStakingData = async (pid, account) => {

  try {

    const abi = stakingAbi;
    const address = currentConnection === 'mainnet' ? stakeContractAddresses.ethereum[1] : stakeContractAddresses.ethereum[42];
    const stakeContract = getContractInstance(abi, address, 'ethereum')

    const addressMatic = currentConnection === 'mainnet' ? stakeContractAddresses.polygon[137] : stakeContractAddresses.polygon[80001];
    const maticStakeContract = getContractInstance(abi, addressMatic, 'polygon')

    const [stakedDataEth, stakedDataPoly] = await Promise.all([
      stakeContract.methods
        .userInfo(0, account)
        .call(),
      maticStakeContract.methods
        .userInfo(0, account)
        .call()
    ])

    const _totalStakedAmount = new BigNumber(stakedDataEth.amount).plus(stakedDataPoly.amount).toFixed(0).toString()
    console.log('fetch staked amount', _totalStakedAmount)
    return _totalStakedAmount
  } catch (e) {
    console.log('getUserStakingData', e)
    return '0'
  }
}

export const getUserInfo = async (lpContract, pid, account) => {

  try {
    // console.log('getting user info', { add: lpContract._address, pid, account })
    const userInfo = await lpContract.methods
      .getUserInfo(pid, account)
      .call()

    return userInfo
  } catch (e) {
    console.log('getUserInfo ', e)
    return {}
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
    const id = await window.ethereum.networkVersion;

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
};

export const getCurrentAccount = async () => {
  let accounts = [];

  try {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const accountAddress = accounts.length > 0 ? accounts[0] : null;
    return accountAddress
  } catch (error) {
    console.log('getAccounts', error)
    return error;
  }

};

export const isMetaMaskInstalled = () => {
  return typeof window.web3 !== "undefined";
};

export const getNetworkName = (networkId) => {
  if ([56, 97].includes(parseInt(networkId))) {
    return bscNetwork
  } else if ([137, 80001].includes(parseInt(networkId))) {
    return polygonNetwork
  } else {
    return ethereumNetwork
  }
}

const getWeb3Provider = (network) => {
  let rpc;
  if (network === 'polygon') {
    rpc = currentConnection === 'mainnet' ? polygonMainnetInfuraRpc : polygonTestnetInfuraRpc;
  } else {
    rpc = currentConnection === 'mainnet' ? ethereumInfuraRpc : ethereumInfuraTestnetRpc;
  }

  const web3 = new Web3(rpc);
  return web3;
}

//matic connector
const getContractInstance = (abi, contractAddress, network = 'polygon') => {

  const web3 = getWeb3Provider(network)

  return new web3.eth.Contract(abi, contractAddress);
};


export const formatFloatValue = (value, precision = 2) => {
  const _value = !value ? '0' : value;

  return new BigNumber(_value).toFixed(precision).toString();

}
import BigNumber from 'bignumber.js'
import config from '../config'
import {
  bscNetwork,
  ethereumNetwork,
  harmonyNetwork,
  moonriverNetwork,
  polygonNetwork,
  supportedPools,
  tokenIdMapping,
} from './lib/constants'
import axios from 'axios'

export const networkSymbol = (network) => {
  if (network === bscNetwork) {
    return 'BNB'
  } else if (network === polygonNetwork) {
    return 'MATIC'
  } else if (network === harmonyNetwork) {
    return 'ONE'
  } else if (network === moonriverNetwork) {
    return 'MOVR'
  } else {
    return 'ETH'
  }
}

export const networkIcon = (network) => {
  if (network === bscNetwork) {
    return '/img/tokens/bnb.png'
  } else if (network === polygonNetwork) {
    return '/img/tokens/polygon.png'
  } else if (network === harmonyNetwork) {
    return '/img/tokens/one.png'
  } else if (network === moonriverNetwork) {
    return '/img/moon.png'
  } else {
    return '/img/tokens/eth.png'
  }
}

export const isEqual = (value1, value2) => {
  const _value1 = new BigNumber(value1 ? value1 : 0)
  const _value2 = new BigNumber(value2 ? value2 : 0)

  // console.log(
  //   'equal flag  ',
  //   new BigNumber(_value1.toFixed(4)).eq(_value2.toFixed(4)),
  // )
  return new BigNumber(_value1.toFixed(3).toString()).eq(
    _value2.toFixed(3).toString(),
  )
}

export const getPoolReigsterLink = (pid, network) => {
  const poolObject = supportedPools.find(
    (item) => item.pid === pid && item.network === network,
  )
  if (!poolObject) {
    return null
  }

  return !poolObject.registerForm ? null : poolObject.registerForm
}

export const getTokenPrice = (pid, network) => {
  const poolObj = supportedPools.find(
    (item) => item.pid === pid && item.network === network,
  )

  if (!poolObj) {
    return null
  }

  return poolObj?.price
}

export const getProfit = (initialValue, currentValue) => {
  try {
    if (new BigNumber(currentValue).eq(0)) {
      return '0'
    }

    if (new BigNumber(initialValue).eq(0)) {
      return '0'
    }

    const profit = new BigNumber(currentValue)
      .minus(initialValue)
      .multipliedBy(100)
      .div(initialValue)
      .toFixed(2)
      .toString()
    return profit
  } catch (error) {
    return 0
  }
}

export const getTokenId = (tokenName, network) => {
  const poolObj = supportedPools.find(
    (item) => item.name === tokenName && item.network === network,
  )

  if (!poolObj) {
    return null
  }

  return poolObj.tokenId ? poolObj.tokenId : poolObj.name.toLowerCase()
}

export const getTokenPriceFromCoinGecko = async (network, tokenId = null) => {
  try {
    if (!network) {
      return 0
    }

    if (!Object.keys(tokenIdMapping).includes(network)) {
      return 0
    }

    const token_id = tokenId ? tokenId : tokenIdMapping?.[network]

    const priceRes = await axios.get(
      config.coingecko +
        `/v3/simple/price?ids=${token_id}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
    )

    const priceData = priceRes.data
    const tokenPrice = priceData?.[token_id] ? priceData[token_id].usd : '0'

    return tokenPrice
  } catch (error) {
    console.log('fetchTokenPrice ', { error })
    return 0
  }
}

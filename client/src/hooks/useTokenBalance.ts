import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getBalance } from '../utils/erc20'
import { getETHBalance } from '../pbr/utils'
import useWallet from './useWallet'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const [ether, setEthBalance] = useState(0)

  const { account } = useWallet()

  // const fetchBalance = useCallback(async () => {
  //   const balance = await getBalance(ethereum, tokenAddress, account)
  //   const eth  = await  getETHBalance(ethereum, account)
  //   setBalance(new BigNumber(balance))
  //   setEthBalance(eth)

  // }, [account, ether, tokenAddress])

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (account) {
  //       fetchBalance()
  //     }

  //   }, 30000)
  //   if (account) {
  //     fetchBalance()
  //   }
  //   return () => clearInterval(interval)

  // }, [account, ethereum, setBalance, tokenAddress])

  return { pbrBalance: balance, ether }
}

export default useTokenBalance

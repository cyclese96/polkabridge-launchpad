import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'


const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        fetchBalance()
      }

    }, 30000)
    if (account) {
      fetchBalance()
    }
    return () => clearInterval(interval)

  }, [account, ethereum, setBalance, tokenAddress])

  return balance
}

export default useTokenBalance

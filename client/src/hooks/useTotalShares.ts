import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'


const useTotalShares = (tokenAddress: string, account: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useTotalShares

import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getTotalSupply } from '../utils/erc20'
import useBlock from './useBlock'


const useTokenSupply = (tokenAddress: string) => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const totalSupply = await getTotalSupply(ethereum, tokenAddress)
    setTotalSupply(new BigNumber(totalSupply))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    fetchBalance()
  }, [account, ethereum, setTotalSupply, block, tokenAddress])

  return totalSupply
}

export default useTokenSupply

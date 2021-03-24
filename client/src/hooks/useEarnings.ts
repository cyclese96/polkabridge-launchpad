import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const masterChefContract = getMasterChefContract(pbr)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, pbr])

  useEffect(() => {
    if (account && masterChefContract && pbr) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, pbr])

  return balance
}

export default useEarnings

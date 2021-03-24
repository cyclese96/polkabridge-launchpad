import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const pbr = usePolkaBridge()
  const masterChefContract = getMasterChefContract(pbr)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, pbr])

  useEffect(() => {
    if (account && pbr) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, pbr])

  return balance
}

export default useStakedBalance

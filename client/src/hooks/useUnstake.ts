import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../pbr/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const pbr = usePolkaBridge()
  const masterChefContract = getMasterChefContract(pbr)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, pbr],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake

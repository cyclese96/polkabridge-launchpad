import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../pbr/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const pbr = usePolkaBridge()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stake(
          getMasterChefContract(pbr),
          pid,
          amount,
          account,
        )
        console.log(txHash)
        return txHash
      }
      catch (ex) {
        return ''
      }
    },
    [account, pid, pbr],
  )

  return { onStake: handleStake }
}

export default useStake

import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'

import { harvest, getMasterChefContract } from '../pbr/utils'
import useWallet from './useWallet'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const pbr = usePolkaBridge()
  const masterChefContract = getMasterChefContract(pbr)

  const handleReward = useCallback(async () => {
    try {
      const txHash = await harvest(masterChefContract, pid, account)
      console.log(txHash)
      return txHash
    } catch (ex) {
      console.error(ex)
      return ''
    }
  }, [account, pid, pbr])

  return { onReward: handleReward }
}

export default useReward

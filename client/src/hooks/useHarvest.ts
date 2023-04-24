import { useCallback } from 'react'

import { harvest } from '../pbr/utils'
import useWallet from './useWallet'

const useHarvest = () => {
  const { account } = useWallet()

  const handleHarvest = useCallback(
    async (pid: number, access: string, lpAddress: string, network: string) => {
      try {
        const txHash = await harvest(lpAddress, pid, access, account, network)
        console.log(txHash)
        return txHash
      } catch (ex) {
        console.log(ex)
        return ''
      }
    },
    [account],
  )

  return { onHarvest: handleHarvest }
}

export default useHarvest

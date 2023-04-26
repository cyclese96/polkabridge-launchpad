import { useCallback } from 'react'

import { joinpool } from '../pbr/utils'
import useWallet from './useWallet'

const useJoinPool = () => {
  const { account } = useWallet()
  const handleJoinPool = useCallback(
    async (
      pid: number,
      access: string,
      tokenValue: string,
      stakeAmount: string,
      lpAddress: string,
      network: string,
      symbol: string,
    ) => {
      try {
        const txHash = await joinpool(
          lpAddress,
          pid,
          access,
          stakeAmount,
          tokenValue,
          account,
          network,
          symbol,
        )
        console.log(txHash)
        return txHash
      } catch (ex) {
        console.log('joinpool', ex)
        return ''
      }
    },
    [account],
  )

  return { onJoinPool: handleJoinPool }
}

export default useJoinPool

import { useCallback, useEffect, useState } from 'react'
import { TransactionState } from '../utils/interface'
import { FAUCET_ADDRESSES } from '../constants'
import useActiveWeb3React from './useActiveWeb3React'
import { useWaitForTransaction } from 'wagmi'
import FAUCET_ABI from '../contracts/abi/faucet.json'
import { writeContract } from '@wagmi/core'

export function useClaimCallback() {
  const { chainId } = useActiveWeb3React()

  const initialState = {
    hash: '',
    status: null,
    state: 0,
    type: null,
  }
  const [trxData, setTrxData] = useState(initialState)

  const handleClaim = useCallback(
    async (tokenAddress) => {
      if (!chainId) {
        return
      }

      setTrxData({
        ...trxData,
        status: TransactionState.WAITING,
        state: 1,
        type: 'claim',
      })

      const data = await writeContract({
        address: FAUCET_ADDRESSES[chainId || ''],
        abi: FAUCET_ABI,
        functionName: 'claimTokens',
        args: [tokenAddress],
      })

      setTrxData({
        ...trxData,
        hash: data.hash,
        status: TransactionState.PENDING,
        state: 2,
        type: 'claim',
      })
    },
    [setTrxData, trxData, chainId],
  )

  const resetClaimTrxState = useCallback(() => {
    setTrxData(initialState)
  }, [setTrxData])

  const {
    data: trxWatchData,
    isError,
    isLoading: trxWatchLoading,
  } = useWaitForTransaction({
    hash: !trxData?.hash ? '' : trxData?.hash,
  })
  useEffect(() => {
    if (!trxWatchData && !trxWatchLoading) {
      return
    }

    if (trxWatchData && !trxWatchLoading) {
      // trx success
      setTrxData({
        hash: trxWatchData?.hash,
        status: TransactionState.COMPLETED,
        state: 3,
      })
    }
  }, [trxWatchData, trxWatchLoading, isError])

  return {
    claimTrxStatus: trxData,
    handleClaim: handleClaim,
    resetClaimTrxState: resetClaimTrxState,
  }
}

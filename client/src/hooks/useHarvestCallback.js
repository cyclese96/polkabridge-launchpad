import { useCallback, useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { writeContract } from '@wagmi/core'
import useWallet from './useWallet'
import { abiMapping } from '../pbr/utils'

export const TransactionState = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
}

export function useHarvestCallback() {
  const { chainId, account } = useWallet()

  const initialState = {
    hash: '',
    status: null,
    state: 0,
    type: null,
  }
  const [trxData, setTrxData] = useState(initialState)

  const handleHarvest = useCallback(
    async (lpPoolId, access, lpAddress, network) => {
      if (!chainId || !account) {
        return
      }

      // console.log('harvest test params ', {
      //   lpPoolId,
      //   access,
      //   lpAddress,
      //   network,
      // })

      setTrxData({
        ...trxData,
        status: TransactionState.WAITING,
        state: 1,
        type: 'harvest',
      })

      const abi = Object.keys(abiMapping).includes(lpAddress)
        ? abiMapping[lpAddress]
        : abiMapping[access]

      try {
        const data = await writeContract({
          address: lpAddress,
          abi: abi,
          functionName: 'claimToken',
          args: [lpPoolId],
          overrides: { gasLimit: 5950000 },
          chainId: chainId,
        })
        // console.log('harvest test trx  ', data)
        setTrxData({
          ...trxData,
          hash: data.hash,
          status: TransactionState.PENDING,
          state: 2,
          type: 'harvest',
        })
      } catch (error) {
        console.log('join pool test trx  ', error)
        setTrxData({
          ...trxData,
          status: TransactionState.FAILED,
          state: 4,
          type: 'harvest',
        })
      }
    },
    [setTrxData, trxData, chainId, account],
  )

  const resetHarvestTrxState = useCallback(() => {
    setTrxData(initialState)
  }, [setTrxData])

  const {
    data: trxWatchData,
    isError,
    status,

    isLoading: trxWatchLoading,
  } = useWaitForTransaction({
    hash: !trxData?.hash ? '' : trxData?.hash,
    chainId: chainId,
    timeout: 10000,
  })
  useEffect(() => {
    if (!trxWatchData && !trxWatchLoading) {
      return
    }

    console.log('harvest test ', { trxWatchData, status, isError })
    if (trxWatchData && !trxWatchLoading) {
      // trx success
      setTrxData({
        hash: trxWatchData?.hash,
        status: TransactionState.COMPLETED,
        state: 3,
      })
    }
  }, [trxWatchData, trxWatchLoading, isError, status])

  return {
    harvestTrxStatus: trxData,
    handleHarvest: handleHarvest,
    resetHarvestTrxState: resetHarvestTrxState,
  }
}

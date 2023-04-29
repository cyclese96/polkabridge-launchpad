import { useCallback, useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { writeContract } from '@wagmi/core'
import useWallet from './useWallet'
import { abiMapping, signedIdoString, toWei } from '../pbr/utils'

export const TransactionState = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
}

export function useJoinPoolCallback() {
  const { chainId, account } = useWallet()

  const initialState = {
    hash: '',
    status: null,
    state: 0,
    type: null,
  }
  const [trxData, setTrxData] = useState(initialState)

  const handleJoinPool = useCallback(
    async (
      lpPoolId,
      access,
      ethValue,
      stakedAmount,
      lpAddress,
      network,
      id,
    ) => {
      if (!chainId || !account) {
        console.log('invalid chain id or account')
        setTrxData({
          ...trxData,
          status: TransactionState.FAILED,
          state: 4,
          type: 'join',
        })
        return
      }

      console.log('join pool test params ', {
        lpPoolId,
        access,
        ethValue,
        stakedAmount,
        lpAddress,
        network,
        id,
      })

      setTrxData({
        ...trxData,
        status: TransactionState.WAITING,
        state: 1,
        type: 'join',
      })

      const signedData = await signedIdoString(account, network, id)

      if (!signedData) {
        console.log('falied to verify staked amount from server')
        setTrxData({
          ...trxData,
          status: TransactionState.FAILED,
          state: 4,
          type: 'join',
        })
        return
      }

      const v = signedData && signedData.v
      const r = signedData && signedData.r
      const s = signedData && signedData.s

      console.log('join pool test signed data ', { v, r, s })

      const abi = Object.keys(abiMapping).includes(lpAddress)
        ? abiMapping[lpAddress]
        : abiMapping[access]

      // .purchaseIDO(stakeAmount, pid, v, r, s)
      // .send({
      //   from: account,
      //   value: convertToWei(ethValue),
      //   gasPrice: 100000000000,
      // })

      try {
        const data = await writeContract({
          address: lpAddress,
          abi: abi,
          functionName: 'purchaseIDO',
          args: [stakedAmount, lpPoolId, v, r, s],
          overrides: {
            from: account,
            value: toWei(ethValue),
            gasLimit: 5950000,
          },
          chainId: chainId,
        })
        console.log('join pool test trx  ', data)
        setTrxData({
          ...trxData,
          hash: data.hash,
          status: TransactionState.PENDING,
          state: 2,
          type: 'join',
        })
      } catch (error) {
        console.log('join pool test trx  ', error)
        setTrxData({
          ...trxData,
          status: TransactionState.FAILED,
          state: 4,
          type: 'join',
        })
      }
    },
    [setTrxData, trxData, chainId, account],
  )

  const resetTrxState = useCallback(() => {
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
    joinTrxStatus: trxData,
    handleJoinPool: handleJoinPool,
    resetJoinTrxState: resetTrxState,
  }
}

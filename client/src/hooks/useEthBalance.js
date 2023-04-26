import { useMemo, useState } from 'react'
import { useBalance } from 'wagmi'
import useWallet from './useWallet'

const useEthBalance = () => {
  const { account, chainId } = useWallet()
  const { data } = useBalance({
    address: account,
    chainId: chainId,
    formatUnits: 'ether',
  })
  // native token balance
  const balance = useMemo(() => data?.formatted, [data])

  return balance
}

export default useEthBalance

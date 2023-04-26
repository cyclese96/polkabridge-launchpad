// /* eslint-disable react-hooks/rules-of-hooks */

import { useMemo } from 'react'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

export default function useWallet() {
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const provider = useProvider()
  const { data: signer } = useSigner()

  const interfaceContext = useMemo(() => {
    return {
      account: address,
      isActive: isConnected,
      connector: connector,
      chainId: chain?.id,
      provider: provider,
      signer: signer,
    }
  }, [address, isConnected, connector, chain, provider, signer])
  return interfaceContext
}

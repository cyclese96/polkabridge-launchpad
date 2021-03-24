import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'

import { unlock } from '../pbr/utils'

const useUnlock = () => {
  const { account } = useWallet()
  const pbr = usePolkaBridge()

  const doTx = useCallback(async () => {
    try {
      const txHash = await unlock(pbr, account)
      return txHash
    }
    catch (ex) {
      return ''
    }
  }, [])

  return { onUnlock: doTx }
}

export default useUnlock

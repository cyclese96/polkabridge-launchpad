import {useCallback} from 'react'

import usePolkaBridge from './usePolkaBridge'
import {useWallet} from 'use-wallet'

import {leave, getXPolkaBridgeStakingContract} from '../pbr/utils'

const useLeave = () => {
  const {account} = useWallet()
  const pbr = usePolkaBridge()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXPolkaBridgeStakingContract(pbr),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pbr],
  )

  return {onLeave: handle}
}

export default useLeave

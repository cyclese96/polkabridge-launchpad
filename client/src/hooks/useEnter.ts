import {useCallback} from 'react'

import usePolkaBridge from './usePolkaBridge'
import {useWallet} from 'use-wallet'

import {enter, getXPolkaBridgeStakingContract} from '../pbr/utils'

const useEnter = () => {
  const {account} = useWallet()
  const pbr = usePolkaBridge()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXPolkaBridgeStakingContract(pbr),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pbr],
  )

  return {onEnter: handle}
}

export default useEnter

import {useCallback} from 'react'

import usePolkaBridge from './usePolkaBridge'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getPolkaBridgeContract,
  getXPolkaBridgeStakingContract
} from '../pbr/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const lpContract = getPolkaBridgeContract(pbr)
  const contract = getXPolkaBridgeStakingContract(pbr)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking

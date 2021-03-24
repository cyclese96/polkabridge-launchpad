import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../pbr/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const masterChefContract = getMasterChefContract(pbr)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove

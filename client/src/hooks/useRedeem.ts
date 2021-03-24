import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../pbr/utils'

const useRedeem = (masterChefContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    try {
      const txHash = await redeem(masterChefContract, account)
      console.log(txHash)
      return txHash
    }
    catch (ex) {
      console.log(ex)
      return ''
    }
  }, [account, masterChefContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem

import {useCallback, useEffect, useState} from 'react'

import BigNumber from 'bignumber.js'
import usePolkaBridge from './usePolkaBridge'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {Contract} from 'web3-eth-contract'

import {getAllowanceStaking} from '../utils/erc20'
import {getMasterChefContract, getPolkaBridgeContract, getXPolkaBridgeStakingContract} from '../pbr/utils'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const {account}: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const lpContract = getPolkaBridgeContract(pbr)
  const stakingContract = getXPolkaBridgeStakingContract(pbr)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowanceStaking(
      lpContract,
      account,
      stakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, stakingContract, lpContract])

  useEffect(() => {
    if (account && stakingContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, stakingContract, lpContract])

  return allowance
}

export default useAllowanceStaking

import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { joinpool, getLaunchpadContract, getBscLaunchpadContract } from '../pbr/utils'
import { ethereumNetwork } from '../pbr/lib/constants'

const useJoinPool = () => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()
    // const launchpadContract = network === ethereumNetwork ? getLaunchpadContract(pbr) : getBscLaunchpadContract(pbr)
    const handleJoinPool = useCallback(
        async (pid: number, tokenValue: string, stakeAmount: string, launchpadContract: any) => {
            try {
                const txHash = await joinpool(
                    launchpadContract,
                    pid,
                    stakeAmount,
                    tokenValue,
                    account,
                )
                console.log(txHash)
                return txHash
            }
            catch (ex) {

                console.log('joinpool', ex)
                return ''
            }
        },
        [account, pbr],
    )

    return { onJoinPool: handleJoinPool }
}

export default useJoinPool
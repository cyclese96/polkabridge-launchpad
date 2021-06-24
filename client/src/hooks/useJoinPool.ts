import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { joinpool, getLaunchpadContract, getBscLaunchpadContract } from '../pbr/utils'
import { ethereumNetwork } from '../pbr/lib/constants'

const useJoinPool = (pid: number, network: String) => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()
    const launchpadContract =  network === ethereumNetwork ? getLaunchpadContract(pbr) : getBscLaunchpadContract(pbr)
    const handleJoinPool = useCallback(
        async (tokenValue: string) => {
            try {
                const txHash = await joinpool(
                    launchpadContract,
                    pid,
                    tokenValue,
                    account,
                )
                console.log(txHash)
                return txHash
            }
            catch (ex) {
                console.log(ex)
                return ''
            }
        },
        [account, pid, pbr],
    )

    return { onJoinPool: handleJoinPool }
}

export default useJoinPool
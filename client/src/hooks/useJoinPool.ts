import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'

import { joinpool, getLaunchpadContract } from '../pbr/utils'

const useJoinPool = (pid: number) => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()

    const handleJoinPool = useCallback(
        async (ethValue: string) => {
            try {
                const txHash = await joinpool(
                    getLaunchpadContract(pbr),
                    pid,
                    ethValue,
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
import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { joinpool } from '../pbr/utils'


const useJoinPool = () => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()
    // const launchpadContract = network === ethereumNetwork ? getLaunchpadContract(pbr) : getBscLaunchpadContract(pbr)
    const handleJoinPool = useCallback(
        async (pid: number, access: string, tokenValue: string, stakeAmount: string, lpAddress: string, network: string, symbol: string) => {
            try {
                const txHash = await joinpool(
                    lpAddress,
                    pid,
                    access,
                    stakeAmount,
                    tokenValue,
                    account,
                    network,
                    symbol
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
import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { harvest } from '../pbr/utils'

const useHarvest = () => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()

    const handleHarvest = useCallback(
        async (pid: number, access: string, lpAddress: string, network: string) => {
            try {
                const txHash = await harvest(
                    lpAddress,
                    pid,
                    access,
                    account,
                    network
                )
                console.log(txHash)
                return txHash

            }
            catch (ex) {
                console.log(ex)
                return ''
            }
        },
        [account, pbr],
    )

    return { onHarvest: handleHarvest }
}

export default useHarvest
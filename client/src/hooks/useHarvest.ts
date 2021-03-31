import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from 'use-wallet'

import { harvest, getLaunchpadContract } from '../pbr/utils'

const useHarvest = (pid: number) => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()

    const handleHarvest = useCallback(
        async () => {
            try {
                const txHash = await harvest(
                    getLaunchpadContract(pbr),
                    pid,
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

    return { onHarvest: handleHarvest }
}

export default useHarvest
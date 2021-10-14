import { useCallback } from 'react'

import usePolkaBridge from './usePolkaBridge'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { harvest, getLaunchpadContract, getBscLaunchpadContract } from '../pbr/utils'
// import { ethereumNetwork } from '../pbr/lib/constants'

const useHarvest = () => {
    const { account } = useWallet()
    const pbr = usePolkaBridge()
    // const launchpadContract =  network === ethereumNetwork ? getLaunchpadContract(pbr) : getBscLaunchpadContract(pbr)
    const handleHarvest = useCallback(
        async (pid: number, launchpadContract: any) => {
            try {
                const txHash = await harvest(
                    launchpadContract,
                    pid,
                    account,
                )
                console.log(txHash)
                return txHash
                // console.log(`lpContract ${launchpadContract._address}  pid ${pid}  account: ${account} `)
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
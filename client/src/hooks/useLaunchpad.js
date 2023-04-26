import { useMemo } from 'react'
import { supportedPools } from '../pbr/lib/constants'

const useLaunchpad = (symbol, poolId) => {
  const launchpads = supportedPools

  const launchpad = useMemo(() => {
    return launchpads.find(
      (launchpad) =>
        launchpad.symbol === symbol && launchpad.pid === parseInt(poolId),
    )
  }, [symbol, poolId])

  return !launchpad ? {} : launchpad
}

export default useLaunchpad

import { useContext } from 'react'
import { Context as LaunchpadsContext, Launchpad } from '../contexts/Launchpads'

const useLaunchpad = (id: string, poolId: number): Launchpad => {
  const { launchpads } = useContext(LaunchpadsContext)
  const launchpad = launchpads.find((launchpad) => launchpad.id === id && launchpad.pid === poolId)
  return launchpad
}

export default useLaunchpad

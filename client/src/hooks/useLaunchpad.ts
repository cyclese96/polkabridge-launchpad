import { useContext } from 'react'
import { Context as LaunchpadsContext, Launchpad } from '../contexts/Launchpads'

const useLaunchpad = (id: string): Launchpad => {
  const { launchpads } = useContext(LaunchpadsContext)
  const launchpad = launchpads.find((launchpad) => launchpad.id === id)
  return launchpad
}

export default useLaunchpad

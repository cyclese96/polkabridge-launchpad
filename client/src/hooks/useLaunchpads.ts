import { useContext } from 'react'
import { Context as LaunchpadsContext } from '../contexts/Launchpads'

const useLaunchpads = () => {
  const { launchpads } = useContext(LaunchpadsContext)
  return [launchpads]
}

export default useLaunchpads

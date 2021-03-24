import { createContext } from 'react'
import { LaunchpadsContext } from './types'

const context = createContext<LaunchpadsContext>({
  launchpads: [],
  unharvested: 0,
})

export default context

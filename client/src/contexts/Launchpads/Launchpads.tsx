import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import usePolkaBridge from '../../hooks/usePolkaBridge'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../pbr/utils'
import { getLaunchpads } from '../../pbr/utils'

import Context from './context'
import { Launchpad } from './types'

const Launchpads: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const pbr = usePolkaBridge()
  const { account } = useWallet()

  const launchpads = getLaunchpads(pbr)
  // const launchpads : Launchpad[] = []

  return (
    <Context.Provider
      value={{
        launchpads,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Launchpads

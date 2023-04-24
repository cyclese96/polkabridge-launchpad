import React, { useCallback, useEffect, useState } from 'react'

import usePolkaBridge from '../../hooks/usePolkaBridge'

import { getLaunchpads } from '../../pbr/utils'

import Context from './context'

const Launchpads: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const pbr = usePolkaBridge()

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

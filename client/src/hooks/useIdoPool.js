import { useMemo } from 'react'
import { supportedPools } from '../pbr/lib/constants'

const useIdoPool = () => {
  const enabledPools = supportedPools.filter((el) => el.pid >= 0)

  const upcomingIdos = useMemo(() => {
    return enabledPools.filter((el) => el.endAt * 1000 > new Date().getTime())
  }, [enabledPools])

  const endedIdos = useMemo(() => {
    return enabledPools
      .filter((lp) => lp.endAt * 1000 < new Date().getTime())
      .sort((a, b) => b.endAt - a.endAt)
  }, [enabledPools])

  return { upcomingIdos, endedIdos }
}

export default useIdoPool

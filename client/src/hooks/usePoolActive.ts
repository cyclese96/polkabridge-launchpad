import { useCallback, useEffect, useState } from 'react'

import { checkPoolActive } from '../pbr/utils'
// import debounce from 'debounce'

const usePoolActive = (startAt: number) => {
  const [active, setActive] = useState(false)
  const getData = useCallback(async () => {
    setActive(await checkPoolActive(startAt))
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return active
}

export default usePoolActive

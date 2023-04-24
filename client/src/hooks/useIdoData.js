import { useMemo, useState } from 'react'
import { supportedPools } from '../pbr/lib/constants'

const useIdoData = () => {
  const [progress, setProgress] = useState(0)
  const [maxAllocation, setMaxAllocation] = useState(0)

  return { progress, endedIdos }
}

export default useIdoPool

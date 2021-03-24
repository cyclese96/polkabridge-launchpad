import { useContext } from 'react'
import { Context } from '../contexts/PolkaBridgeProvider'

const usePolkaBridge = () => {
  const { pbr } = useContext(Context)
  return pbr
}

export default usePolkaBridge

import { useCallback, useEffect, useState } from 'react'

import { getCurrentNetworkId, isMetaMaskInstalled } from '../pbr/utils'


const useNetwork = () => {
  // const _currentNetwork  = 
  const [chainId, setChainId] = useState(Number(localStorage.chainId))
  const [status, setStatus] = useState('connecting')

  const handle = useCallback(
    (_chainId) => {
      // console.log('testConnect: setting network id to ', _chainId)
      setChainId(Number(_chainId))
      localStorage.chainId = _chainId
    },
    [chainId],
  )
  const setConnected = useCallback(
    () => {
      setStatus("connected")
    },
    [status]
  )
  useEffect(() => {
    async function handleUpdate() {
      if (isMetaMaskInstalled()) {

        window.ethereum.on("networkChanged", (networkId) => {
          // console.log('network changed ', networkId)
          setStatus('network changing')
          setChainId(Number(networkId))
          setStatus('connected')
        });

        const _networkId = await getCurrentNetworkId()
        setChainId(Number(_networkId))
        setStatus('connected')
      }
    }
    handleUpdate()
  }, [])

  return { changeNetwork: handle, chainId, setConnected, status }
}

export default useNetwork

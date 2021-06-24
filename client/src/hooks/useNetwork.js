import {useCallback, useEffect, useState} from 'react'
import config from '../config'
import { getCurrentNetworkId, isMetaMaskInstalled } from '../pbr/utils'


const useNetwork = () => {
    const [chainId, setChainId] = useState(Number(localStorage.chainId || config.chainId))
    const [status, setStatus ] = useState('connecting')

  const handle = useCallback(
     (_chainId) => {
      setChainId(Number( _chainId))
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
  useEffect( () => {

    if (isMetaMaskInstalled()) {

      window.ethereum.on("networkChanged",  (networkId) => {
            // console.log('network changed ', networkId)
          setStatus('network changing')
          setChainId(Number(networkId))
        });
    }
    
  }) 

  return {changeNetwork: handle, chainId, setConnected, status }
}

export default useNetwork

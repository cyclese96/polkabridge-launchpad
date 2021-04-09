import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import config from '../../config'

import { PolkaBridge } from '../../pbr'

export interface PolkaBridgeContext {
  pbr?: typeof PolkaBridge
}

export const Context = createContext<PolkaBridgeContext>({
  pbr: undefined,
})

declare global {
  interface Window {
    pbrsauce: any
  }
}

const PolkaBridgeProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [pbr, setPolkaBridge] = useState<any>()

  // @ts-ignore
  window.pbr = pbr
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const pbrLib = new PolkaBridge(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '200',
        defaultGasPrice: '250000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setPolkaBridge(pbrLib)
      window.pbrsauce = pbrLib
    }
    else {
      const chainId = config.chainId
      const pbrLib = new PolkaBridge(config.rpc, chainId, false, {
        defaultAccount: '0x0000000000000000000000000000000000000000',
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '200',
        defaultGasPrice: '250000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setPolkaBridge(pbrLib)
      window.pbrsauce = pbrLib
    }
  }, [ethereum])

  return <Context.Provider value={{ pbr }}>{children}</Context.Provider>
}

export default PolkaBridgeProvider

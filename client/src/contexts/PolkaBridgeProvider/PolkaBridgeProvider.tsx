import React, { createContext, useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import config from '../../config'
import { PolkaBridge } from '../../pbr'
import { bscChainIds } from '../../pbr/lib/constants'
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
  const setupConnection = (ethereum: any) => {
    if (ethereum) {
      // console.log('using ethereum provider')
      const chainId = Number(ethereum.chainId)
      // console.log('current chain Id  ', chainId)
      //use infura provider for eth contract and window.ethereum for bsc contract
      if (bscChainIds.includes(chainId)) {
        // console.log('using bsc configurations')
        const ethChainId = config.chainId
        const pbrLib = new PolkaBridge(
          config.bscRpcMainnet,
          ethChainId,
          false,
          {
            defaultAccount: ethereum.selectedAddress,
            defaultConfirmations: 1,
            autoGasMultiplier: 1.5,
            testing: false,
            isBsc: true,
            infuraProvider: config.bscRpcMainnet,
            defaultGas: '200',
            defaultGasPrice: '250000',
            accounts: [],
            ethereumNodeTimeout: 10000,
          },
        )
        setPolkaBridge(pbrLib)
        window.pbrsauce = pbrLib
      } else {
        // console.log('using ethereum native')
        const pbrLib = new PolkaBridge(ethereum, chainId, false, {
          defaultAccount: ethereum.selectedAddress,
          defaultConfirmations: 1,
          autoGasMultiplier: 1.5,
          testing: false,
          isBsc: false,
          infuraProvider: config.ankrEthereumRpc,
          defaultGas: '200',
          defaultGasPrice: '250000',
          accounts: [],
          ethereumNodeTimeout: 10000,
        })
        setPolkaBridge(pbrLib)
        window.pbrsauce = pbrLib
        // console.log('using polkabridge lib ', pbrLib)
      }
    } else {
      // console.log('using non ethereum provider ')
      const chainId = config.chainId
      const pbrLib = new PolkaBridge(config.ankrEthereumRpc, chainId, false, {
        defaultAccount: '0x0000000000000000000000000000000000000000',
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        isBsc: false,
        infuraProvider: config.ankrEthereumRpc,
        defaultGas: '200',
        defaultGasPrice: '250000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setPolkaBridge(pbrLib)
      window.pbrsauce = pbrLib
    }
  }
  useEffect(() => {
    if (!ethereum) {
      return
    }
    setupConnection(ethereum)
  }, [ethereum])
  return <Context.Provider value={{ pbr }}>{children}</Context.Provider>
}
export default PolkaBridgeProvider

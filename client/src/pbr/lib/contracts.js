import BigNumber from 'bignumber.js/bignumber'
import ERC20Abi from './abi/erc20.json'
import MasterChefAbi from './abi/masterchef.json'
import PolkaBridgeAbi from './abi/pbr.json'
import LaunchpadAbi from './abi/masterLaunchpad.json'
import LaunchpadHarmonyAbi from './abi/launchpadHarmony.json'
import LanchpadBscAbi from './abi/polkabridgeLaunchpadBsc.json'
import WETHAbi from './abi/weth.json'
import {
  bscNetwork,
  contractAddresses,
  harmonyNetwork,
  SUBTRACT_GAS_LIMIT,
  supportedPools,
} from './constants.js'
import * as Types from './types.js'

import Web3 from 'web3'
import { options } from 'numeral'
import config from '../../config'

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3
    

    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.pbr = new this.web3.eth.Contract(PolkaBridgeAbi)
    this.masterLaunchpad = new this.web3.eth.Contract(LaunchpadAbi)
  
    this.web3bsc = new Web3(window.ethereum)
    this.lanchpadBsc = new this.web3bsc.eth.Contract(LanchpadBscAbi)

    this.masterLaunchpadHarmony = new this.web3.eth.Contract(LaunchpadHarmonyAbi)
    
    this.weth = new this.web3.eth.Contract(WETHAbi)

    this.pools = supportedPools.map((pool) => {
      if (pool.network === bscNetwork ) {
        return Object.assign(pool, {
          lpAddress: pool.lpAddresses[networkId],
          tokenAddress: pool.tokenAddresses[networkId],
          lpBscAddress: pool.lpBscAddresses[config.bscChain],//set network id for current bsc
          lpBscContract: new this.web3bsc.eth.Contract(LanchpadBscAbi),
          lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        })
      }else if(pool.network === harmonyNetwork){
        return Object.assign(pool, {
          lpAddress: pool.lpAddresses[networkId],
          tokenAddress: pool.tokenAddresses[networkId],
          lpHarmonyAddress: pool.lpBscAddresses[config.bscChain],//set network id for current bsc
          lpHarmonyContract: new this.web3bsc.eth.Contract(LanchpadBscAbi),
          lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        })
      } else{
        return Object.assign(pool, {
          lpAddress: pool.lpAddresses[networkId],
          tokenAddress: pool.tokenAddresses[networkId],
          lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        }) 
      }
    }
      ,
    )

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {

      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    setProvider(this.pbr, contractAddresses.pbr[networkId])
    setProvider(this.masterLaunchpad, contractAddresses.masterLaunchpad[networkId])
    setProvider(this.lanchpadBsc, contractAddresses.launchpadBsc[config.bscChain])//set network id for current bsc
  
    setProvider(this.weth, contractAddresses.weth[networkId])

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress, lpBscContract, lpBscAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
        setProvider(lpBscContract, lpBscAddress)
      },
    )
  }

  setDefaultAccount(account) {
    this.pbr.options.from = account
    this.masterLaunchpad.options.from = account
    this.lanchpadBsc.options.from = account
  }
}

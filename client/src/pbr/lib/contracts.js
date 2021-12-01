import PolkaBridgeAbi from './abi/pbr.json'

import WETHAbi from './abi/weth.json'
import {
  bscNetwork,
  currentConnection,
  harmonyNetwork,
  moonriverNetwork,
  polygonNetwork,
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

    // console.log('current network id in setup', networkId)
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.pbr = new this.web3.eth.Contract(PolkaBridgeAbi)

    this.web3bsc = new Web3(window.ethereum)

    this.weth = new this.web3.eth.Contract(WETHAbi)


    this.pools = supportedPools.map((pool) => {
      if (pool.network === bscNetwork) {

        const _bscChain = currentConnection === 'mainnet' ? config.bscChain : config.bscChainTestent;
        return Object.assign(pool, {
          tokenAddress: pool.tokenAddresses?.[_bscChain],
          lpAddress: pool.lpAddresses?.[_bscChain],
        })

      } else if (pool.network === harmonyNetwork) {

        const _harmonyChain = currentConnection === 'mainnet' ? config.hmyChainMainnet : config.hmyChainTestnet
        return Object.assign(pool, {
          tokenAddress: pool.tokenAddresses?.[_harmonyChain],
          lpAddress: pool.lpAddresses?.[_harmonyChain],
        })

      } else if (pool.network === polygonNetwork) {

        const _polygonChain = currentConnection === 'mainnet' ? config.polygon_chain_mainnet : config.polygon_chain_testnet;
        return Object.assign(pool, {
          tokenAddress: pool.tokenAddresses[_polygonChain],
          lpAddress: pool.lpAddresses[_polygonChain],
        });

      } else if (pool.network === moonriverNetwork) {

        const _chain = currentConnection === 'mainnet' ? config.moonriverChain : config.moonriverChainTestent;
        return Object.assign(pool, {
          tokenAddress: pool.tokenAddresses[_chain],
          lpAddress: pool.lpAddresses[_chain],
        });

      } else {

        const _ethChain = currentConnection === 'mainnet' ? config.chainId : config.chainIdTestnet;
        return Object.assign(pool, {
          tokenAddress: pool.tokenAddresses?.[_ethChain],
          lpAddress: pool.lpAddresses?.[_ethChain],
        })
      }
    }
      ,
    )

    // this.setProvider(provider, networkId)
    // this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  // setProvider(provider, networkId) {
  //   const setProvider = (contract, address) => {

  //     if (address) contract.options.address = address
  //     else console.error('Contract address not found in network', networkId)
  //   }

  //   setProvider(this.pbr, contractAddresses.pbr[networkId])
  //   // setProvider(this.masterLaunchpad, contractAddresses.masterLaunchpad[networkId])
  //   // setProvider(this.lanchpadBsc, contractAddresses.launchpadBsc[config.bscChain])//set network id for current bsc
  //   // setProvider(this.masterLaunchpadHarmony, contractAddresses.launchpadHarmony[1666700000])//set network id

  //   setProvider(this.weth, contractAddresses.weth[networkId])

  //   this.pools.forEach(
  //     ({ lpContract, lpAddress, tokenContract, tokenAddress, lpBscContract, lpBscAddress }) => {
  //       setProvider(lpContract, lpAddress)
  //       setProvider(tokenContract, tokenAddress)
  //       setProvider(lpBscContract, lpBscAddress)
  //       // setProvider(lpHarmonyContract, lpHarmonyAddress)
  //     },
  //   )
  // }

  setDefaultAccount(account) {
    this.pbr.options.from = account
    // this.masterLaunchpad.options.from = account
    // this.lanchpadBsc.options.from = account
    // this.masterLaunchpadHarmony.options.from = account
  }
}
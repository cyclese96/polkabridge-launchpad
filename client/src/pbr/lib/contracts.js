// import BigNumber from 'bignumber.js/bignumber'
import ERC20Abi from './abi/erc20.json'
// import MasterChefAbi from './abi/masterchef.json'
import PolkaBridgeAbi from './abi/pbr.json'
import LaunchpadAbi from './abi/masterLaunchpad.json'
// import LaunchpadHarmonyAbi from './abi/launchpadHarmony.json'
import LanchpadBscAbi from './abi/polkabridgeLaunchpadBsc.json'
import WETHAbi from './abi/weth.json'
import {
  bscNetwork,
  contractAddresses,
  currentConnection,
  ethereumNetwork,
  harmonyNetwork,
  // HMY_TESTNET_RPC_URL,
  polygonNetwork,
  SUBTRACT_GAS_LIMIT,
  supportedPools,
} from './constants.js'
import * as Types from './types.js'

import Web3 from 'web3'
import { options } from 'numeral'
import config from '../../config'
import { getContractInstance, getNetworkName } from '../../pbr/utils'

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
    // this.masterLaunchpad = new this.web3.eth.Contract(LaunchpadAbi)

    this.web3bsc = new Web3(window.ethereum)
    // this.lanchpadBsc = new this.web3bsc.eth.Contract(LanchpadBscAbi)

    // this.web3Harmony = new Web3(HMY_TESTNET_RPC_URL)
    // this.masterLaunchpadHarmony = new this.web3Harmony.eth.Contract(LaunchpadHarmonyAbi)

    this.weth = new this.web3.eth.Contract(WETHAbi)

    this.currentNetworkName = getNetworkName(networkId);

    this.pools = supportedPools.map((pool) => {
      if (pool.network === bscNetwork) {

        return Object.assign(pool, {
          // lpAddress: !pool.lpAddresses ? '' : pool.lpAddresses[networkId],
          tokenAddress: !pool.tokenAddresses ? '' : pool.tokenAddresses[networkId],
          lpBscAddress: !pool.lpBscAddresses ? '' : pool.lpBscAddresses[config.bscChain],//set network id for current bsc
          lpBscContract: new this.web3bsc.eth.Contract(LanchpadBscAbi),
          // lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        })
      } else if (pool.network === harmonyNetwork) {

        const _harmonyChain = currentConnection === 'mainnet' ? config.hmyChainMainnet : config.hmyChainTestnet
        const _hmyAddress = !pool.lpHarmonyAddresses ? '' : pool.lpHarmonyAddresses[_harmonyChain]//set network id for current bsc
        const _hmyContract = getContractInstance(LaunchpadAbi, _hmyAddress, harmonyNetwork, this.currentNetworkName)
        console.log('harmonyTest: setting harmony contract', { _harmonyChain, _hmyAddress, _hmyContract, currentNetwork: this.currentNetworkName })

        return Object.assign(pool, {
          // lpAddress: !pool.lpAddresses ? '' : pool.lpAddresses[networkId],
          tokenAddress: !pool.tokenAddresses ? '' : pool.tokenAddresses[networkId],
          lpHarmonyAddress: _hmyAddress,
          lpHarmonyContract: _hmyContract,
          // lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        })

      } else if (pool.network === polygonNetwork) {

        const _polygonChain = currentConnection === 'mainnet' ? config.polygon_chain_mainnet : config.polygon_chain_testnet
        const _polygonAddress = !pool.lpPolygonAddresses ? '' : pool.lpPolygonAddresses[_polygonChain]//set network id
        const _polygonContract = getContractInstance(LaunchpadAbi, _polygonAddress, polygonNetwork)
        console.log('setting polygon contract', { _polygonChain, _polygonAddress, _polygonContract, currNet: this.currentNetworkName })

        return Object.assign(pool, {
          // lpAddress: !pool.lpAddresses ? '' : pool.lpAddresses[networkId],
          tokenAddress: !pool.tokenAddresses ? '' : pool.tokenAddresses[networkId],
          lpPolygonAddress: _polygonAddress,
          lpPolygonContract: _polygonContract,
          // lpContract: new this.web3.eth.Contract(LaunchpadAbi),
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
        })

      } else {
        const _ethChain = currentConnection === 'mainnet' ? config.chainId : config.chainIdTestnet;
        const _lpAddress = !pool.lpAddresses ? "" : pool.lpAddresses[_ethChain]
        const _lpContract = getContractInstance(LaunchpadAbi, _lpAddress, ethereumNetwork, this.currentNetworkName);

        return Object.assign(pool, {
          tokenAddress: !pool.tokenAddresses ? '' : pool.tokenAddresses[networkId],
          tokenContract: new this.web3.eth.Contract(ERC20Abi),
          lpAddress: _lpAddress,
          lpContract: _lpContract,
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
    // setProvider(this.masterLaunchpad, contractAddresses.masterLaunchpad[networkId])
    // setProvider(this.lanchpadBsc, contractAddresses.launchpadBsc[config.bscChain])//set network id for current bsc
    // setProvider(this.masterLaunchpadHarmony, contractAddresses.launchpadHarmony[1666700000])//set network id

    setProvider(this.weth, contractAddresses.weth[networkId])

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress, lpBscContract, lpBscAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
        setProvider(lpBscContract, lpBscAddress)
        // setProvider(lpHarmonyContract, lpHarmonyAddress)
      },
    )
  }

  setDefaultAccount(account) {
    this.pbr.options.from = account
    // this.masterLaunchpad.options.from = account
    // this.lanchpadBsc.options.from = account
    // this.masterLaunchpadHarmony.options.from = account
  }
}
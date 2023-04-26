import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { currentConnection } from 'pbr/lib/constants'
import { configureChains, createClient } from 'wagmi'
import {
  bsc,
  mainnet,
  polygon,
  harmonyOne,
  moonriver,
  arbitrum,
  bscTestnet,
  goerli,
  polygonMumbai,
  arbitrumGoerli,
} from 'wagmi/chains'

const chains = [
  bsc,
  mainnet,
  polygon,
  harmonyOne,
  moonriver,
  arbitrum,
  bscTestnet,
  goerli,
  arbitrumGoerli,
  polygonMumbai,
]
export const projectId = 'e8e7eeebd9aea37966792fccce279745'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains)

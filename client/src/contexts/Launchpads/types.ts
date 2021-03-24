import { Contract } from 'web3-eth-contract'

export interface Launchpad {
  pid: number
  name: string
  symbol: string
  lpAddress: string
  lpContract: Contract
  lpExplorer: string
  tokenAddress: string
  tokenContract: Contract
  tokenExplorer: string
  tokenSymbol: string
  icon: string
  description: string
  introduce: string
  website: string
  twitter: string
  telegram: string
  whitepaper: string
  id: string
  total: string
  ratio: string
  access: string,
  startAt: number
}

export interface LaunchpadsContext {
  launchpads: Launchpad[]
  unharvested: number
}

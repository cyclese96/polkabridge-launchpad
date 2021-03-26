import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import config from '../config'
import axios from 'axios'
import { getHistory } from '../pbr/utils'
import { Contract } from 'web3-eth-contract';
// import debounce from 'debounce'

interface JoinHistory {
    amount: number,
    symbol: string,
    status: string,
    joinDate: string
  }

const useHistory = (account: string) : JoinHistory[] => {
  const [history, setHistory] = useState([] as JoinHistory[])
  const getData = useCallback(async () => {
    setHistory(await getHistory(account))
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return history
}

export default useHistory

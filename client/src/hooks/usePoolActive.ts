import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import config from '../config'
import axios from 'axios'
import { checkPoolActive } from '../pbr/utils'
import { Contract } from 'web3-eth-contract';
// import debounce from 'debounce'

const usePoolActive = (startAt: number) => {
  const [active, setActive] = useState(false)
  const getData = useCallback(async () => {
    setActive(await checkPoolActive(startAt))
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return active
}

export default usePoolActive

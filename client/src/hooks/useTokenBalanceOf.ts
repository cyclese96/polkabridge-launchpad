import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

const useTokenBalanceOf = (tokenAddress: string, account: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))

  // const block = useBlock()

  // const fetchBalance = useCallback(async () => {
  //   const balance = await getBalance(ethereum, tokenAddress, account)
  //   setBalance(new BigNumber(balance))
  // }, [account, ethereum, tokenAddress])

  // useEffect(() => {
  //   if (account) {
  //     fetchBalance()
  //   }
  // }, [account, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useTokenBalanceOf

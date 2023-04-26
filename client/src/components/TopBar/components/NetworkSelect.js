import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import config from '../../../config'
import { currentConnection } from '../../../pbr/lib/constants'
import useWallet from '../../../hooks/useWallet'
import { useSwitchNetwork } from 'wagmi'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  imgIcon: {
    marginLeft: 10,
    height: 23,
  },
  buttonDrop: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'grey',
      color: '#100525',
    },
  },
  main: {
    color: 'white',
    backgroundColor: '#100525',
    border: '1px solid white',
    borderRadius: 60,
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    marginTop: 8,
  },
}))
export default function NetworkSelect({}) {
  const classes = useStyles()

  const { account, chainId } = useWallet()
  const { chains, switchNetwork } = useSwitchNetwork()
  const [selectedChain, setSelectedChain] = useState(1)

  const handleChainSelection = useCallback(
    async (targetChain) => {
      try {
        switchNetwork(targetChain)
      } catch (error) {
        setSelectedChain(targetChain)
        console.log('chain switch error ', error)
      }
    },
    [switchNetwork],
  )

  useEffect(() => {
    if (!chainId) {
      return
    }

    setSelectedChain(chainId)
  }, [chainId])

  return (
    <div>
      <FormControl variant="standard" className={classes.root}>
        <Select
          className={classes.main}
          value={selectedChain}
          onChange={({ target: { value } }) => handleChainSelection(value)}
          disableUnderline
        >
          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.chainIdTestnet
                : config.chainId
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Ethereum</span>
            <img className={classes.imgIcon} src="/img/tokens/eth.png" />
          </MenuItem>

          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.arbitrumGoerliChain
                : config.arbitrumChain
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Arbitrum One</span>
            <img
              className={classes.imgIcon}
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png"
            />
          </MenuItem>
          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.bscChainTestent
                : config.bscChain
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Binance Smart Chain</span>
            <img className={classes.imgIcon} src="/img/tokens/bnb.png" />
          </MenuItem>
          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.polygon_chain_testnet
                : config.polygon_chain_mainnet
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Polygon</span>
            <img className={classes.imgIcon} src="/img/tokens/polygon.png" />
          </MenuItem>
          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.hmyChainTestnet
                : config.hmyChainMainnet
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Harmony</span>
            <img className={classes.imgIcon} src="/img/tokens/one.png" />
          </MenuItem>
          <MenuItem
            value={
              currentConnection === 'testnet'
                ? config.moonriverChainTestent
                : config.moonriverChain
            }
            className={classes.buttonDrop}
          >
            <span style={{ paddingLeft: 7 }}>Moonriver</span>
            <img className={classes.imgIcon} src="/img/moon.png" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

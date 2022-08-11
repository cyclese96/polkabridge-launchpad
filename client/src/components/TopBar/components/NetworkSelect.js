import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  astarNetworkDetail,
  bscNetworkDetail,
  ethereumNetworkDetail,
  harmonyNetworkDetail,
  moonriverNetworkDetail,
  polygonNetworkDetail,
} from '../../../pbr/networkConstants'
import { setupNetwork } from '../../../pbr/utils'
import config from '../../../config'
import { currentConnection } from '../../../pbr/lib/constants'
import useNetwork from '../../../hooks/useNetwork'
import { useWallet } from '@binance-chain/bsc-use-wallet'
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

  const { chainId, status } = useNetwork()
  const { account } = useWallet()

  useEffect(() => {
    // console.log('selected chain id', selectedNetwork)
    if (!account) {
      return
    }
    if (status === 'connected') {
      handleChange(chainId)
    }
  }, [chainId, status])

  const handleChange = (_selected) => {
    if ([config.bscChain, config.bscChainTestent].includes(_selected)) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? bscNetworkDetail.mainnet
          : bscNetworkDetail.testnet,
      )
    } else if (
      [config.polygon_chain_mainnet, config.polygon_chain_testnet].includes(
        _selected,
      )
    ) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? polygonNetworkDetail.mainnet
          : polygonNetworkDetail.testnet,
      )
    } else if (
      [config.hmyChainMainnet, config.hmyChainTestnet].includes(_selected)
    ) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? harmonyNetworkDetail.mainnet
          : harmonyNetworkDetail.testnet,
      )
    } else if (
      [config.moonriverChain, config.moonriverChainTestent].includes(_selected)
    ) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? moonriverNetworkDetail.mainnet
          : moonriverNetworkDetail.testnet,
      )
    } else if ([config.astarChain].includes(_selected)) {
      setupNetwork(astarNetworkDetail.mainnet)
    } else {
      setupNetwork(
        currentConnection === 'mainnet'
          ? ethereumNetworkDetail.mainnet
          : ethereumNetworkDetail.testnet,
      )
    }
  }
  return (
    <div>
      <FormControl variant="standard" className={classes.root}>
        <Select
          className={classes.main}
          value={chainId}
          onChange={({ target: { value } }) => handleChange(value)}
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

          <MenuItem value={config.astarChain} className={classes.buttonDrop}>
            <span style={{ paddingLeft: 7 }}>Astar</span>
            <img className={classes.imgIcon} src="/img/astar.png" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  bscNetworkDetail,
  ethereumNetworkDetail,
  harmonyNetworkDetail,
  polygonNetworkDetail,
} from '../../../pbr/networkConstants'
import { setupNetwork } from '../../../pbr/utils'
import config from '../../../config'
import { currentConnection } from '../../../pbr/lib/constants'
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
      color: '#100525'
    },
  },
  main: {
    color: 'white',
    backgroundColor: '#100525',
    border: '1px solid white',
    borderRadius: 60,
    paddingLeft: 10,
  },
}))
export default function NetworkSelect({ selectedNetwork }) {
  const classes = useStyles()
  const [network, setNetwork] = React.useState(
    parseInt(localStorage.getItem('currentNetwork') || config.chainId),
  )
  useEffect(() => {
    console.log('selected chain id', selectedNetwork)
    if (!localStorage.getItem('currentNetwork')) {
      // setupNetwork(ethereumNetworkDetail.mainnet)
      localStorage.currentNetwork = selectedNetwork
    }
    handleChange(selectedNetwork)
  }, [selectedNetwork])

  const handleChange = (_selected) => {
    console.log('selected network', selectedNetwork)
    if (network === _selected) {
      return
    }
    localStorage.setItem('currentNetwork', _selected)
    setNetwork(_selected)
    if ([config.bscChain, config.bscChainTestent].includes(_selected)) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? bscNetworkDetail.mainnet
          : bscNetworkDetail.testnet,
      )
    } else if ([config.polygon_chain_mainnet, config.polygon_chain_testnet].includes(_selected)) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? polygonNetworkDetail.mainnet
          : polygonNetworkDetail.testnet,
      )
    } else if ([config.hmyChainMainnet, config.hmyChainTestnet].includes(_selected)) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? harmonyNetworkDetail.mainnet
          : harmonyNetworkDetail.testnet,
      )
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
      <FormControl className={classes.root} >
        <Select
          className={classes.main}
          value={network}
          onChange={({ target: { value } }) => handleChange(value)}
        >
          <MenuItem
            value={currentConnection === 'testnet' ? config.chainIdTestnet : config.chainId}
            className={classes.buttonDrop}
          >
            <span>Ethereum</span>
            <img className={classes.imgIcon} src="/img/tokens/eth.png" />
          </MenuItem>
          <MenuItem value={currentConnection === 'testnet' ? config.bscChainTestent : config.bscChain} className={classes.buttonDrop}>
            <span>Binance Smart Chain</span>
            <img className={classes.imgIcon} src="/img/tokens/bnb.png" />
          </MenuItem>
          <MenuItem value={currentConnection === 'testnet' ? config.polygon_chain_testnet : config.polygon_chain_mainnet} className={classes.buttonDrop}>
            <span>Polygon</span>
            <img className={classes.imgIcon} src="/img/tokens/polygon.png" />
          </MenuItem>
          <MenuItem value={currentConnection === 'testnet' ? config.hmyChainTestnet : config.hmyChainMainnet} className={classes.buttonDrop}>
            <span>Harmony</span>
            <img className={classes.imgIcon} src="/img/tokens/one.png" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
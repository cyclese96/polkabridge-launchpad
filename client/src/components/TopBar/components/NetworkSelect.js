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
export default function NetworkSelect() {
  const classes = useStyles()
  const [network, setNetwork] = React.useState(
    parseInt(localStorage.getItem('currentNetwork') || config.chainId),
  )
  useEffect(() => {
    console.log()
    if (!localStorage.getItem('currentNetwork')) {
      setupNetwork(ethereumNetworkDetail.mainnet)
      localStorage.currentNetwork = 1
    }
  }, [])
  const handleChange = (_selected) => {
    if (network === _selected) {
      return
    }
    localStorage.setItem('currentNetwork', _selected)
    setNetwork(_selected)
    if (_selected === 56) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? bscNetworkDetail.mainnet
          : bscNetworkDetail.testnet,
      )
    } else if (_selected === 137) {
      setupNetwork(
        currentConnection === 'mainnet'
          ? polygonNetworkDetail.mainnet
          : polygonNetworkDetail.testnet,
      )
    } else if (_selected === 1666600000) {
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
            value={1}
            className={classes.buttonDrop}
          >
            <span>Ethereum</span>
            <img className={classes.imgIcon} src="/img/tokens/eth.png" />
          </MenuItem>
          <MenuItem value={56} className={classes.buttonDrop}>
            <span>Binance Smart Chain</span>
            <img className={classes.imgIcon} src="/img/tokens/bnb.png" />
          </MenuItem>
          <MenuItem value={137} className={classes.buttonDrop}>
            <span>Polygon</span>
            <img className={classes.imgIcon} src="/img/tokens/polygon.png" />
          </MenuItem>
          <MenuItem value={1666600000} className={classes.buttonDrop}>
            <span>Harmony</span>
            <img className={classes.imgIcon} src="/img/tokens/one.png" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import { START_REWARD_AT_BLOCK } from '../../pbr/lib/constants'
import LaunchpadCards from '../Launchpads/components/LaunchpadCards'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Button } from '@material-ui/core'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useNetwork from '../../hooks/useNetwork'

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 300,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(41, 42, 66, 0.3)',
    border: '1px solid #212121',
    filter: 'drop-shadow(0 0 0.5rem #212121)',
    [theme.breakpoints.down('sm')]: {
      minWidth: 240,
      width: '100%',
    },
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    border: '1px solid #f9f9f9',
    padding: 12,
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
  },

  background: {
    paddingTop: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  divider: {
    width: 130,
    height: 3,
    background: 'linear-gradient(to right, #e0077d, rgba(0, 0, 0, 0.4))',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 15,
    },
  },
  actionButton: {
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    color: 'white',
    width: 'fit-content',
    height: 40,
    textTransform: 'none',
    borderRadius: 30,
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 20px 5px 20px',
    '&:hover': {
      background: 'rgba(224, 7, 125, 0.7)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      fontSize: 13,
    },
  },

  headStyle: {
    width: 950,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  earn: {
    textAlign: 'center',
    color: '#f9f9f9',
    fontSize: 12,
  },
  title: {
    color: '#e5e5e5',
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'left',
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    },
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()

  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  const { account, connect, status } = useWallet()
  useEffect(() => {
    if (
      localStorage.useWalletConnectStatus === 'connected' &&
      localStorage.useWalletConnectType
    ) {
      connect(localStorage.useWalletConnectType)
    }
  }, [])

  const { chainId, status: any } = useNetwork()

  useEffect(() => {
    console.log('TopBar:  network id', chainId)
    console.log('TopBar: status', status)
    if (status === 'network changing') {
      var result = window.confirm('Do you want reload the page ?')
      if (result) {
        window.location.reload()
      } else {
        console.log('closed')
      }
    }
  }, [chainId])

  return (
    <Page>
      <div className="container ">
        <div className={classes.background}>
          <div className={classes.headStyle}>
            <div>
              <h1 className={classes.title}>Launchpad</h1>
              <div className={classes.divider} />
            </div>
            <div className="d-flex justify-content-end">
              <a
                style={{
                  textDecoration: 'none',
                  marginRight: 10,
                  paddingTop: 30,
                }}
                target="_blank"
                href="https://polkabridge.medium.com/polkabridge-launchpad-tutorial-50e8e80905d4"
              >
                <Button className={classes.actionButton} variant="contained">
                  How to join Launchpad
                </Button>
                <div></div>
              </a>
              <a
                style={{ textDecoration: 'none', paddingTop: 30 }}
                target="_blank"
                href="https://docs.google.com/forms/d/1ceBZIL8xDNBJWYzZ4j11lhU9MMke8usrNgnPEoSIMf0/edit"
              >
                <div className={classes.actionButton}>Apply for IDO</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Box className="mt-3">
        <LaunchpadCards />
      </Box>
    </Page>
  )
}

const Box = styled.div`
  &.mt-4 {
    margin-top: 40px;
    @media (max-width: 767px) {
      margin-top: 30px;
    }
  }
`
const SpacerRes = styled.div`
  .sc-iCoHVE {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .d-lg-none {
    @media (min-width: 1025px) {
      display: none;
    }
  }
`
export default Home

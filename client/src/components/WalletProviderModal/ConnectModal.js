import React, { useEffect, useMemo } from 'react'

import { useSelector } from 'react-redux'

import { useConnect } from 'wagmi'
import { Web3Button, useWeb3Modal } from '@web3modal/react'
import useWallet from '../../hooks/useWallet'
import {
  Box,
  CircularProgress,
  Dialog,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { isMetaMaskInstalled } from '../../pbr/utils'

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    display: 'grid',
    placeItems: 'center',
    background: 'rgba(0,0,0,0.2)',
  },
  container: {
    width: 500,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: 788,
    position: 'relative',
    background:
      theme.palette.mode === 'light'
        ? 'linear-gradient(180deg, #FFFFFF 0%, #D9E8FC 100%)'
        : theme.palette.background.primary,
    border: '10px solid #6A55EA',
    padding: 8,
    borderRadius: 4,
    zIndex: 11,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '95%',
    },
  },

  heading: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 22,
    paddingRight: 20,
    letterSpacing: '0.01em',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
      paddingRight: 10,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      paddingRight: 10,
    },
  },

  card: {
    padding: 25,
    color:
      theme.palette.mode === 'light' ? theme.palette.text.primary : '#212121',
    border: '1px solid #919191',
    width: 300,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 20,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      height: 80,
      fontSize: 14,
    },
  },
  navbarButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '7px 18px 7px 18px',
    border: 'none',
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: 'none',
    fontSize: 14,
    '&:hover': {
      background: theme.palette.primary.hover,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginRight: 0,
      marginLeft: 15,
      width: 'fit-content',
    },
  },
}))

const ConnectModal = ({
  popupActive,
  resetPopup,
  handleSwitchNetwork,
  loading,
}) => {
  const authLoading = useSelector((state) => state?.user?.authLoading)

  //   const { verifyUserWallet } = useUserAuthentication(initHooks);
  const { isActive, chainId } = useWallet()
  const { isOpen } = useWeb3Modal()
  const { connectors, connectAsync, error, isLoading, pendingConnector } =
    useConnect()

  const handleClose = () => {
    resetPopup()
  }

  useEffect(() => {
    console.log('web3modal test ', { isOpen })
    if (isOpen) {
      resetPopup()
    }
  }, [isOpen, resetPopup])
  const userSelectedChain = useSelector((state) => state?.user?.chainId)

  const isDappSupported = useMemo(() => {
    return true
    // if (!chainId) {
    //   return false
    // }

    // if (userSelectedChain !== chainId) {
    //   return false
    // }

    // const support = DAPP_SUPPORTED_ON_CHAINS.includes(chainId)
    // return support
  }, [chainId, userSelectedChain])

  const isNetworkSwitchRequired = useMemo(() => {
    if (isActive && !isDappSupported && !authLoading) {
      return true
    }

    return false
  }, [isActive, isDappSupported, authLoading])

  //   const isSignatureRequesting = useMemo(
  //     () => authenticationState === AUTHENTICATION_STATE.SIGNATURE_REQUESTING,
  //     [authenticationState],
  //   )

  const classes = useStyles()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={popupActive}
      // maxWidth="md"
    >
      <Box
        border="10px solid #D1FF1A"
        px={!sm ? '2vw' : '5%'}
        py={!sm ? '5vh' : '10%'}
        className={classes.popup}
      >
        <Box style={{ position: 'absolute', right: '15px', top: '15px' }}>
          <Close
            style={{ color: theme.palette.text.primary, cursor: 'pointer' }}
            onClick={handleClose}
          />
        </Box>

        <div className={classes.background}>
          <div className={classes.container}>
            <div className="d-flex justify-content-end">
              <Close
                style={{ color: theme.palette.text.primary, fontSize: 28 }}
                onClick={resetPopup}
              />
            </div>
            <div
              className=""
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline',
              }}
            >
              <Box className={classes.heading}>
                {!isActive && 'Connect Wallet'}

                {isActive && isNetworkSwitchRequired && 'Switch Network'}
              </Box>
            </div>

            {isNetworkSwitchRequired && (
              <Box
                mt={3}
                mb={5}
                display={'flex'}
                flexDirection="column"
                alignItems="center"
              >
                <button
                  className={classes.navbarButton}
                  onClick={handleSwitchNetwork}
                  disabled={loading}
                >
                  {loading ? 'Switching...' : 'Switch Network'}
                </button>
              </Box>
            )}

            {!isActive && (
              <Box
                mt={3}
                display={'flex'}
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  mt={3}
                  display={'flex'}
                  flexDirection="column"
                  alignItems="center"
                >
                  <Box
                    className={classes.card}
                    style={{
                      backgroundColor: '#0abcf9',
                      backgroundImage:
                        'linear-gradient(315deg, #0abcf9 0%, #2c69d1 74%)',
                    }}
                    onClick={() => {
                      isMetaMaskInstalled()
                        ? connectAsync({ connector: connectors?.[1] })
                        : window.open(
                            'https://link.trustwallet.com/open_url?coin_id=637&url=https://p2p.polkabridge.org/',
                            '_blank',
                            'noopener,noreferrer',
                          )
                    }}
                  >
                    <img
                      src="images/trustWallet.png"
                      alt="trustWallet"
                      height="30px"
                      style={{ marginRight: 10 }}
                    />
                    TrustWallet
                  </Box>
                  {connectors.map((connector) => (
                    <>
                      {connector.id === 'walletConnectLegacy' && (
                        <Box
                          className={classes.card}
                          style={{
                            backgroundColor: '#0abcf9',
                            backgroundImage:
                              'linear-gradient(315deg, #0abcf9 0%, #2c69d1 74%)',
                          }}
                          // onClick={() => handleClose()}
                        >
                          <Web3Button />
                        </Box>
                      )}
                      {connector.id === 'injected' && (
                        <Box
                          className={classes.card}
                          style={{
                            backgroundColor: '#f39f86',
                            backgroundImage:
                              'linear-gradient(315deg, #f39f86 0%, #f9d976 74%)',
                          }}
                          onClick={() => {
                            isMetaMaskInstalled()
                              ? connectAsync({ connector: connector })
                              : window.open(
                                  'https://metamask.app.link/dapp/p2p.polkabridge.org/',
                                  '_blank',
                                  'noopener,noreferrer',
                                )
                          }}
                        >
                          {isLoading &&
                          connector?.id === pendingConnector?.id ? (
                            <>
                              <CircularProgress
                                size={16}
                                thickness={7}
                                color="warning"
                                style={{ marginRight: 5 }}
                              ></CircularProgress>
                              Connecting
                            </>
                          ) : (
                            <>
                              <img
                                src="images/metamask.png"
                                alt="metamask"
                                height="30px"
                                style={{ marginRight: 10 }}
                              />
                              Metamask
                            </>
                          )}
                        </Box>
                      )}
                    </>
                  ))}

                  {error && <div>{error.message}</div>}
                </Box>
              </Box>
            )}
          </div>
        </div>
      </Box>
    </Dialog>
  )
}

export default ConnectModal

import React, { useEffect } from 'react'
import styled from 'styled-components'
import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/walletConnect.svg'

import Button from '../Button'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import useWallet from '../../hooks/useWallet'
import { useConnect } from 'wagmi'
import { Web3Button, useWeb3Modal } from '@web3modal/react'
import { isMetaMaskInstalled } from '../../pbr/utils'
import { Box, Dialog, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import CardTitle from 'components/CardTitle/CardTitle'
import MaterialButton from 'components/Button/MaterialButton'

const useStyles = makeStyles((theme) => ({
  container: {
    width: 360,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: 300,
    position: 'relative',
    padding: 8,
    borderRadius: 4,
    zIndex: 11,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '95%',
    },
  },
}))

const WalletProviderModal = ({ resetPopup, popupActive }) => {
  const { account, chainId, isActive } = useWallet()
  const { connectors, connectAsync, error, isLoading, pendingConnector } =
    useConnect()
  const { isOpen } = useWeb3Modal()

  const handleClose = () => {
    resetPopup()
  }

  const classes = useStyles()

  useEffect(() => {
    if (isOpen) {
      resetPopup()
    }
  }, [isOpen, resetPopup])

  useEffect(() => {
    resetPopup()
  }, [isActive])

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={popupActive}
    >
      <ModalWrapper>
        <div className={classes.container}>
          <Box style={{ position: 'absolute', right: '15px', top: '15px' }}>
            <Close
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={handleClose}
            />
          </Box>
          <ModalTitle text="Select a wallet provider." />

          <ModalContent>
            {/* <StyledWalletsWrapper> */}
            {connectors?.map((connector) => (
              <>
                {connector.id === 'walletConnectLegacy' && (
                  <StyledWalletCard>
                    <div onClick={() => connectAsync({ connector: connector })}>
                      <div
                        style={{
                          backgroundColor: '#0abcf9',
                          borderRadius: 10,
                          backgroundImage:
                            'linear-gradient(315deg, #0abcf9 0%, #2c69d1 74%)',
                        }}
                        className="d-flex justify-content-between align-items-center p-2"
                      >
                        {' '}
                        <Web3Button label="Wallet Connect" icon={false} />
                        <img
                          src={walletConnectLogo}
                          style={{ height: 26 }}
                        />{' '}
                      </div>
                    </div>
                  </StyledWalletCard>
                )}
                {connector.id === 'injected' && (
                  <StyledWalletCard>
                    <div
                      onClick={() => {
                        isMetaMaskInstalled()
                          ? connectAsync({ connector: connector })
                          : window.open(
                              'https://metamask.app.link/dapp/p2p.polkabridge.org/',
                              '_blank',
                              'noopener,noreferrer',
                            )
                      }}
                      className="d-flex justify-content-between align-items-center p-2"
                      style={{
                        backgroundColor: '#f39f86',
                        backgroundImage:
                          'linear-gradient(315deg, #f39f86 0%, #f9d976 74%)',
                        cursor: 'pointer',
                        borderRadius: 10,
                        height: 50,
                      }}
                    >
                      <CardTitle text={'Metamask'} />
                      <img src={metamaskLogo} style={{ width: 32 }} />
                    </div>
                  </StyledWalletCard>
                )}
              </>
            ))}

            {/* 
         
            <StyledWalletCard>
              <div onClick={() => tryConnect('injected')}>
                <WalletCard
                  icon={<img src={trustWalletLogo} style={{ width: 32 }} />}
                  onConnect={() => tryConnect('injected')}
                  title="Trust Wallet"
                />
              </div>
            </StyledWalletCard>
            <StyledWalletCard>
              <div onClick={() => tryConnect('injected')}>
                <WalletCard
                  icon={<img src={coin98Logo} style={{ width: 32 }} />}
                  onConnect={() => tryConnect('injected')}
                  title="Coin98 Wallet"
                />
              </div>
            </StyledWalletCard> */}
            {/* </StyledWalletsWrapper> */}
          </ModalContent>

          <ModalActions>
            <MaterialButton variant="secondary" onClick={handleClose}>
              Cancel
            </MaterialButton>
          </ModalActions>
        </div>
      </ModalWrapper>
    </Dialog>
  )
}

const StyledWalletsWrapper = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  margin-top: 20px;
`

const ModalWrapper = styled.div`
  background-color: #292a42;
  padding: 10px;
`

export default WalletProviderModal

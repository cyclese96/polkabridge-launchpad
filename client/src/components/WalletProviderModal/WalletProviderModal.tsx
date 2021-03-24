import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'
import coin98Logo from '../../assets/img/coin98.png'
import trustWalletLogo from '../../assets/img/trustwallet.png'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
      if (localStorage.useWalletConnectType && localStorage.useWalletConnectType === 'injected') {
        localStorage.useWalletConnectStatus = 'connected'
      }
    }
  }, [account, onDismiss])

  function tryConnect(type: any) {
    if (type == 'injected') {
      localStorage.useWalletConnectType = type
      localStorage.useWalletConnectStatus = 'pending'
    }
    connect(type)
  }

  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ width: 32 }} />}
              onConnect={() => tryConnect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ width: 32 }} />}
              onConnect={() => tryConnect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>

          {/* <Spacer size="sm" /> */}
          <StyledWalletCard>
            <WalletCard
              icon={<img src={trustWalletLogo} style={{ width: 32 }} />}
              onConnect={() => tryConnect('injected')}
              title="Trust Wallet"
            />
          </StyledWalletCard>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={coin98Logo} style={{ width: 32 }} />}
              onConnect={() => tryConnect('injected')}
              title="Coin98 Wallet"
            />
          </StyledWalletCard>
          
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
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
`

export default WalletProviderModal

import React, { useEffect } from 'react'
import styled from 'styled-components'
// import { useWallet } from 'use-wallet'
import { useWallet } from '@binance-chain/bsc-use-wallet'

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
import useNetwork from '../../hooks/useNetwork'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect, status, error } = useWallet()
  const { chainId } = useNetwork()

  const test = useWallet()
  useEffect(() => {
    console.log('useWallet', test)
  }, [test])
  useEffect(() => {
    if (account) {
      onDismiss()
      if (
        localStorage.useWalletConnectType &&
        localStorage.useWalletConnectType === 'injected'
      ) {
        localStorage.useWalletConnectStatus = 'connected'
      }
    }
  }, [account, onDismiss])

  function tryConnect(type: any) {
    console.log('chain id', chainId)
    console.log('account ', account)
    console.log('status ', { status, error })
    if (type == 'injected') {
      localStorage.useWalletConnectType = type
      localStorage.useWalletConnectStatus = 'pending'
    }
    connect(type)
  }

  return (
    <Modal>
      <ModalWrapper>
        <ModalTitle text="Select a wallet provider." />

        <ModalContent>
          <StyledWalletsWrapper>
            <StyledWalletCard>
              <div
                onClick={() => tryConnect('injected')}
                style={{ cursor: 'pointer' }}
              >
                <WalletCard
                  icon={<img src={metamaskLogo} style={{ width: 32 }} />}
                  onConnect={() => tryConnect('injected')}
                  title="Metamask"
                />
              </div>
            </StyledWalletCard>
            <StyledWalletCard>
              <div onClick={() => tryConnect('walletconnect')}>
                <WalletCard
                  icon={<img src={walletConnectLogo} style={{ width: 32 }} />}
                  onConnect={() => tryConnect('walletconnect')}
                  title="WalletConnect"
                />
              </div>
            </StyledWalletCard>
            {/* <Spacer size="sm" /> */}
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
            </StyledWalletCard>
          </StyledWalletsWrapper>
        </ModalContent>

        <ModalActions>
          <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        </ModalActions>
      </ModalWrapper>
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
  margin-top: 10px;
`

const ModalWrapper = styled.div`
  background-color: #292a42;
  padding: 10px;
  border-radius: 20px;
`

export default WalletProviderModal

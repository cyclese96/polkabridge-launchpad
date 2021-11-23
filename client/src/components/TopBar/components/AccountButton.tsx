import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { isMobile } from 'react-device-detect'

interface AccountButtonProps {
  account: string
  status: boolean
}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account, connect } = useWallet()

  useEffect(() => {
    setTimeout(() => {
      if (
        localStorage.useWalletConnectStatus === 'connected' &&
        localStorage.useWalletConnectType
      ) {
        connect(localStorage.useWalletConnectType)
      }
    }, 500)
  }, [])

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={handleUnlockClick}
          size="sm"
          variant="secondary"
          text="Connect Wallet"
        />
      ) : (
        <BoxWallet>
          <div>{account && account.substr(0, 7)}...</div>
          <Button
            onClick={onPresentAccountModal}
            size="sm"
            variant="secondary"
            text="My Wallet"
          />
        </BoxWallet>
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  margin-top: 8px;
`

const BoxWallet = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  div {
    background: rgba(41, 42, 66, 1);
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    position: relative;
    &:before {
      position: absolute;
      content: '';
      background: rgba(41, 42, 66, 1);
      height: 100%;
      width: 50%;
      z-index: -1;
      right: -25%;
    }
  }
`

export default AccountButton

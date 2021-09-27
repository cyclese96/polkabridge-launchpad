import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'

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

  const { connect } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!props.account ? (
        <Button
          onClick={handleUnlockClick}
          size="sm"
          variant="secondary"
          text="Connect Wallet"
        />
      ) : (
        <BoxWallet>
          <div>{props.account && props.account.substr(0, 7)}...</div>
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

const StyledAccountButton = styled.div``

const BoxWallet = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  div {
    background: rgba(41, 42, 66, 1);
    padding: 0 16px;
    display: flex;
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

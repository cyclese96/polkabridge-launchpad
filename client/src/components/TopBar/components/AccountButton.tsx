import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import MaterialButton from '../../Button/MaterialButton'
import WalletProviderModal from '../../WalletProviderModal/WalletProviderModal'
import { isMobile } from 'react-device-detect'
import { useAccount } from 'wagmi'
import useWallet from '../../../hooks/useWallet'
import AccountModal from './AccountModal'
import { useMediaQuery, useTheme } from '@material-ui/core'

interface AccountButtonProps {
  account: string
  status: boolean
}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [connectModal, setConnectModal] = useState(false)
  const [accountModal, setAccountModal] = useState(false)
  const { isActive } = useWallet()
  // const [onPresentAccountModal] = useModal(<AccountModal />)
  // const [onPresentWalletProviderModal] = useModal(
  //   <WalletProviderModal />,
  //   'provider',
  // )
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const { address: account } = useAccount()

  const handleUnlockClick = useCallback(() => {
    if (!isActive) {
      setConnectModal(true)
    } else {
      setAccountModal(true)
    }
  }, [setConnectModal, isActive])

  return (
    <StyledAccountButton>
      <WalletProviderModal
        popupActive={connectModal}
        resetPopup={() => setConnectModal(false)}
      />
      <AccountModal
        popupActive={accountModal}
        resetPopup={() => setAccountModal(false)}
      />
      {!account ? (
        <MaterialButton
          onClick={handleUnlockClick}
          // size="sm"
          // variant="secondary"
        >
          Connect Wallet
        </MaterialButton>
      ) : (
        <BoxWallet>
          <div>{account && account.substr(0, sm ? 4 : 7)}...</div>
          <MaterialButton
            onClick={handleUnlockClick}
            // size="sm"
            // variant="secondary"
          >
            My Wallet
          </MaterialButton>
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

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { formatCurrency, getNetworkName } from '../../../pbr/utils'
import MaterialButton from '../../Button/MaterialButton'

import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'

import IconView from '../../../assets/img/icon-view.svg'

import {
  astarNetwork,
  bscNetwork,
  ethereumNetwork,
  harmonyNetwork,
  moonriverNetwork,
  polygonNetwork,
} from '../../../pbr/lib/constants'
import useWallet from '../../../hooks/useWallet'
import { useBalance, useDisconnect } from 'wagmi'
import { Dialog } from '@material-ui/core'
import { useWeb3Modal } from '@web3modal/react'
import useEthBalance from '../../../hooks/useEthBalance'

const AccountModal = ({ resetPopup, popupActive }) => {
  const { account, chainId } = useWallet()
  const { disconnect } = useDisconnect()
  const { isOpen } = useWeb3Modal()
  const handleClose = () => {
    resetPopup()
  }

  useEffect(() => {
    if (isOpen) {
      resetPopup()
    }
  }, [isOpen, resetPopup])

  const handleSignOutClick = useCallback(() => {
    disconnect()
    localStorage.useWalletConnectStatus = 'disconnected'
    localStorage.useWalletConnectType = ''
    localStorage.removeItem('walletconnect')
    resetPopup()
  }, [resetPopup, disconnect])

  // const { data } = useBalance({
  //   address: account,
  //   chainId: chainId,
  //   formatUnits: 'ether',
  // })
  // // native token balance
  // const balance = useMemo(() => data?.formatted, [data])
  const balance = useEthBalance()

  const getTokenSymbol = () => {
    if (getNetworkName(chainId) === bscNetwork) {
      return 'BNB'
    } else if (getNetworkName(chainId) === polygonNetwork) {
      return 'MATIC'
    } else if (getNetworkName(chainId) === harmonyNetwork) {
      return 'ONE'
    } else if (getNetworkName(chainId) === moonriverNetwork) {
      return 'MOVR'
    } else if (getNetworkName(chainId) === astarNetwork) {
      return 'ASTAR'
    } else {
      return 'ETH'
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={popupActive}
    >
      <ModalLarge>
        <div
          style={{
            backgroundColor: 'rgba(41, 42, 66, 1)',
          }}
        >
          <ModalContent>
            <Box>
              <Heading3>My Wallet</Heading3>
              <BoxList>
                <Row>
                  <Col className="col-12">
                    <BoxItem>
                      <TextMin>Address</TextMin>
                      <TextMedium>
                        <a
                          style={{ color: '#ffffff', textDecoration: 'none' }}
                          target="__blank"
                          href={`https://etherscan.io/address/${account}`}
                        >
                          {account}
                        </a>
                      </TextMedium>
                    </BoxItem>
                    <BoxItem>
                      <Row>
                        <Col className="col-12">
                          <TextMin>
                            Balance <img src={IconView} alt="View" />
                          </TextMin>
                          <TextMedium>
                            <strong>{formatCurrency(balance)}</strong>
                            <span>{getTokenSymbol()}</span>
                          </TextMedium>
                        </Col>
                      </Row>
                    </BoxItem>
                  </Col>
                </Row>
              </BoxList>
            </Box>
          </ModalContent>
          <ModalActions>
            <Row>
              <Col className="col-6 align-center">
                <MaterialButton variant="secondary" onClick={resetPopup}>
                  Close
                </MaterialButton>
              </Col>
              <Col className="col-6 align-center">
                <MaterialButton onClick={handleSignOutClick}>
                  Sign out
                </MaterialButton>
              </Col>
            </Row>
          </ModalActions>
        </div>
        {/* </Modal> */}
      </ModalLarge>
    </Dialog>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;

  margin-left: -15px;
  margin-right: -15px;
  &.align-center {
    align-items: center;
  }
`

const Col = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  &.text-green {
    color: #00e8b5;
    font-weight: 600;
  }
  &.align-center {
    display: flex;
    align-items: center;
  }
  &.justify-right {
    display: flex;
    justify-content: flex-end;
  }
  &.text-right {
    text-align: right;
  }
  &.text-center {
    text-align: center;
  }
  &.col-12 {
    width: 100%;
  }
  &.col-11 {
    width: 91.6%;
  }
  &.col-10 {
    width: 83.3%;
  }
  &.col-9 {
    width: 75%;
  }
  &.col-8 {
    width: 66.6%;
  }
  &.col-8 {
    width: 66.6%;
  }
  &.col-7 {
    width: 58.3%;
  }
  &.col-6 {
    width: 50%;
  }
  &.col-5 {
    width: 41.6%;
  }
  &.col-4 {
    width: 33.3%;
  }
  &.col-3 {
    width: 25%;
  }
  &.col-2 {
    width: 16.6%;
  }
`

const Heading3 = styled.div`
  background: #e5e5e5;
  font-size: 16px;
  font-weight: 800;
  color: #e0077d;
  padding: 12px 20px;
  // border-radius: 16px 16px 0 0;
`

const Box = styled.div`
  background: rgba(41, 42, 66, 1);
  // border-radius: 16px;
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  &.mt-3 {
    margin-top: 20px;
  }
`

const BoxList = styled.div`
  padding: 20px;
  &.scr-auto {
    height: 175px;
    overflow: auto;
  }
  img {
    max-width: 100%;
  }
`

const BoxItem = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0px;
  }
`

const RowHighLight = styled(Row)`
  margin-bottom: 20px;
  transition: 0.3s all;
  &:last-child {
    margin-bottom: 0px;
  }

  &:hover {
    background: rgba(256, 256, 256, 0.1);
  }
`

const TextMin = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #7a7f7f;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  img {
    margin-left: 5px;
  }
`

const TextMin2 = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #7a7f7f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TextMedium = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  word-break: break-word;
  strong {
    font-size: 20px;
  }
  span {
    font-size: 13px;
    margin-left: 5px;
  }
  .st-link {
    color: #e0077d;
    text-decoration: none;
    font-size: 13px;
    margin-left: 10px;
  }
`

const Image = styled.div`
  width: 50px;
  img {
    max-width: 100%;
  }
`

const BoxFlex = styled.div`
  display: flex;
  align-items: center;
  &.justify-center {
    justify-content: center;
  }
`

const ModalLarge = styled.div`
  .khPbuj {
    max-width: 900px;
  }
`

export default AccountModal

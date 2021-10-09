import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Spacer from '../Spacer'
import Cup from '../../assets/img/Cup.svg'
import Modal, { ModalProps } from '../Modal/Modal';
import { Dialog } from '@material-ui/core'

interface SuccessProps extends ModalProps {
  text: string
  amount: string,
  symbol: string
  txhash: string,
  percent: number,
  open: boolean,
  loading: boolean
}
const ModalSuccessHarvest: React.FC<SuccessProps> = ({
  text,
  amount,
  symbol,
  txhash,
  onDismiss,
  percent,
  open,
  loading
}) => {

  return (
    <Dialog style={{ width: '100%' }} open={open} onClose={onDismiss} PaperProps={{
      style: { borderRadius: 25, backgroundColor: "transparent" },
    }} >
      <StyledSuccessWrap>
        <StyledModalSuccess>
          <img height="200px" src={Cup} alt="Confirm Success" />
          <Spacer size="md" />
          <StyleMaxText>Harvest successfully!</StyleMaxText>
          <Spacer size="md" />
          <StyleInfo>
            <StyleLabel>Purchased Amount:</StyleLabel>
            <StyleContent>{amount} {symbol}</StyleContent>
          </StyleInfo>
          <StyleInfo>
            <StyleLabel>Claimed Amount:</StyleLabel>
            <StyleContent>{loading ? '...' : percent} %</StyleContent>
          </StyleInfo>
          {/* <Spacer size="md" />
        <StyleInfo>
            <StyleLabel>Tx hash:</StyleLabel>
            <StyledLink target="_blank" href={'https://etherscan.io/tx/' + txhash}>{txhash}</StyledLink>
        </StyleInfo> */}
        </StyledModalSuccess>
      </StyledSuccessWrap>
      <Spacer size="md" />
      <Button text="Close" variant="secondary" onClick={onDismiss} />

      <Spacer size="md" />
    </Dialog>

  )
}

const StyledSuccessWrap = styled.div`

`

const StyledModalSuccess = styled.div`
  padding: ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  // display: none;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #212121;
  // filter: drop-shadow(0 0 0.5rem #212121);
  min-width: 420px;
  max-height: 90vh;
`
const StyleMaxText = styled.div`
  color: #fff;
  font-size: 24px;
`
const StyleInfo = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyleLabel = styled.div`
  color: ${(props) => props.theme.color.grey[100]};
`
const StyleContent = styled.div`
  color: #fff;
`
const StyledLink = styled.a`
  color: #fff;
  &.other-stake{
    padding: 10px;
    background-color: ${(props) => props.theme.color.primary.main};
    display: block;
    border-radius: 12px;
    text-align: center;
    color: ${(props) => props.theme.color.grey[500]};
    text-decoration: none;
    font-weight: bold;
  }
`

export default ModalSuccessHarvest
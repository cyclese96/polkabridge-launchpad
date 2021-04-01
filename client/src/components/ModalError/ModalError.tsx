import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'
import ErrorImg from '../../assets/img/Error.svg'
import Modal, { ModalProps } from '../Modal/Modal';

interface SuccessProps extends ModalProps {
    text: string
    txhash: string
}
const ModalError: React.FC<SuccessProps> = ({
    text,
    txhash,
    onDismiss
}) => {
    return (
        <Modal>
            <StyledSuccessWrap>
                <StyledModalSuccess>
                    <img height="200px" src={ErrorImg} alt="Confirm Error" />
                    <Spacer size="md" />
                    <StyleMaxText>{text}!</StyleMaxText>
                    {/* <Spacer size="md" />
                    <StyleInfo>
                        <StyleLabel>Tx hash:</StyleLabel>
                        <StyledLink target="_blank" href={'https://etherscan.io/tx/' + txhash}>{txhash}</StyledLink>
                    </StyleInfo> */}
                    <Spacer size="md" />
                    <Button text="Close" variant="secondary" onClick={onDismiss} />

                    <Spacer size="md" />
                </StyledModalSuccess>
            </StyledSuccessWrap>
        </Modal>

    )
}

const StyledSuccessWrap = styled.div``

const StyledModalSuccess = styled.div`
  padding: ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  // display: none;
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

export default ModalError
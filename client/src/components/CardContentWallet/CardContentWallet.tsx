import React from 'react'
import styled from 'styled-components'

const CardContentWallet: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
)

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // padding: 0px 20px;
`

export default CardContentWallet

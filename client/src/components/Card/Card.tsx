import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  min-height: 320;
  width: 100%;
  padding: 20;
  border-radius: 20px;
  background-color: rgba(41, 42, 66, 0.3);
  border: 2px solid #212121;
  filter: drop-shadow(0 0 0.5rem #212121);
`

export default Card

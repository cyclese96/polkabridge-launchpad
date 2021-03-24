import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.grey[200]};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card

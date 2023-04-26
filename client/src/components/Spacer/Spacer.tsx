import React from 'react'
import styled from 'styled-components'
import theme from '../../theme/index'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'bg'
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  let s: number
  switch (size) {
    case 'bg':
      s = theme.spacing[7]
      break
    case 'lg':
      s = theme.spacing[6]
      break
    case 'sm':
      s = theme.spacing[2]
      break
    case 'md':
    default:
      s = theme.spacing[4]
  }

  return <StyledSpacer size={s} />
}

interface StyledSpacerProps {
  size: number
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`

export default Spacer

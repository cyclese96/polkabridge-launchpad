import React, { useMemo } from 'react'
import styled from 'styled-components'
import theme from '../../theme/index'

type SeparatorOrientation = 'horizontal' | 'vertical'

interface SeparatorProps {
  orientation?: SeparatorOrientation
  stretch?: boolean
}

const Separator: React.FC<SeparatorProps> = ({ orientation, stretch }) => {
  let boxShadow = `0 -1px 0px ${theme.color.grey[300]}`
  if (orientation === 'vertical') {
    boxShadow = `-1px 0px 0px ${theme.color.grey[300]}ff`
  }

  const Content = useMemo(() => {
    return <StyledSeparator boxShadow={boxShadow} orientation={orientation} />
  }, [boxShadow, orientation])

  if (stretch) {
    return <div style={{ alignSelf: 'stretch' }}>{Content}</div>
  }

  return Content
}

interface StyledSeparatorProps {
  boxShadow: string
  orientation?: SeparatorOrientation
}

const StyledSeparator = styled.div<StyledSeparatorProps>`
  background-color: ${(props) => props.theme.color.grey[100]};
  box-shadow: ${(props) => props.boxShadow};
  height: ${(props) => (props.orientation === 'vertical' ? '100%' : '1px')};
  width: ${(props) => (props.orientation === 'vertical' ? '1px' : '100%')};
`

export default Separator

import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary' | 'transparent',
  margin?: string,
  justify?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  margin,
  justify
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  let bgColor: string
  let bdColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.primary.main
      bgColor = color.grey[400]
      break
    case 'tertiary':
      buttonColor = color.grey[500]
      bgColor = color.grey[400]
      break
    case 'transparent':
      buttonColor = color.white
      bgColor = "transparent"
      bdColor = color.grey[400]
      break
    case 'default':
    default:
      buttonColor = color.grey[500]
      bgColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      boxShadow = `none`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 48
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      bgColor = {bgColor}
      bdColor = {bdColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      margin={margin}
      justify={justify}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string,
  color: string,
  bgColor: string,
  bdColor: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number,
  margin: string,
  justify: string
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${props => !props.disabled ? props.bgColor : `${props.bgColor}50`};
  border: solid 1px;
  border-radius: 8px;
  box-shadow: ${props => props.boxShadow};
  color: ${props => !props.disabled ? props.color : `${props.color}1`};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: 700;
  height: ${props => props.size}px;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;
  // &:hover {
  //   background-color: ${props => props.bgColor};
  // }
  border-color: ${props => props.bdColor ? props.bdColor : props.bgColor};
  margin: ${props => props.margin};
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 48px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 48px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button
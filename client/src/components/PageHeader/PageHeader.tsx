import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 80px;
  line-height: 120px;
  text-align: center;
`

const StyledTitle = styled.h1`
  font-family: 'Kaushan Script', sans-serif;
  color: ${(props) => props.theme.color.white};
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledSubtitle = styled.h3`
  // color: ${(props) => props.theme.color.grey[100]};
  color: rgb(224, 7, 125);
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;
  padding: 0;
  text-align: center;
  word-break: break-all;
`

export default PageHeader

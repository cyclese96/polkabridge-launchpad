import React, {useState} from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'
import MenuIcon from '../../assets/img/menu.svg'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <StyledLogoWrapper>
              <Logo />
            </StyledLogoWrapper>
            <WrapMenuDesktop>
              <Nav showMenu={showMenu} />
            </WrapMenuDesktop>
          </div>
          <StyledAccountButtonWrapper>
            <AccountButton />
            <WrapIconMenu>
              <img onClick={()=> setShowMenu(!showMenu)} className="d-md-none" src={MenuIcon} width="25" style={{ marginLeft: '10px', marginTop: '5px', cursor: 'pointer' }} />
            </WrapIconMenu>
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
        <WrapMenuMobile>
          <Nav showMenu={showMenu} />
        </WrapMenuMobile>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 260px;
  padding: 10px 0;
  @media (max-width: 767px) {
    width: auto;
  }
`

const WrapMenuDesktop = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`

const WrapMenuMobile = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`

const WrapIconMenu = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
  }
`

const StyledTopBar = styled.div`
  background-color: ${(props) => props.theme.color.primary.light};
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  // height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 767px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
//   width: 156px;
  @media (max-width: 767px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 767px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar

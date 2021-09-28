import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import DotCircle from './DotCircle'
import { makeStyles } from '@material-ui/core/styles'

interface NavProp {
  showMenu: boolean
}
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
  },

  sectionDesktop: {
    marginLeft: 40,
    marginRight: 40,
    [theme.breakpoints.down('md')]: {
      marginLeft: 5,
      marginRight: 5,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  nav: {
    marginRight: 15,
  },

  navbarItemsDesktop: {
    paddingRight: 10,
    fontWeight: 400,
    lineHeight: '34px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    padding: '9px 14px 0px',
    cursor: 'pointer',
    fontSize: '1.2vw',
    color: '#e5e5e5',
    textDecoration: 'none',
  },
  navbarItemsDesktopActive: {
    paddingRight: 10,
    fontWeight: 500,
    lineHeight: '34px',
    verticalAlign: 'baseline',
    letterSpacing: '-1px',
    margin: 0,
    padding: '9px 14px 0px',
    cursor: 'pointer',
    fontSize: '1.2vw',
    color: '#e0077d',
    textDecoration: 'none',
  },

  network: {
    display: 'flex',
    marginLeft: 20,
    alignItems: 'center',
    border: '0.5px solid #919191',
    borderRadius: 20,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 10,
    letterSpacing: 0.4,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 140,
    },
  },
}))

const Nav: React.FC<NavProp> = ({ showMenu }) => {
  const classes = useStyles()
  return (
    <StyledNav showMenu={showMenu} className={classes.sectionDesktop}>
      <StyledAbsoluteLink
        href="https://stake.polkabridge.org"
        className={classes.navbarItemsDesktop}
      >
        Stake <DotCircle />
      </StyledAbsoluteLink>
      <StyledAbsoluteLink href="/" className={classes.navbarItemsDesktop}>
        Farm
        <DotCircle />
        
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href="https://launchpad.polkabridge.org"
        className={classes.navbarItemsDesktopActive}
      >
        Launchpad
        <DotCircle />
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href="https://swap.polkabridge.org"
        className={classes.navbarItemsDesktop}
      >
        Swap
        <DotCircle />
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href="https://lending.polkabridge.org"
        className={classes.navbarItemsDesktop}
      >
        Lending
        <DotCircle />
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href="https://prediction.polkabridge.org"
        className={classes.navbarItemsDesktop}
      >
        Prediction
        <DotCircle />
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href="https://corgib.polkabridge.org/bet"
        className={classes.navbarItemsDesktop}
      >
        Betting
        <DotCircle />
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav<{ showMenu: boolean }>``
const StyledLink = styled(NavLink)``
const StyledLink2 = styled(NavLink)``
const StyledAbsoluteLink = styled.a``
const StyledAbsoluteLink2 = styled.a``

export default Nav

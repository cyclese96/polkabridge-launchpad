import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import DotCircle from './DotCircle'
import { makeStyles } from '@material-ui/core/styles'
import { white } from '../../../theme/colors'
// import Wallet from './Wallet'

interface NavProp {
  showMenu: boolean
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBarBackground: {
    boxShadow: 'none',
    backgroundColor: '#100525',
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    textTransform: 'none',
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
  },
  iconText: {
    fontSize: 15,
  },
  icon: {},

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
  sectionMobile: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  row1: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },

  home: {
    'text-decoration': 'none',
    color: 'black',
    cursor: 'pointer',
    marginRight: 5,
    marginLeft: 5,
  },
  nav: {
    marginRight: 15,
  },
  menuIcon: {
    color: '#212121',
  },

  fullList: {
    width: 'auto',
  },
  menuTitleMobile: {
    paddingLeft: 25,
    fontWeight: 500,
    verticalAlign: 'baseline',
    fontFamily: 'New Rocker, cursive',
    textAlign: 'left',
    fontSize: 16,
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
  navbarButton: {
    backgroundColor: '#f9f9f9',
    color: '#C80C81',
    borderRadius: 10,
    height: 35,
    marginRight: 40,
    padding: 20,
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.7)',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  mobileButton: {
    borderRadius: '50px',
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    lineHeight: '24px',
    verticalAlign: 'baseline',
    letterSpacing: '-0.8px',
    margin: 0,
    color: '#ffffff',
    padding: '5px 15px 5px 15px',
    fontWeight: 600,
  },
  leftMargin: {
    marginLeft: 159,
    [theme.breakpoints.down('lg')]: {
      marginLeft: 100,
    },
  },
  numbers: {
    color: '#E0077D',
    fontSize: 26,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
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
    // cursor: "pointer",
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 140,
    },
  },
  networkIcon: {
    width: 30,
    height: 'auto',
  },
  logo: {
    height: 38,
    width: 150,
    [theme.breakpoints.down('sm')]: {
      height: 30,
      width: 'fit-content',
    },
  },
  list: {
    paddingTop: 20,
    width: '250px',
    borderLeft: '5px solid pink',
    borderColor: '#3A1242',
    // borderColor: "#220c3d",
    height: '100%',
    backgroundColor: '#100525',
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

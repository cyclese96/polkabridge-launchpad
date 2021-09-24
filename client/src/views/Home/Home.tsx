import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
// import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import CustomCountDown from './components/CustomCountDown'
import { START_REWARD_AT_BLOCK } from '../../pbr/lib/constants'
import PolkaBridgeLogo from '../../assets/img/logo-icon.svg'
import LaunchpadCards from '../Launchpads/components/LaunchpadCards'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import LaunchpadRight from '../Launchpads/components/LaunchpadRight'

const useStyles = makeStyles((theme) => ({
  earn: {
    textAlign: 'center',
    color: '#f9f9f9',
    fontSize: 12,
  },
  title: {
    color: '#e5e5e5',
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'left',
  },

  desktop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tokenAmount: {
    fontWeight: 700,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: '#C80C81',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenTitle: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
    paddingBottom: 3,
    color: '#e5e5e5',
  },
  tokenSubtitle: {
    fontWeight: 300,
    padding: 0,
    paddingLeft: 10,
    fontSize: 12,
    color: '#bdbdbd',
  },
  card: {
    minHeight: 300,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(41, 42, 66, 0.3)',
    border: '1px solid #212121',
    filter: 'drop-shadow(0 0 0.5rem #212121)',
    [theme.breakpoints.down('sm')]: {
      minWidth: 240,
      width: '100%',
    },
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    border: '1px solid #f9f9f9',
    padding: 12,
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
  },
  buynow: {
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    color: 'white',
    width: 300,
    height: 45,
    textDecoration: 'none',
    textTransform: 'none',
    fontSize: 20,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    '&:hover': {
      background: 'rgba(224, 7, 125, 0.7)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      fontSize: 15,
    },
  },
  background: {
    paddingTop: 50,
    paddingLeft: 50,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  divider: {
    width: 130,
    height: 3,
    background: 'linear-gradient(to right, #e0077d, rgba(0, 0, 0, 0.4))',
  },
  butt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()
  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  return (
    <Page>
      <div className="container">
        <div className={classes.background}>
          <h1 className={classes.title}>Launchpad</h1>
          <div className={classes.divider} />
          <div className="row mt-5">
            <div className="col-md-8 mb-3">
              <div className={classes.card}>
                <div>
                  <div className={classes.butt}>
                    <Avatar
                      src={'https://stake.polkabridge.org/img/symbol.png'}
                      className={classes.logo}
                    />
                  </div>
                  <div className={classes.butt}>
                    <h6 className={classes.title}>
                      Decentralized Fundraising Platform
                    </h6>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      style={{
                        backgroundColor: '#C80C81',
                        borderRadius: '50%',
                        height: '5px',
                        width: '5px',
                        marginRight: 5,
                      }}
                    >
                      .
                    </div>
                    <div className={classes.earn}>
                      All in one defi application
                    </div>
                  </div>
                  <div className={classes.butt}>
                    <a
                      target="_blank"
                      href="https://polkabridge.medium.com/polkabridge-launchpad-tutorial-50e8e80905d4"
                    >
                      <div className={classes.buynow}>
                        How to join Launchpad
                      </div>
                    </a>
                  </div>
                  <div className={classes.butt}>
                    <a
                      target="_blank"
                      href="https://docs.google.com/forms/d/1ceBZIL8xDNBJWYzZ4j11lhU9MMke8usrNgnPEoSIMf0/edit"
                    >
                      <div className={classes.buynow}>Apply for IDO</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <LaunchpadRight />
            </div>
          </div>
        </div>
      </div>
      <Box className="mt-4">
        <LaunchpadCards />
      </Box>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  > img {
    width: 20px;
    margin-right: 3px;
  }
  b {
    color: ${(props) => props.theme.color.primary.main};
  }
`
const StyledHeading = styled.h2`
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`
const StyledParagraph = styled.p`
  color: ${(props) => props.theme.color.grey[100]};
  text-align: center;
  margin-top: 10px;
`

const ReadMore = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: #ffffff;
  display: inline-block;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #e0077d70;
  background: #ffec0b0d;
  font-size: 14px;
  margin-top: 10px;
`

const StyledLogo = styled.div`
  .d-md-none {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .d-lg-none {
    @media (min-width: 1025px) {
      display: none;
    }
  }
`

const Box = styled.div`
  &.mt-4 {
    margin-top: 40px;
    @media (max-width: 767px) {
      margin-top: 30px;
    }
  }
`
const SpacerRes = styled.div`
  .sc-iCoHVE {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .d-lg-none {
    @media (min-width: 1025px) {
      display: none;
    }
  }
`
export default Home

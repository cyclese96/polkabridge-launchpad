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

const Home: React.FC = () => {
  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  return (
    <Page>
        <SpacerRes>
            <Spacer size="lg" />
            <StyledLogo>
                <img className="d-md-none" src={PolkaBridgeLogo} height="120" style={{ marginTop: -4 }} />
            </StyledLogo>
        </SpacerRes>
        <Spacer size="lg" />
        <div style={{fontWeight: 'bold', fontSize: 22, color: '#ffffff', textAlign: 'center'}}>
            Decentralized Fundraising Platform
        </div>

        {block < launchBlock && atDate && <>
            <Spacer size="sm" />
            <CustomCountDown date={atDate}/>
            <Spacer size="md" />
            <div>
                <ReadMore href="https://polkabridge.medium.com/polkabridge-launchpad-tutorial-50e8e80905d4" target="__blank"> How To Join LaunchPad </ReadMore>
            </div>
            <div>
                <ReadMore href="https://docs.google.com/forms/d/1ceBZIL8xDNBJWYzZ4j11lhU9MMke8usrNgnPEoSIMf0/edit" target="__blank"> Apply for IDO </ReadMore>
            </div>
            <Spacer size="lg" />
            </>
        }
        {block >= launchBlock && <>
            <Spacer size="lg" />
            <div style={{textAlign: 'center'}}>
                <ReadMore href="https://polkabridge.medium.com/polkabridge-launchpad-tutorial-50e8e80905d4" target="__blank"> How To Join LaunchPad </ReadMore>
            </div>
            <div style={{textAlign: 'center'}}>
                <ReadMore href="https://docs.google.com/forms/d/1ceBZIL8xDNBJWYzZ4j11lhU9MMke8usrNgnPEoSIMf0/edit" target="__blank"> Apply for IDO </ReadMore>
            </div>
            {/*<Spacer size="lg" />*/}
            </>
        }
        <Spacer size="lg" />
        <Container size = "lg">
            <div style={{
                border: '1px solid #2C3030'
                }}>
            </div>
        </Container>
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
  > img{
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

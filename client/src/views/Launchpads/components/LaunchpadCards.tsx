import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Launchpad } from '../../../contexts/Launchpads'
import useLaunchpads from '../../../hooks/useLaunchpads'
import usePoolActive from '../../../hooks/usePoolActive'
import usePolkaBridge from '../../../hooks/usePolkaBridge'
import { getProgress } from '../../../pbr/utils'

const LaunchpadCards: React.FC = () => {
  const [launchpads] = useLaunchpads()

  const rows = launchpads.reduce<Launchpad[][]>(
    (launchpadRows, launchpad, i) => {
      const newLaunchpadRows = [...launchpadRows]
      if (newLaunchpadRows[newLaunchpadRows.length - 1].length === 3) {
        newLaunchpadRows.push([launchpad])
      } else {
        newLaunchpadRows[newLaunchpadRows.length - 1].push(launchpad)
      }
      return newLaunchpadRows
    },
    [[]],
  )

  return (
    <StyledCards>
      <StyledHeading>UPCOMING POOLS</StyledHeading>
      <Spacer size="lg" />

      {!!rows[0].length ? (
        rows.map((launchpadRow, i) => (
          <StyledRow key={i}>
            {launchpadRow.map((launchpad, j) => launchpad.endAt * 1000 > new Date().getTime() && (
              <React.Fragment key={j}>
                <LaunchpadCard launchpad={launchpad} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
          <StyledLoadingWrapper>
            <Loader text="Fly on the sky ..." />
          </StyledLoadingWrapper>
        )}

      <StyledHeading>ENDED POOLS</StyledHeading>
      <Spacer size="lg" />
      {!!rows[0].length ? (
        rows.map((launchpadRow, i) => (
          <StyledRow key={i}>
            {launchpadRow.map((launchpad, j) => launchpad.endAt * 1000 <= new Date().getTime() && (
              <React.Fragment key={j}>
                <LaunchpadCard launchpad={launchpad} />
                {(j === 0 || j === 1 || j===2) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
          <StyledLoadingWrapper>
            <Loader text="Fly on the sky ..." />
          </StyledLoadingWrapper>
        )}
    </StyledCards>
  )
}

interface LaunchpadCardProps {
  launchpad: Launchpad
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ launchpad }) => {
  const poolActive = usePoolActive(launchpad.startAt)
  const pbr = usePolkaBridge()

  const [progress, setProgress] = useState<BigNumber>()

  useEffect(() => {
    async function fetchData() {
      const newProgress = await getProgress(launchpad.lpContract, launchpad.pid)
      setProgress(newProgress)
    }
    if (launchpad) {
      fetchData()
    }
  }, [launchpad.pid, setProgress, poolActive])

  const renderer = (countdownProps: CountdownRenderProps) => {
    var { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    // hours = days * 24 + hours
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {days}D:{hours}H:{minutes}m:{seconds}s
      </span>
    )
  }

  return (

    <StyledCardWrapper>
      {launchpad.tokenSymbol === 'PBR' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <StyledTopIcon>
            </StyledTopIcon>
            <div style={{ display: 'flex' }}>
              <CardIcon><img src={launchpad.icon} alt="" height="60" /></CardIcon>
            </div>
            <StyledTitle>{launchpad.name} {launchpad.access}</StyledTitle>
            {/* <StyledDetails>
              <StyledDetail>{launchpad.description}</StyledDetail>
            </StyledDetails> */}
            <br />
            <StyledInsight>
              <span>Total funds</span>

              <span>
                <b>{launchpad.total}</b>
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Ratio</span>

              <span>
                <b>1 ETH = {launchpad.ratio} {launchpad.tokenSymbol}</b>
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Access</span>

              <span style={{ color: '#ff3465' }}>
                <b>{launchpad.access}</b>
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Progress</span>
            </StyledInsight>
            {progress &&
              (<>
                <div style={{ width: `100%` }}>
                  <StyledProgress>
                    <StyledProgressBar style={{ width: progress.toString() + `%` }} />
                  </StyledProgress>
                  <StyledProgressText>{progress.toFixed(2).toString()}%</StyledProgressText>
                </div>
                <Spacer />
              </>)
            }
            <Button
              // disabled={!poolActive || progress == new BigNumber("100")}
              // text={poolActive ? 'View' : (progress == new BigNumber("100") ? 'Ended' : undefined)}
              text='View'
              to={`/launchpads/view/${launchpad.id}`}
            >
              {/* {!poolActive && (
                <Countdown
                  date={new Date(launchpad.startAt * 1000)}
                  renderer={renderer}
                />
              )} */}
            </Button>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`
const StyledHeading = styled.h2`
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`

const StyledCards = styled.div`
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.white};
  font-size: 20px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledTopIcon = styled.div`
  // position: relative;
`

const StyledHotIcon = styled.div`
  position: absolute;
  background-color: gray;
  padding: 8px 40px 8px;
  top: 12px;
  left: -30px;
  font-weight: bold;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  color: #fff;
  font-size: 9px;
`

const StyledNewIcon = styled.div`
  position: absolute;
  padding: 8px 40px 8px;
  top: 12px;
  left: -30px;
  background-color: ${(props) => props.theme.color.primary.main};
  font-weight: bold;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  color: #fff;
  font-size: 9px;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 14px;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: transparent;
  color: #9E9E9E;
  width: 100%;
  line-height: 25px;
  font-size: 13px;
  border: 0px solid #e6dcd5;
  text-align: center;
`

const StyledProgress = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 8px;
  background: #f2f0eb;
  border-radius: 5px;
`

const StyledProgressText = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 12px;
  color: #e0077d;
  line-height: 12px;
`

const StyledProgressBar = styled.i`
  position: absolute;
  left: 0;
  top: 0;
  height: 8px;
  background: #e0077d;
  border-radius: 5px;
  font-size: 14px;
`

export default LaunchpadCards

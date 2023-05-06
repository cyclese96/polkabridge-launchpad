import BigNumber from 'bignumber.js'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Spacer from '../../../components/Spacer'

import useIdoPool from '../../../hooks/useIdoPool'
import LaunchpadCard from './LaunchpadCard'

const LaunchpadCards: React.FC = () => {
  const { upcomingIdos, endedIdos } = useIdoPool()

  return (
    <StyledCards>
      <StyledHeading> UPCOMING POOLS</StyledHeading>
      <Wrapper>
        <div className="container mt-4" style={{ marginBottom: 60 }}>
          {/* {true && ( */}
          <div className="row d-flex justify-content-center">
            {upcomingIdos.map((singleLaunchpad: any, i) => {
              {
                return (
                  singleLaunchpad.endAt * 1000 > new Date().getTime() && (
                    <div
                      className="col-md-4 d-flex justify-content-center mt-4"
                      key={i}
                    >
                      <LaunchpadCard launchpad={singleLaunchpad} />
                      {<StyledSpacer />}
                    </div>
                  )
                )
              }
            })}
          </div>
          {/* )} */}
        </div>
      </Wrapper>
      <Spacer size="lg" />

      <StyledHeading>ENDED POOLS</StyledHeading>
      <Wrapper>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            {endedIdos.map((singleLaunchpad: any, i) => {
              {
                return (
                  singleLaunchpad.endAt * 1000 < new Date().getTime() && (
                    <div
                      className="col-md-4 d-flex justify-content-center mt-4"
                      key={i}
                    >
                      <LaunchpadCard
                        launchpad={singleLaunchpad}
                        key={i}
                        ended={true}
                      />
                      {<StyledSpacer />}
                    </div>
                  )
                )
              }
            })}
          </div>
        </div>
      </Wrapper>
    </StyledCards>
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
  margin-top: 25px;
  font-size: 26px;
`

const Wrapper = styled.div`
  max-width: 1070px;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: 840px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 3px solid #212121;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.white};
  font-size: 20px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledTitle2 = styled.h4`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content-center;
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

export default LaunchpadCards

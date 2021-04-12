import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Button from '../../components/Button'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useLaunchpad from '../../hooks/useLaunchpad'
import useModal from '../../hooks/useModal'
import useRedeem from '../../hooks/useRedeem'
import usePolkaBridge from '../../hooks/usePolkaBridge'
import useBulkPairData from '../../hooks/useBulkPairData'
import { BigNumber } from '../../pbr'
import { getMasterChefContract, getProgress } from '../../pbr/utils'
import { getContract } from '../../utils/erc20'
import { getBalanceNumber } from '../../utils/formatBalance'
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Contract } from 'web3-eth-contract';

const Launchpad: React.FC = () => {
  const { launchpadId } = (useParams() as any)
  const {
    pid,
    name,
    id,
    icon,
    description,
    introduce,
    website,
    twitter,
    telegram,
    whitepaper,
    lpAddress,
    lpContract,
    lpExplorer,
    tokenAddress,
    tokenExplorer,
    tokenSymbol,
    total,
    totalSupply,
    ratio,
    min,
    max,
    access,
    distribution,
    startAt,
    endAt,
    claimAt
  } = useLaunchpad(launchpadId) || {
    pid: 0,
    name: '',
    id: '',
    icon: '',
    description: '',
    introduce: '',
    website: '',
    twitter: '',
    telegram: '',
    whitepaper: '',
    lpAddress: '',
    lpContract: null,
    lpExplorer: '',
    tokenAddress: '',
    tokenExplorer: '',
    tokenSymbol: '',
    total: '',
    totalSupply: '',
    ratio: 0,
    min: 0,
    max: 0,
    access: '',
    distribution: '',
    startAt: 0,
    endAt: 0,
    claimAt: 0
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pbr = usePolkaBridge()
  const [progress, setProgress] = useState<BigNumber>()

  useEffect(() => {
    async function fetchData() {
      const newProgress = await getProgress(lpContract, pid)
      setProgress(newProgress)
    }
    if (pid >= 0) {
      fetchData()
    }
  }, [pid, lpContract, setProgress])

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
    <>
      <PageHeader
        icon={
          <div style={{ display: 'flex' }}>
            <img src={icon} height="70" />
          </div>
        }
        title= {name + ' ' + access}
        subtitle={tokenAddress}
      />

      <StyledLaunchpad>
        <StyledInfoWrap>
          <StyledInfo>
            <StyledBox className="col-10">
              <StyledText>
                {introduce}
              </StyledText>
              <StyledSocialMedia>
                {website && <StyledMediaLink href={website} target="_blank">Website</StyledMediaLink>}
                {twitter && <StyledMediaLink href={twitter} target="_blank">Twitter</StyledMediaLink>}
                {telegram && <StyledMediaLink href={telegram} target="_blank">Telegram</StyledMediaLink>}
                {/* {whitepaper && <StyledMediaLink href={whitepaper} target="_blank">Whitepaper</StyledMediaLink>} */}
              </StyledSocialMedia>
            </StyledBox>
          </StyledInfo>
          <StyledInfo>
            <StyledBox className="col-4">
              <Button
                disabled={startAt * 1000 > new Date().getTime()}
                text={ (startAt * 1000 <= new Date().getTime() ? 'Join pool' : undefined)}
                to={`/launchpads/join/${id}`}
              >
                {startAt * 1000 > new Date().getTime() && (
                  <Countdown
                    date={new Date(startAt * 1000)}
                    renderer={renderer}
                  />
                )}
              </Button>
            </StyledBox>
            <StyledBox className="col-2"></StyledBox>
            <StyledBox className="col-4">
              <Button
                variant='tertiary'
                text='View Explorer'
                href={lpExplorer}
              ></Button>
            </StyledBox>
          </StyledInfo>
          <StyledInfo>
            <StyledBox className="col-10">
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
            </StyledBox>
          </StyledInfo>

          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledTable>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableHeadCell>
                      Pool Information
                  </StyledTableHeadCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Token distribution
                      </StyledTableLabel>
                        <StyledTableValue>
                          {distribution}
                      </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Min - Max Allocation
                      </StyledTableLabel>
                        <StyledTableValue>
                          {min} ETH - {max} ETH
                      </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Access Type
                          </StyledTableLabel>
                        <StyledTableValue>
                          {access}
                        </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>
                </StyledTableBody>
              </StyledTable>
            </StyledBox>
          </StyledInfoSolid>

          <Spacer />
          
          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledTable>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableHeadCell>
                      Token Information
                  </StyledTableHeadCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Name
                      </StyledTableLabel>
                        <StyledTableValue>
                          {name}
                      </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Address
                      </StyledTableLabel>
                        <StyledTableValue>
                          {tokenAddress}
                      </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          Total Supply
                        </StyledTableLabel>
                        <StyledTableValue>
                          {totalSupply}
                        </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>
                </StyledTableBody>
              </StyledTable>
            </StyledBox>
          </StyledInfoSolid>
        </StyledInfoWrap>
        <Spacer size="md" />
      </StyledLaunchpad>
    </>
  )
}

const StyledInfoWrap = styled.div`
  width: 600px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const StyledLaunchpad = styled.div`
      align-items: center;
      display: flex;
      flex-direction: column;
  @media (max-width: 767px) {
        padding 0 15px;
    }
  `

const StyledText = styled.p`
  display: flex;
  text-align: justify;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 24px;
`

const StyledSocialMedia = styled.div`
  text-align: center;
`

const StyledMediaLink = styled.a`
  color: #7a7f82;
  padding: 6px 12px;
  text-decoration: none;
`

const StyledInfo = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    // padding: ${(props) => props.theme.spacing[3]}px;
    // border: 2px solid ${(props) => props.theme.color.grey[200]};
    border-radius: 12px;
    margin: ${(props) => props.theme.spacing[3]}px auto;
    @media (max-width: 767px) {
        width: 100%;
        text-align: center;
    }
`

const StyledInfoSolid = styled.div`
      display: flex;
      padding: 15px 10px;
      background: #00ff5d0f;
      border-radius: 12px;
    `

const StyledBox = styled.div`
    &.col-2 {
        width: 20%;
  }
    &.col-4 {
        width: 40%;
  }
    &.col-5 {
        width: 50%;
  }
    &.col-8 {
        width: 80%;
  }
    &.col-10 {
        width: 100%;
  }
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

const StyledTable = styled.table`
  width: 100%;
  border-radius: 5px;
`
const StyledTableHead = styled.thead``
const StyledTableBody = styled.tbody``
const StyledTableRow = styled.tr`
  height: 60px;
  border-bottom: 1px solid #ebe9e3;
`
const StyledTableHeadCell = styled.th`
  padding: 0 50px 0 30px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  // line-height: 60px;
  text-align: left;
`
const StyledTableBodyCell = styled.td`
  padding: 0 50px 0 30px;
  font-size: 14px;
  color: #7a7f82;
  // line-height: 60px;
`
const StyledTableText = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
`
const StyledTableLabel = styled.span`

`
const StyledTableValue = styled.span`
  text-align: right;
  color: #ffffff;
  word-break: break-all;
`

export default Launchpad

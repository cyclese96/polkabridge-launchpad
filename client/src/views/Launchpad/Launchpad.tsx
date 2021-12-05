import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useLaunchpad from '../../hooks/useLaunchpad'
import usePolkaBridge from '../../hooks/usePolkaBridge'
import { BigNumber } from '../../pbr'
import {
  formatFloatValue,
  formattedNetworkName,
  fromWei,
  getMaxAllocation,
  getNetworkName,
  getProgress,
  getUserStakingData,
} from '../../pbr/utils'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import { white } from '../../theme/colors'
import { bscNetwork, ethereumNetwork, getPoolId, GUARANTEED, harmonyNetwork, polygonNetwork, PRIVATE, PUBLIC, tierConditions, WHITELIST } from '../../pbr/lib/constants'
import useNetwork from '../../hooks/useNetwork'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { networkSymbol } from '../../pbr/helpers'

const Launchpad: React.FC = () => {
  const { launchpadId, poolId } = useParams() as any
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
    maxTier1,
    maxTier2,
    maxTier3,
    maxWhitelistPurchase,
    access,
    network,
    distribution,
    startAt,
    endAt,
    claimAt,
    startDate,
  } = useLaunchpad(launchpadId, Number(poolId)) || {
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
    maxTier1: 0,
    maxTier2: 0,
    maxTier3: 0,
    maxWhitelistPurchase: 0,
    access: '',
    network: '',
    distribution: '',
    startAt: 0,
    endAt: 0,
    claimAt: 0,
    startDate: 'TBA',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pbr = usePolkaBridge()
  const [progress, setProgress] = useState<BigNumber>()
  const [stakedAmount, setStakedAmount] = useState('0')
  const { ethereum, account } = useWallet()
  const [maxGuaranteed, setMaxGuaranteed] = useState('0');


  const history = useHistory()
  const { chainId } = useNetwork()

  const currentPoolId = (pid: number, network: string) => {
    return getPoolId(pid, network)
  }

  useEffect(() => {

    async function fetchData() {
      const newProgress = await getProgress(
        lpAddress,
        currentPoolId(pid, network),
        access,
        startAt,
        endAt,
        network
      )

      if (access === GUARANTEED) {
        const _max = await getMaxAllocation(lpAddress, currentPoolId(pid, network), access, account, network);
        setMaxGuaranteed(fromWei(_max))
      }

      const stakedTokens = await getUserStakingData(currentPoolId(pid, network), account, network)

      setProgress(newProgress)

      setStakedAmount(stakedTokens)
    }
    if (pid >= 0) {
      fetchData()
    }
  }, [ethereum, account, lpContract, pid, setStakedAmount, setProgress])

  const renderer = (countdownProps: CountdownRenderProps) => {
    var { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    // hours = days * 24 + hours
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%', color: white }}>
        {days}D:{hours}H:{minutes}m:{seconds}s
      </span>
    )
  }


  const showNetworkAlert = () => {
    const _networkName =
      network === bscNetwork ? 'Binance Smart Chain' : network === polygonNetwork ? "Polygon" : 'Ethereum'
    if (getNetworkName(chainId) !== network) {
      alert(
        `This pool works on ${_networkName} Network. Please switch your network to ${_networkName}`,
      )
    }
  }
  const handleJoinPool = () => {

    const _networkName = formattedNetworkName(network);

    if (getNetworkName(chainId) !== network) {
      alert(
        `This pool works on ${_networkName} Network. Please switch your network to ${_networkName}`,
      )
      return
    }
    history.push(`/launchpads/join/${launchpadId}/${poolId}`)
  }

  const getMaxValue = () => {

    if (access === 'Whitelist') {
      return maxWhitelistPurchase;
    } else if (access === GUARANTEED) {
      return maxGuaranteed;
    }

    const _stakedAmountInBigNumWei = new BigNumber(fromWei(stakedAmount.toString()));
    let maxValue = 0
    if (_stakedAmountInBigNumWei.gte(tierConditions.maxTier1.min) && _stakedAmountInBigNumWei.lte(tierConditions.maxTier1.max)) {
      maxValue = maxTier1
    } else if (_stakedAmountInBigNumWei.gte(tierConditions.maxTier2.min) && _stakedAmountInBigNumWei.lte(tierConditions.maxTier2.max)) {
      maxValue = maxTier2
    } else if (_stakedAmountInBigNumWei.gte(tierConditions.maxTier3.min)) {
      maxValue = maxTier3
    }
    return maxValue
  }

  return (
    <>
      <PageHeader
        icon={
          <div style={{ display: 'flex' }}>
            <img src={icon} height="70" />
          </div>
        }
        title={name + ' ' + access}
        subtitle={tokenAddress}
      />

      <StyledLaunchpad>
        <StyledInfoWrap>
          <StyledInfo>
            <StyledBox className="col-10">
              <StyledText>{introduce}</StyledText>
              <StyledSocialMedia>
                {website && (
                  <StyledMediaLink href={website} target="_blank">
                    Website
                  </StyledMediaLink>
                )}
                {twitter && (
                  <StyledMediaLink href={twitter} target="_blank">
                    Twitter
                  </StyledMediaLink>
                )}
                {telegram && (
                  <StyledMediaLink href={telegram} target="_blank">
                    Telegram
                  </StyledMediaLink>
                )}
                {whitepaper && (
                  <StyledMediaLink href={whitepaper} target="_blank">
                    Whitepaper
                  </StyledMediaLink>
                )}
              </StyledSocialMedia>
            </StyledBox>
          </StyledInfo>

          {access === 'Private' && ( //disabled
            <StyledBox className="col-10">
              <StyledCenterRow>
                <StyledInfoLabel>
                  Your staked amount:{' '}
                  {formatFloatValue(fromWei(stakedAmount.toString())) + ' PBR'}
                </StyledInfoLabel>
                <StyledInfoLabel>
                  Your max purchase:{' '}
                  {getMaxValue() + ' ' + networkSymbol(network)}
                </StyledInfoLabel>
              </StyledCenterRow>
            </StyledBox>
          )}

          {access === GUARANTEED && (
            <StyledBox className="col-10">
              <StyledCenterRow>
                {/* <StyledInfoLabel>
                  Your staked amount:{' '}
                  {formatFloatValue(fromWei(stakedAmount.toString())) + ' PBR'}
                </StyledInfoLabel> */}
                <StyledInfoLabel>
                  Your Allocation: {maxGuaranteed + ' ' + networkSymbol(network)}
                </StyledInfoLabel>
              </StyledCenterRow>
            </StyledBox>
          )}

          <StyledInfo>
            <StyledBox className="col-4">
              <Button
                disabled={startAt * 1000 > new Date().getTime()}
                text={
                  startAt * 1000 <= new Date().getTime()
                    ? 'Join Pool'
                    : undefined
                }
                onClick={handleJoinPool}
              // to={`/launchpads/join/${launchpadId}/${poolId}`}
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
                variant="tertiary"
                text="View Explorer"
                href={lpExplorer}
              ></Button>
            </StyledBox>
          </StyledInfo>
          <StyledInfo>
            <StyledBox className="col-10">
              {progress && (
                <>
                  <div style={{ width: `100%` }}>
                    <StyledProgress>
                      <StyledProgressBar
                        style={{ width: progress.toString() + `%` }}
                      />
                    </StyledProgress>
                    <StyledProgressText>
                      {progress.toFixed(2).toString()}%
                    </StyledProgressText>
                  </div>
                  <Spacer />
                </>
              )}
            </StyledBox>
          </StyledInfo>

          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledTable>
                <StyledTableHead>
                  <StyledTableRow>
                    <StyledTableHeadCell>Pool Information</StyledTableHeadCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Token distribution</StyledTableLabel>
                        <StyledTableValue>{distribution}</StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>
                          {(access === PUBLIC || access === WHITELIST) && 'Allocation'}
                          {access === PRIVATE && 'Min - Max Allocation'}
                          {access === GUARANTEED && 'Your Allocation'}
                        </StyledTableLabel>
                        <StyledTableValue>
                          {access === PUBLIC && `${maxTier2}  ${networkSymbol(network)}`}
                          {access === WHITELIST && `${maxWhitelistPurchase}  ${networkSymbol(network)}`}
                          {access === PRIVATE && `${min} ${networkSymbol(network)} - ${max} ${networkSymbol(network)}`}
                          {access === GUARANTEED && `${maxGuaranteed}  ${networkSymbol(network)}`}
                          {/* {access === 'Public' || access === 'Whitelist'
                            ? access === 'Public' ? `${maxTier2}  ${networkSymbol(network)}` : `${maxWhitelistPurchase}  ${networkSymbol(network)}`
                            : `${min} ${networkSymbol(network)} - ${max} ${networkSymbol(network)}`}
                                     {access === 'Public' || access === 'Whitelist'
                            ? access === 'Public' ? `${maxTier2}  ${networkSymbol(network)}` : `${maxWhitelistPurchase}  ${networkSymbol(network)}`
                            : `${min} ${networkSymbol(network)} - ${max} ${networkSymbol(network)}`}
                                        {access === 'Public' || access === 'Whitelist'
                            ? access === 'Public' ? `${maxTier2}  ${networkSymbol(network)}` : `${maxWhitelistPurchase}  ${networkSymbol(network)}`
                            : `${min} ${networkSymbol(network)} - ${max} ${networkSymbol(network)}`}    */}

                        </StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Access Type</StyledTableLabel>
                        <StyledTableValue>{access}</StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Network</StyledTableLabel>
                        <StyledTableValue>
                          {formattedNetworkName(network)}
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
                    <StyledTableHeadCell>Token Information</StyledTableHeadCell>
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Name</StyledTableLabel>
                        <StyledTableValue>{name}</StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Address</StyledTableLabel>
                        <StyledTableValue>{tokenAddress}</StyledTableValue>
                      </StyledTableText>
                    </StyledTableBodyCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableBodyCell>
                      <StyledTableText>
                        <StyledTableLabel>Total Supply</StyledTableLabel>
                        <StyledTableValue>{totalSupply}</StyledTableValue>
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
  background: rgba(41, 42, 66, 0.5);
  border-radius: 12px;
  border: 1px solid #454545;
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
  border-bottom: 1px solid #454545;
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
  text-align: right;
  color: #bdbdbd;
  font-weight: 400;
  word-break: break-all;
`
const StyledTableValue = styled.span`
  text-align: right;
  color: #ffffff;
  font-weight: 500;
  word-break: break-all;
`
const StyledCenterRow = styled.div`
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;

  -webkit-box-pack: justify;
  // -ms-flex-pack: justify;
  justify-content: center;
  -webkit-box-align: center;
  // -ms-flex-align: center;
  align-items: center;
`

const StyledInfoLabel = styled.div`
  margin-top: 30px;
  text-align: center;
  width: 100%;
  margin-bottom: 25px;
  font-weight: 400;
  font-size: 13px;
  color: #ffff4e;
`

export default Launchpad
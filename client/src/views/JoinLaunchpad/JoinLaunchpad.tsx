import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
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
import {
  getMasterChefContract,
  getProgress,
  getHistory,
  getETHBalance,
  getPurchasesAmount,
  getIsWhitelist,
  getUserStakingData,
  getUserInfo,
  fromWei,
  getStaked,
  formatFloatValue,
} from '../../pbr/utils'
import { getContract } from '../../utils/erc20'
import { getBalanceNumber } from '../../utils/formatBalance'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { Contract } from 'web3-eth-contract'
import useJoinPool from '../../hooks/useJoinPool'
import useHarvest from '../../hooks/useHarvest'
import ModalError from '../../components/ModalError'
import ModalSuccess from '../../components/ModalSuccess'
import ModalSuccessHarvest from '../../components/ModalSuccessHarvest'
import Modal from '../../components/Modal'
import { bscNetwork, ethereumNetwork, harmonyNetwork, polygonNetwork } from '../../pbr/lib/constants'
import ModalSuccessHarvest2 from '../../components/ModalSuccessHarvest/ModalSuccessHarvest'

interface JoinHistory {
  amount: number
  symbol: string
  status: string
  joinDate: string
}

const JoinLaunchpad: React.FC = () => {
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
    lpBscAddress,
    lpBscContract,
    lpHarmonyAddress,
    lpHarmonyContract,
    lpPolygonAddress,
    lpPolygonContract,
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
    access,
    network,
    distribution,
    startAt,
    endAt,
    claimAt,
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
    lpBscAddress: '',
    lpBscContract: null,
    lpHarmonyAddress: '',
    lpHarmonyContract: null,
    lpPolygonAddress: '',
    lpPolygonContract: null,
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
    access: '',
    network: '',
    distribution: '',
    startAt: 0,
    endAt: 0,
    claimAt: 0,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pbr = usePolkaBridge()
  const { ethereum, account } = useWallet()
  const [progress, setProgress] = useState<BigNumber>()
  const [isWhitelist, setIsWhitelist] = useState(false)
  const [ethValue, setETHValue] = useState('')
  const [tokenValue, setTokenValue] = useState('')//max output purchase token based on the ratio
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingHarvestTx, setPendingHarvestTx] = useState(false)
  const [successTx, setSuccessTx] = useState(false)
  const [successHarvestTx, setSuccessHarvestTx] = useState(false)
  const [errorTxt, setErrorTxt] = useState('')
  const [txhash, setTxhash] = useState('')
  const [ethBalance, setETHBalance] = useState(0)
  const [history, setHistory] = useState<JoinHistory[]>([])
  const [purchasedAmount, setPurchasedAmount] = useState(0)
  const [stakedAmount, setStakedAmount] = useState('0') // user total staked amount across the network: ethereum+matic
  const [tokenPurchased, setTokenPurchased] = useState(0) // token purchase by the user so far
  const [percentClaimed, setPercentClaimed] = useState(0);// percent token claimed by the user so far
  const { onJoinPool } = useJoinPool(pid, network)
  const { onHarvest } = useHarvest(pid, network)
  const [loading, setLoading] = useState(true)


  const currentLaunchadContractInstance = (_network: string) => {
    if (network === bscNetwork) {
      return lpBscContract
    } else if (network === polygonNetwork) {
      return lpPolygonContract
    } else if (network === harmonyNetwork) {
      return lpHarmonyContract
    } else if (network === ethereumNetwork) {
      return lpContract
    } else {
      return null
    }
  }


  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [
        newIsWhitelist,
        newETHBalance,
        newHistory,
        newProgress,
        newPurchasedAmount,
        stakedTokens,
        userInfo,
      ] = await Promise.all([
        getIsWhitelist(
          currentLaunchadContractInstance(network),
          pid,
          stakedAmount,
          account
        ),
        getETHBalance(ethereum, account),
        getHistory(account),
        getProgress(currentLaunchadContractInstance(network), pid),
        getPurchasesAmount(
          currentLaunchadContractInstance(network),
          pid,
          account,
        ),
        getUserStakingData(pid, account),
        getUserInfo(
          currentLaunchadContractInstance(network),
          pid,
          account,
        ),
      ])
      setLoading(false)

      // const bscUserInfo = await getUserInfoBsc(lpBscContract, pid, account)
      // console.log('stakedData--->  ', stakedTokens)
      // console.log('stakedDataPolygon--->  ', stakedDataPolygon)
      console.log('progress--->  ', newProgress)
      // console.log('newIsWhitelist--->  ', newIsWhitelist)
      // console.log('getUserTotalPurchased  ', newPurchasedAmount)
      // // console.log('newIsWhitelist--->  ',newIsWhitelist)

      setIsWhitelist(newIsWhitelist)
      setETHBalance(newETHBalance)
      setHistory(newHistory)
      setProgress(newProgress)
      setPurchasedAmount(newPurchasedAmount)
      setStakedAmount(stakedTokens)
      setTokenPurchased(userInfo ? Number(fromWei(userInfo[1])) : 0)
      setPercentClaimed(userInfo ? userInfo[3] : 0);
    }
    if (pid >= 0) {
      fetchData()
    }
  }, [
    isWhitelist,
    ethereum,
    account,
    lpContract,
    pid,
    stakedAmount,
    tokenPurchased,
    percentClaimed,
    setIsWhitelist,
    setETHBalance,
    setHistory,
    setProgress,
    setPurchasedAmount,
    setStakedAmount,
    setTokenPurchased,
    setPercentClaimed
  ])

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

  const onChangeETH = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      var newTokenValue = parseFloat(e.currentTarget.value) * ratio
      setETHValue(e.currentTarget.value)
      setTokenValue(newTokenValue.toString())
    },
    [ratio, setETHValue, setTokenValue],
  )

  const onChangeToken = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      var newETHValue = parseFloat(e.currentTarget.value) / ratio
      setTokenValue(e.currentTarget.value)
      setETHValue(newETHValue.toString())
    },
    [ratio, setTokenValue, setETHValue],
  )

  const getMaxValue = () => {
    const _stakedAmountInBigNumWei = new BigNumber(fromWei(stakedAmount.toString()));
    let maxValue = 0
    if (_stakedAmountInBigNumWei.gte(500) && _stakedAmountInBigNumWei.lt(1500)) {
      maxValue = maxTier1
    } else if (_stakedAmountInBigNumWei.gte(1500) && _stakedAmountInBigNumWei.lt(3000)) {
      maxValue = maxTier2
    } else if (_stakedAmountInBigNumWei.gte(3000)) {
      maxValue = maxTier3
    }
    return maxValue
  }

  const onMax = useCallback(() => {
    const _max = access === 'Public' ? maxTier2 : getMaxValue()
    let newTokenValue = _max * ratio
    setETHValue(_max.toString())
    setTokenValue(newTokenValue.toString())
  }, [ethBalance, ratio, setTokenValue, setETHValue, getMaxValue])

  const networkSymbol = () => {
    return network === bscNetwork ? 'BNB' : 'ETH'
  }

  const getJoinButtonText = () => {
    const _max = access === 'Public' ? maxTier2 : getMaxValue()

    return endAt * 1000 <= new Date().getTime()
      ? 'Ended'
      : pendingTx
        ? 'Pending Confirmation'
        : !isWhitelist
          ? access === 'Public'
            ? 'You are not whitelisted'
            : 'You have not participated in the staking'
          : startAt * 1000 <= new Date().getTime()
            ? parseFloat(ethValue) >= min && parseFloat(ethValue) <= _max
              ? new BigNumber(tokenValue).eq(tokenPurchased) ? "Already purchased" : 'Join pool'
              : `Min: ${min}   ${networkSymbol()}   - Max:  ${_max}  ${networkSymbol()}`
            : progress == new BigNumber('100')
              ? 'Ended'
              : undefined
  }

  const isButtonDisable = () => {
    const _max = access === 'Public' ? maxTier2 : getMaxValue()

    return (
      startAt * 1000 > new Date().getTime() ||
      endAt * 1000 <= new Date().getTime() ||
      !isWhitelist ||
      progress == new BigNumber('100') ||
      pendingTx ||
      !ethValue ||
      !tokenValue ||
      parseFloat(ethValue) < min ||
      parseFloat(ethValue) > _max ||
      new BigNumber(tokenValue).eq(tokenPurchased)
    )
  }

  const reset = useCallback(async () => {
    const newETHBalance = await getETHBalance(ethereum, account)
    const newHistory = await getHistory(account)
    const newProgress = await getProgress(lpContract, pid)
    const newPurchasedAmount = await getPurchasesAmount(
      lpContract,
      pid,
      account,
    )
    const userInfo = await getUserInfo(
      network === bscNetwork ? lpBscContract : lpContract,
      pid,
      account,
    )
    setETHBalance(newETHBalance)
    setHistory(newHistory)
    setProgress(newProgress)
    setPurchasedAmount(newPurchasedAmount)
    setETHValue('')
    setTokenValue('')
    setTokenPurchased(userInfo ? Number(fromWei(userInfo[1])) : 0)
    setPercentClaimed(userInfo ? userInfo[3] : 0);
  }, [
    ethereum,
    account,
    lpContract,
    pid,
    setETHBalance,
    setHistory,
    setProgress,
    setPurchasedAmount,
    setTokenValue,
    setETHValue,
    setTokenPurchased,
    setPercentClaimed
  ])

  const [onPresentSuccess] = useModal(
    <ModalSuccess
      amount={tokenValue}
      symbol={name}
      txhash="4f95c6770c75ddd3388f525"
      text="purchase"
    />,
  )

  const [onPresentError] = useModal(
    <ModalError text="Transaction failed" txhash={txhash} />,
  )

  // const [onPresentSuccessHarvest] = useModal(
  //   <ModalSuccessHarvest
  //     amount={tokenPurchased.toString()}
  //     symbol={name}
  //     txhash={txhash}
  //     text="harvest"
  //   />,
  // )
  const handleClose = () => {
    setSuccessHarvestTx(false)
  }

  const getRemainTokenPercentToClaim = (_percentClaimed: number) => {

    if (new BigNumber(100).minus(_percentClaimed).eq(0) || new BigNumber(100).minus(_percentClaimed).gt(1)) {
      return new BigNumber(100).minus(_percentClaimed).toFixed(0).toString()
    }
    return new BigNumber(100).minus(_percentClaimed).toFixed(3).toString();
  }

  const getRemainTokensToClaim = (_tokenPurchased: number, _percentClaimed: number) => {
    if (!_tokenPurchased) {
      return 0
    }
    if (new BigNumber(_percentClaimed).eq(0)) {
      return _tokenPurchased;
    }
    return new BigNumber(_tokenPurchased).multipliedBy(100 - _percentClaimed).div(100).toFixed(0).toString()
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
        <ModalSuccessHarvest loading={loading} onDismiss={handleClose} symbol={name} open={successHarvestTx} amount={tokenPurchased.toString()} percent={percentClaimed} text={"harvest"} txhash={txhash} />
        <StyledInfoWrap>
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

          {access === 'Private' ? (
            <StyledBox className="col-10">
              <StyledCenterRow>
                <StyledInfoLabel>
                  Your staked amount: {formatFloatValue(fromWei(stakedAmount.toString())) + ' PBR'}
                </StyledInfoLabel>
                <StyledInfoLabel>
                  Your max purchase: {getMaxValue() + ' ' + networkSymbol()}
                </StyledInfoLabel>
              </StyledCenterRow>
            </StyledBox>
          ) : (
            ''
          )}

          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledSwapWrap>
                <StyledInputContainer>
                  <StyledRow>
                    <StyledLabel>INPUT</StyledLabel>
                    <StyledLabel>Your Wallet Balance: {ethBalance.toFixed(4)}</StyledLabel>
                  </StyledRow>
                  <StyledInputRow>
                    <StyledInput
                      value={ethValue}
                      onChange={onChangeETH}
                      type="number"
                      placeholder="0.0"
                    />
                    <StyledRow>
                      <StyledMaxButton onClick={onMax}>MAX</StyledMaxButton>
                      <StyledTokenGroup>
                        <StyledTokenIconWrap>
                          <StyledTokenIcon
                            src={
                              network === ethereumNetwork
                                ? '/img/tokens/eth.png'
                                : '/img/tokens/bnb.png'
                            }
                            alt="icon"
                          ></StyledTokenIcon>
                        </StyledTokenIconWrap>
                        <StyledTokenSymbol>{networkSymbol()}</StyledTokenSymbol>
                      </StyledTokenGroup>
                    </StyledRow>
                  </StyledInputRow>
                </StyledInputContainer>

                <Spacer size="sm" />
                <StyledCenterRow>
                  <StyledTokenIconWrap>
                    <StyledTokenIconSvg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C3C5CB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </StyledTokenIconSvg>
                  </StyledTokenIconWrap>
                </StyledCenterRow>
                <Spacer size="sm" />

                <StyledInputContainer>
                  <StyledRow>
                    <StyledLabel>OUTPUT</StyledLabel>
                  </StyledRow>
                  <StyledInputRow>
                    <StyledInput
                      value={tokenValue}
                      onChange={onChangeToken}
                      type="number"
                      placeholder="0.0"
                    />
                    <StyledRow>
                      <StyledTokenGroup>
                        <StyledTokenIconWrap>
                          <StyledTokenIcon
                            src={icon}
                            alt="icon"
                          ></StyledTokenIcon>
                        </StyledTokenIconWrap>
                        <StyledTokenSymbol>{tokenSymbol}</StyledTokenSymbol>
                      </StyledTokenGroup>
                    </StyledRow>
                  </StyledInputRow>
                </StyledInputContainer>
                <Spacer size="md" />

                <Button
                  disabled={isButtonDisable()}
                  text={getJoinButtonText()}
                  onClick={async () => {
                    if (ethValue && parseFloat(ethValue) > 0) {
                      setPendingTx(true)
                      var tx: any = await onJoinPool(ethValue, stakedAmount, currentLaunchadContractInstance(network))
                      setPendingTx(false)
                      if (tx) {
                        setSuccessTx(true)
                        onPresentSuccess()
                        reset()
                      } else {
                        onPresentError()
                      }
                    }
                  }}
                >
                  {startAt * 1000 > new Date().getTime() && (
                    <Countdown
                      date={new Date(startAt * 1000)}
                      renderer={renderer}
                    />
                  )}
                </Button>
              </StyledSwapWrap>
            </StyledBox>
          </StyledInfoSolid>
          <Spacer size="md" />

          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledSwapWrap>
                {claimAt * 1000 > new Date().getTime() ? (
                  <StyledTitle>
                    Reward tokens will be available to harvest in approx -{' '}
                    <Countdown
                      date={new Date(claimAt * 1000)}
                      renderer={renderer}
                    />
                  </StyledTitle>
                ) : (

                  <StyledCenterRow>
                    {new BigNumber(tokenPurchased).gt(0) ? <StyledInfoLabel1 className="mt-4">
                      Reward tokens are now available to harvest
                    </StyledInfoLabel1> : ""}

                  </StyledCenterRow>
                )}

                <StyledInputContainer>
                  <StyledCenterRow>
                    <StyledHarvestAmount>
                      {getRemainTokensToClaim(tokenPurchased, percentClaimed)} {tokenSymbol}
                    </StyledHarvestAmount>
                  </StyledCenterRow>
                </StyledInputContainer>
                <Spacer size="md" />
                <Button
                  disabled={
                    purchasedAmount <= 0 ||
                    claimAt * 1000 > new Date().getTime() ||
                    pendingHarvestTx ||
                    new BigNumber(percentClaimed).gte(100)
                  }
                  text={
                    pendingHarvestTx
                      ? 'Pending Confirmation'
                      : claimAt * 1000 <= new Date().getTime()
                        ? new BigNumber(percentClaimed).gte(100)
                          ? 'Already claimed'
                          : 'Harvest'
                        : undefined
                  }
                  onClick={async () => {
                    if (tokenPurchased > 0) {
                      setPendingHarvestTx(true)
                      var tx: any = await onHarvest(currentLaunchadContractInstance(network))
                      setPendingHarvestTx(false)
                      if (tx) {
                        console.log('harvest ' + tx)
                        setSuccessHarvestTx(true)
                        // onPresentSuccessHarvest()
                        reset()
                      } else {
                        onPresentError()
                      }
                    }
                  }}
                >
                  {claimAt * 1000 > new Date().getTime() && (
                    <Countdown
                      date={new Date(claimAt * 1000)}
                      renderer={renderer}
                    />
                  )}
                </Button>
                <StyledCenterRow>
                  {claimAt * 1000 > new Date().getTime() || new BigNumber(tokenPurchased).lte(0) ? "" : (<StyledInfoLabel className="mt-4">

                    Remain tokens to claim {getRemainTokenPercentToClaim(percentClaimed)}%
                  </StyledInfoLabel>)}

                </StyledCenterRow>

              </StyledSwapWrap>
            </StyledBox>
          </StyledInfoSolid>
          <Spacer size="md" />

          {!!history.length && (
            <>
              <StyledInfoSolid>
                <StyledBox className="col-10">
                  <StyledTable>
                    <StyledTableHead>
                      <StyledTableRow>
                        <StyledTableHeadCell>History</StyledTableHeadCell>
                      </StyledTableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                      {history.map((item) => (
                        <StyledTableRow>
                          <StyledTableBodyCell>
                            <StyledTableText>
                              <StyledTableLabel>
                                {item.amount} {item.symbol}
                              </StyledTableLabel>
                              <StyledTableValue>
                                {item.status} - {item.joinDate}
                              </StyledTableValue>
                            </StyledTableText>
                          </StyledTableBodyCell>
                        </StyledTableRow>
                      ))}
                    </StyledTableBody>
                  </StyledTable>
                </StyledBox>
              </StyledInfoSolid>
              <Spacer size="md" />
            </>
          )}
        </StyledInfoWrap>
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

const StyledSwapWrap = styled.div`
  padding: 15px;
`

const StyledInputContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: #ffffff;
  border: 1px solid #333131;
  border-radius: 10px;
  padding: 8px;
  font-size: 13px;
`

const StyledRow = styled.div`
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  // -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  // -ms-flex-align: center;
  align-items: center;
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

const StyledInputRow = styled.div`
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  // -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  // -ms-flex-align: center;
  align-items: center;
  margin-top: 8px;
`

const StyledTitle = styled.div`
  text-align: start;
  width: 100%;
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
`

const StyledHarvestAmount = styled.div`
  text-align: center;
  font-size: 24px;
`

const StyledLabel = styled.div``

const StyledInfoLabel1 = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 10px;
  }
`

const StyledInfoLabel = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 13px;
  color: #ffff4e;
  @media (max-width: 767px) {
    font-size: 10px;
  }
`

const StyledInput = styled.input`
  font-size: 24px;
  color: #ffffff;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: transparent;
  font-weight: 300;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin-right: 12px;
`

const StyledMaxButton = styled.button`
  font-size: 10px;
  padding: 0 10px;
  height: 20px;
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #e0077d;
  border: solid 1px #e0077d;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 12px;
`

const StyledTokenGroup = styled.div`
  // display: -webkit-box;
  // display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  // -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  // -ms-flex-align: center;
  align-items: center;
`

const StyledTokenIconWrap = styled.div`
  height: 30px;
  width: 30px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
    0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`

const StyledTokenIcon = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  font-style: italic;
  vertical-align: middle;
`

const StyledTokenIconSvg = styled.svg`
  width: 100%;
  height: auto;
  max-width: 100%;
  font-style: italic;
  vertical-align: middle;
`

const StyledTokenSymbol = styled.span`
  min-width: 35px;
  text-align: end;
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

const StyledInfoTitle = styled.div`
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
const StyledTableLabel = styled.span``
const StyledTableValue = styled.span`
  text-align: right;
  color: #ffffff;
`

export default JoinLaunchpad

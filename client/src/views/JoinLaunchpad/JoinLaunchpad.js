import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import MaterialButton from '../../components/Button/MaterialButton'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useLaunchpad from '../../hooks/useLaunchpad'
import useModal from '../../hooks/useModal'
import { BigNumber } from '../../pbr'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  getProgress,
  getHistory,
  getPurchasesAmount,
  getIsWhitelist,
  getUserStakingData,
  getUserInfo,
  fromWei,
  formatFloatValue,
  getPoolClaimTimeArr,
  verifyCaptcha,
  getMaxAllocation,
  getPurchaseStats,
  formattedNetworkName,
  getNetworkName,
  formatCurrency,
} from '../../pbr/utils'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import ModalError from '../../components/ModalError'
import ModalSuccess from '../../components/ModalSuccess'
import ModalSuccessHarvest from '../../components/ModalSuccessHarvest'

import {
  bscNetwork,
  ethereumNetwork,
  getPoolId,
  GUARANTEED,
  harmonyNetwork,
  moonriverNetwork,
  networkToChain,
  polygonNetwork,
  tierConditions,
  WHITELIST,
} from '../../pbr/lib/constants'
import { isEqual, networkIcon, networkSymbol } from '../../pbr/helpers'
import useWallet from '../../hooks/useWallet'
import useEthBalance from '../../hooks/useEthBalance'
import {
  TransactionState,
  useJoinPoolCallback,
} from '../../hooks/useJoinPoolCallback'
import { useHarvestCallback } from '../../hooks/useHarvestCallback'

const JoinLaunchpad = () => {
  const { launchpadId, poolId } = useParams()

  const launchpad = useLaunchpad(launchpadId, poolId)
  const {
    pid,
    name,
    symbol,
    icon,
    description,
    introduce,
    website,
    twitter,
    telegram,
    whitepaper,
    lpExplorer,
    lpAddresses,
    tokenExplorer,
    tokenSymbol,
    tokenAddresses,
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
  } = launchpad

  const { account, isActive, chainId } = useWallet()

  const lpPoolId = useMemo(() => {
    return launchpad?.poolId
  }, [launchpad])

  const poolChain = useMemo(() => {
    return networkToChain?.[network]
  }, [network])

  const lpAddress = useMemo(() => {
    if (!poolChain) {
      return null
    }
    return lpAddresses?.[parseInt(poolChain)]
  }, [lpAddresses, poolChain])

  const tokenAddress = useMemo(() => {
    if (!poolChain) {
      return null
    }

    return tokenAddresses?.[parseInt(poolChain)]
  }, [tokenAddresses, poolChain])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const ethBalance = useEthBalance()

  const [progress, setProgress] = useState()
  const [isWhitelist, setIsWhitelist] = useState(false)
  const [ethValue, setETHValue] = useState('0')
  const [tokenValue, setTokenValue] = useState('') //max output purchase token based on the ratio
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingHarvestTx, setPendingHarvestTx] = useState(false)
  const [successTx, setSuccessTx] = useState(false)
  const [successHarvestTx, setSuccessHarvestTx] = useState(false)
  const [errorTxt, setErrorTxt] = useState('')
  const [txhash, setTxhash] = useState('')

  // const [history, setHistory] = useState<JoinHistory[]>([])
  const [purchasedAmount, setPurchasedAmount] = useState(0)
  const [stakedAmount, setStakedAmount] = useState('0') // user total staked amount across the network: ethereum+matic
  const [tokenPurchased, setTokenPurchased] = useState('') // token purchase by the user so far
  const [percentClaimed, setPercentClaimed] = useState(0) // percent token claimed/harvested by the user so far
  const [numberClaimed, setNumberClaimed] = useState(0) // number of times users has claimed/harvested so far
  const [recentClaimTime, setRecentClaimTime] = useState(claimAt)
  const [totalRewardClaims, setTotalRewardClaims] = useState(1)
  const { handleJoinPool, joinTrxStatus, resetJoinTrxState } =
    useJoinPoolCallback()
  // const { onHarvest } = useHarvest()

  const { handleHarvest, harvestTrxStatus, resetHarvestTrxState } =
    useHarvestCallback()
  const [loading, setLoading] = useState(true)
  const [maxGuaranteed, setMaxGuaranteed] = useState('0')
  const [purchaseStats, setPurchaseStats] = useState(null)
  // const [dataLoading, setDataLoading] = useState({ state: false, message: '' });

  const [captchaVerified, setCaptchaVerified] = useState(true)
  const [harvestDistribution, setHarestDistribution] = useState([])

  const recaptchaRef = React.useRef()

  const getCurrentClaimTime = (_userInfoData, _claimTimeArr) => {
    if (!_userInfoData) {
      return 0
    }

    if (
      _claimTimeArr &&
      _claimTimeArr.length > 1 &&
      parseInt(_userInfoData?.harvestInfo?.NumberClaimed?.toString()) <
        _claimTimeArr.length
    ) {
      return _claimTimeArr[
        parseInt(_userInfoData?.harvestInfo?.NumberClaimed?.toString())
      ]
    } else {
      return claimAt
    }
  }

  const parseTokenPurchased = (_userInfoObject) => {
    if (!_userInfoObject) {
      return '0'
    }
    return fromWei(_userInfoObject?.userInfo?.[1]?.toString())
  }

  const parseNumberClaimed = (_userInfoObject) => {
    if (!_userInfoObject) {
      return '0'
    }
    return _userInfoObject?.harvestInfo?.NumberClaimed?.toString()
  }

  const parsePercentClaimed = (_userInfoObject) => {
    if (!_userInfoObject) {
      return '0'
    }

    return _userInfoObject?.userInfo?.toString()
      ? _userInfoObject?.userInfo?.[3]?.toString()
      : 0
  }

  useEffect(() => {
    if (joinTrxStatus.status === TransactionState.COMPLETED) {
      setSuccessTx(true)
      onPresentSuccess()
      setPendingTx(false)
      reset()
    } else if (joinTrxStatus.status === TransactionState.FAILED) {
      setPendingTx(false)
      onPresentError()
    }
  }, [joinTrxStatus])

  useEffect(() => {
    if (harvestTrxStatus.status === TransactionState.COMPLETED) {
      setPendingHarvestTx(false)
      setSuccessHarvestTx(true)
      onPresentSuccessHarvest()
      reset()
    } else if (harvestTrxStatus.status === TransactionState.FAILED) {
      setPendingHarvestTx(false)
      onPresentError()
    }
  }, [harvestTrxStatus])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const [claimTimeArr, claimDistribution] = getPoolClaimTimeArr(
        poolId,
        network,
      )
      setHarestDistribution(!claimDistribution ? [] : claimDistribution)

      if (access === GUARANTEED) {
        // fetch max allocation for guaranteed pools
        const _max = await getMaxAllocation(
          lpAddress,
          lpPoolId,
          access,
          account,
          network,
        )
        setMaxGuaranteed(fromWei(_max))
      }

      const [
        newIsWhitelist,
        newProgress,
        newPurchasedAmount,
        stakedTokens,
        userInfoData,
      ] = await Promise.all([
        getIsWhitelist(
          lpAddress,
          lpPoolId,
          access,
          stakedAmount,
          account,
          network,
        ),

        getProgress(lpAddress, lpPoolId, access, startAt, endAt, network),
        getPurchasesAmount(lpAddress, lpPoolId, access, account, network),
        getUserStakingData(account),
        getUserInfo(lpAddress, lpPoolId, access, account, network),
      ])
      const newPurchaseStats = await getPurchaseStats(
        name,
        newPurchasedAmount,
        ratio,
        network,
      )
      setLoading(false)
      // setDataLoading({ state: false, message: "" });

      // console.log('process.env.REACR_APP_CAPTCHA_KEY', process.env.REACR_APP_CAPTCHA_KEY)
      // console.log('process REACT_APP_POLYGON_TESTNET_NODE', process.env.REACT_APP_POLYGON_TESTNET_NODE)
      // const bscUserInfo = await getUserInfoBsc(lpBscContract, pid, account)
      // console.log('ethTest: isWhiteList  ', newIsWhitelist)

      // console.log('ethTest newProgress--->  ', newProgress?.toString())
      console.log('ethTest: newPurchasedAmount--->  ', { newPurchasedAmount })
      // console.log('ethTest: setStakedAmount   ', stakedTokens)
      // console.log('ethTest: userInfoData--->  ', userInfoData)
      // console.log('ethTest: claimTimeArr  ', claimTimeArr)

      setIsWhitelist(newIsWhitelist)
      setProgress(newProgress)
      setPurchasedAmount(newPurchasedAmount)
      setStakedAmount(stakedTokens)
      setTokenPurchased(parseTokenPurchased(userInfoData))
      setPercentClaimed(parsePercentClaimed(userInfoData))
      setNumberClaimed(parseNumberClaimed(userInfoData))
      setRecentClaimTime(getCurrentClaimTime(userInfoData, claimTimeArr))
      setTotalRewardClaims(
        claimTimeArr && claimTimeArr.length > 0 ? claimTimeArr.length : 1,
      )
      setPurchaseStats(newPurchaseStats)
      //set current claimAt time
    }
    if (pid >= 0) {
      fetchData()
    }
  }, [
    isWhitelist,
    account,
    pid,
    lpPoolId,
    stakedAmount,
    tokenPurchased,
    percentClaimed,
    numberClaimed,
    recentClaimTime,
    totalRewardClaims,
    setIsWhitelist,
    setProgress,
    setPurchasedAmount,
    setStakedAmount,
    setTokenPurchased,
    setPercentClaimed,
    setNumberClaimed,
    setRecentClaimTime,
    setTotalRewardClaims,
  ])

  const renderer = (countdownProps) => {
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
    (e) => {
      var newTokenValue = parseFloat(e.currentTarget.value) * ratio
      setETHValue(e.currentTarget.value)
      setTokenValue(newTokenValue.toString())
    },
    [ratio, setETHValue, setTokenValue],
  )

  const onChangeToken = useCallback(
    (e) => {
      var newETHValue = parseFloat(e.currentTarget.value) / ratio
      setTokenValue(e.currentTarget.value)
      setETHValue(newETHValue.toString())
    },
    [ratio, setTokenValue, setETHValue],
  )

  const getMaxValue = () => {
    const _stakedAmountInBigNumWei = new BigNumber(
      fromWei(stakedAmount?.toString()),
    )
    let maxValue = 0
    if (
      _stakedAmountInBigNumWei.gte(tierConditions.maxTier1.min) &&
      _stakedAmountInBigNumWei.lt(tierConditions.maxTier1.max)
    ) {
      maxValue = maxTier1
    } else if (
      _stakedAmountInBigNumWei.gte(tierConditions.maxTier2.min) &&
      _stakedAmountInBigNumWei.lt(tierConditions.maxTier2.max)
    ) {
      maxValue = maxTier2
    } else if (_stakedAmountInBigNumWei.gte(tierConditions.maxTier3.min)) {
      maxValue = maxTier3
    }
    return maxValue
  }

  const onMax = useCallback(async () => {
    let _max = 0
    if (access === WHITELIST) {
      _max = maxWhitelistPurchase
    } else if (access === GUARANTEED) {
      _max = Number(maxGuaranteed)
    } else {
      _max = access === 'Public' ? maxTier2 : getMaxValue()
    }

    let newTokenValue = new BigNumber(_max).multipliedBy(ratio).toString()
    setETHValue(_max.toString())
    setTokenValue(newTokenValue.toString())
    // console.log({ newTokenValue, tokenPurchased, ratio, _max })
    // console.log({ value1: new BigNumber(newTokenValue).toFixed(3).toString(), value2: new BigNumber(tokenPurchased).toFixed(3).toString() })
  }, [ethBalance, ratio, setTokenValue, setETHValue, getMaxValue])

  const isButtonDisable = () => {
    const _max = access === 'Public' ? maxTier2 : getMaxValue()

    const flag1 =
      startAt * 1000 > new Date().getTime() ||
      endAt * 1000 <= new Date().getTime() ||
      !isWhitelist ||
      progress == new BigNumber('100') ||
      pendingTx ||
      !ethValue ||
      !tokenValue ||
      isEqual(tokenPurchased, tokenValue)

    if (access === 'Whitelist') {
      return (
        flag1 ||
        parseFloat(ethValue) <= 0 ||
        parseFloat(ethValue) > maxWhitelistPurchase
      )
    } else if (access === 'Public') {
      return (
        flag1 ||
        parseFloat(ethValue) <= 0 ||
        parseFloat(ethValue) > _max ||
        parseFloat(ethValue) < min
      )
    } else if (access === GUARANTEED) {
      return (
        flag1 ||
        parseFloat(ethValue) <= 0 ||
        parseFloat(ethValue) > Number(maxGuaranteed)
      )
    } else {
      return flag1 || parseFloat(ethValue) < min || parseFloat(ethValue) > _max
    }
  }

  const getJoinButtonText = () => {
    const _max = access === 'Public' ? maxTier2 : getMaxValue()

    // console.log('getJoinButtonText ', { ethValue: parseFloat(ethValue), maxWhitelistPurchase, _max, min, stakedAmount, flag: startAt * 1000 <= new Date().getTime() })

    //time check
    if (endAt * 1000 <= new Date().getTime()) {
      return 'Ended'
    }

    if (pendingTx) {
      return 'Pending Confirmation'
    }

    if (
      access === 'Private' &&
      new BigNumber(stakedAmount).lt(tierConditions.maxTier1.min)
    ) {
      return 'You have not participated in the staking'
    }

    if (!isWhitelist) {
      return startAt * 1000 <= new Date().getTime()
        ? 'You are not whitelisted'
        : 'Pool not started yet'
    }

    if (startAt * 1000 <= new Date().getTime()) {
      if (access === 'Whitelist') {
        return parseFloat(ethValue) > 0 &&
          parseFloat(ethValue) <= maxWhitelistPurchase
          ? isEqual(tokenPurchased, tokenValue)
            ? 'Already Purchased'
            : 'Join Pool'
          : `Max:  ${maxWhitelistPurchase}  ${networkSymbol(network)}`
      } else if (access === 'Public') {
        return parseFloat(ethValue) > 0 &&
          parseFloat(ethValue) <= _max &&
          parseFloat(ethValue) >= min
          ? isEqual(tokenPurchased, tokenValue)
            ? 'Already Purchased'
            : 'Join Pool'
          : `Min: ${min}   ${networkSymbol(
              network,
            )}   - Max:  ${_max}  ${networkSymbol(network)}`
      } else if (access === GUARANTEED) {
        return parseFloat(ethValue) > 0 &&
          parseFloat(ethValue) <= Number(maxGuaranteed)
          ? isEqual(tokenPurchased, tokenValue)
            ? 'Already Purchased'
            : 'Join Pool'
          : `Max:  ${maxGuaranteed}  ${networkSymbol(network)}`
      } else {
        return parseFloat(ethValue) >= min && parseFloat(ethValue) <= _max
          ? isEqual(tokenPurchased, tokenValue)
            ? 'Already purchased'
            : 'Join pool'
          : `Min: ${min}   ${networkSymbol(
              network,
            )}   - Max:  ${_max}  ${networkSymbol(network)}`
      }
    } else {
      return progress == new BigNumber('100') ? 'Ended' : undefined
    }
  }

  const reset = useCallback(async () => {
    // const newHistory = await getHistory(account)
    const newProgress = await getProgress(lpAddress, lpPoolId, access, network)
    const newPurchasedAmount = await getPurchasesAmount(
      lpAddress,
      lpPoolId,
      access,
      account,
      network,
    )
    const userInfoData = await getUserInfo(
      lpAddress,
      lpPoolId,
      access,
      account,
      network,
    )

    setProgress(newProgress)
    setPurchasedAmount(newPurchasedAmount)
    setETHValue('')
    setTokenValue('')
    setTokenPurchased(
      userInfoData.userInfo?.toString()
        ? fromWei(userInfoData.userInfo?.[1]?.toString())
        : '0',
    )
    setPercentClaimed(
      userInfoData?.userInfo?.toString()
        ? userInfoData?.userInfo?.[3]?.toString()
        : 0,
    )
  }, [
    account,
    lpPoolId,
    pid,
    setProgress,
    setPurchasedAmount,
    setTokenValue,
    setETHValue,
    setTokenPurchased,
    setPercentClaimed,
  ])

  const [onPresentSuccess, onDismiss] = useModal(
    <ModalSuccess
      onDismiss={onDismiss}
      amount={tokenValue}
      symbol={name}
      txhash="4f95c6770c75ddd3388f525"
      text="purchase"
    />,
  )

  const [onPresentError, onDismiss2] = useModal(
    <ModalError
      onDismiss={onDismiss2}
      text="Transaction failed"
      txhash={txhash}
    />,
  )

  const [onPresentSuccessHarvest] = useModal(
    <ModalSuccessHarvest
      amount={tokenPurchased.toString()}
      symbol={name}
      txhash={txhash}
      text="harvest"
    />,
  )
  const handleClose = () => {
    setSuccessHarvestTx(false)
  }

  const getRemainTokenPercentToClaim = (_percentClaimed) => {
    if (
      new BigNumber(100).minus(_percentClaimed).eq(0) ||
      new BigNumber(100).minus(_percentClaimed).gt(1)
    ) {
      return new BigNumber(100).minus(_percentClaimed).toFixed(0).toString()
    }
    return new BigNumber(100).minus(_percentClaimed).toFixed(3).toString()
  }

  const getRemainTokensToClaim = (_tokenPurchased, _percentClaimed) => {
    if (!_tokenPurchased) {
      return 0
    }
    if (new BigNumber(_percentClaimed).eq(0)) {
      return _tokenPurchased
    }
    if (new BigNumber(_tokenPurchased).lt(1)) {
      return new BigNumber(
        (parseFloat(_tokenPurchased) / 100) * (100 - _percentClaimed),
      )
        .toFixed(4)
        .toString()
    }
    return new BigNumber(
      (parseFloat(_tokenPurchased) / 100) * (100 - _percentClaimed),
    )
      .toFixed(2)
      .toString()
  }

  const getPercent = (value, total) => {
    return parseFloat(
      new BigNumber((value / total) * 100).toFixed(2).toString(),
    )
  }
  const claimStatusText = (
    _recentClaimTime,
    _numberClaimed,
    _totalRewardClaims,
  ) => {
    if (_totalRewardClaims > 1) {
      if (_recentClaimTime * 1000 > new Date().getTime()) {
        return (
          <StyledTitle>
            {harvestDistribution.length > 0
              ? harvestDistribution[_numberClaimed]
              : getPercent(1, _totalRewardClaims)}
            % Reward tokens will be available to harvest in approx -{' '}
            <Countdown
              date={new Date(_recentClaimTime * 1000)}
              renderer={renderer}
            />
          </StyledTitle>
        )
      } else {
        return (
          <StyledCenterRow>
            {new BigNumber(tokenPurchased).gt(0) ? (
              <StyledInfoLabel1 className="mt-4">
                Reward tokens are now available to harvest
              </StyledInfoLabel1>
            ) : (
              ''
            )}
          </StyledCenterRow>
        )
      }
    } else {
      if (_recentClaimTime * 1000 > new Date().getTime()) {
        return (
          <StyledTitle>
            Reward tokens will be available to harvest in approx -{' '}
            <Countdown
              date={new Date(_recentClaimTime * 1000)}
              renderer={renderer}
            />
          </StyledTitle>
        )
      } else {
        return (
          <StyledCenterRow>
            {new BigNumber(tokenPurchased).gt(0) ? (
              <StyledInfoLabel1 className="mt-4">
                Reward tokens are now available to harvest
              </StyledInfoLabel1>
            ) : (
              ''
            )}
          </StyledCenterRow>
        )
      }
    }
  }

  const handleCaptchaVerification = async (value) => {
    try {
      const verificationStatus = await verifyCaptcha(value)

      // console.log(verificationStatus?.['success'])

      if (verificationStatus?.['success'] === true) {
        setCaptchaVerified(true)
      }

      // console.log('captcha verified ', verificationStatus)
    } catch (error) {
      console.log('handleCaptchaVerification', error)
    }
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
        <ModalSuccessHarvest
          loading={loading}
          onDismiss={handleClose}
          symbol={name}
          open={successHarvestTx}
          amount={tokenPurchased.toString()}
          percent={percentClaimed}
          text={'harvest'}
          txhash={txhash}
        />
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
          {access === 'Private' && (
            <StyledBox className="col-10">
              <StyledCenterRow>
                <StyledInfoLabel>
                  Your staked amount:{' '}
                  {formatFloatValue(fromWei(stakedAmount?.toString())) + ' PBR'}
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
                  Your Allocation:{' '}
                  {maxGuaranteed + ' ' + networkSymbol(network)}
                </StyledInfoLabel>
              </StyledCenterRow>
            </StyledBox>
          )}
          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledSwapWrap>
                <StyledInputContainer>
                  <StyledRow>
                    <StyledLabel>INPUT</StyledLabel>
                    <StyledLabel>
                      Your Wallet Balance: {formatCurrency(ethBalance)}
                    </StyledLabel>
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
                            src={networkIcon(network)}
                            alt="icon"
                          ></StyledTokenIcon>
                        </StyledTokenIconWrap>
                        <StyledTokenSymbol>
                          {networkSymbol(network)}
                        </StyledTokenSymbol>
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

                {!captchaVerified ? (
                  <StyledCenterRow>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="normal"
                      type="image"
                      sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY?.split(
                        '',
                      )
                        ?.reverse()
                        ?.join('')}
                      onChange={handleCaptchaVerification}
                    />
                  </StyledCenterRow>
                ) : (
                  <MaterialButton
                    disabled={isButtonDisable()}
                    onClick={async () => {
                      if (ethValue && parseFloat(ethValue) > 0) {
                        if (chainId !== poolChain) {
                          alert(
                            `This pool works on ${network} Network. Please switch your network to ${network}`,
                          )
                          return
                        }
                        setPendingTx(true)
                        var tx = await handleJoinPool(
                          lpPoolId,
                          access,
                          ethValue,
                          stakedAmount,
                          lpAddress,
                          network,
                          symbol,
                        )
                        // setPendingTx(false)
                        // if (tx) {
                        //   setSuccessTx(true)
                        //   onPresentSuccess()
                        //   reset()
                        // } else {
                        //   onPresentError()
                        // }
                      }
                    }}
                  >
                    <div className="d-flex flex-column justify-content-around">
                      <div style={{ paddingRight: 10 }}>
                        {getJoinButtonText()}
                      </div>
                      <div style={{ color: '#ffee58' }}>
                        {startAt * 1000 > new Date().getTime() && (
                          <Countdown
                            date={new Date(startAt * 1000)}
                            renderer={renderer}
                          />
                        )}
                      </div>
                    </div>
                  </MaterialButton>
                )}
              </StyledSwapWrap>
            </StyledBox>
          </StyledInfoSolid>
          <Spacer size="md" />
          <StyledInfoSolid>
            <StyledBox className="col-10">
              <StyledSwapWrap>
                {/* {claimAt * 1000 > new Date().getTime() ? (
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
                )} */}

                {new BigNumber(tokenPurchased).gt(0) &&
                  claimStatusText(
                    recentClaimTime,
                    numberClaimed,
                    totalRewardClaims,
                  )}

                <StyledInputContainer>
                  <StyledCenterRow>
                    <StyledHarvestAmount>
                      {getRemainTokensToClaim(tokenPurchased, percentClaimed)}{' '}
                      {tokenSymbol}
                    </StyledHarvestAmount>
                  </StyledCenterRow>
                </StyledInputContainer>
                <Spacer size="md" />
                <MaterialButton
                  disabled={
                    new BigNumber(
                      getRemainTokensToClaim(tokenPurchased, percentClaimed),
                    ).lte(0) ||
                    recentClaimTime * 1000 > new Date().getTime() ||
                    pendingHarvestTx ||
                    new BigNumber(percentClaimed).gte(100) ||
                    claimAt === 0
                  }
                  onClick={async () => {
                    if (new BigNumber(tokenPurchased).gt(0)) {
                      // const _networkName = formattedNetworkName(network)

                      if (chainId !== poolChain) {
                        alert(
                          `This pool works on ${network} Network. Please switch your network to ${network}`,
                        )
                        return
                      }

                      setPendingHarvestTx(true)
                      var tx = await handleHarvest(
                        lpPoolId,
                        access,
                        lpAddress,
                        network,
                      )
                      // setPendingHarvestTx(false)
                      // if (tx) {
                      //   console.log('harvest ' + tx)
                      //   setSuccessHarvestTx(true)
                      //   // onPresentSuccessHarvest()
                      //   reset()
                      // } else {
                      //   onPresentError()
                      // }
                    }
                  }}
                >
                  {pendingHarvestTx
                    ? 'Pending Confirmation'
                    : recentClaimTime * 1000 <= new Date().getTime()
                    ? new BigNumber(percentClaimed).gte(100)
                      ? 'Already claimed'
                      : 'Harvest'
                    : undefined}
                  {new BigNumber(tokenPurchased).gt(0) &&
                    recentClaimTime * 1000 > new Date().getTime() && (
                      <Countdown
                        date={new Date(recentClaimTime * 1000)}
                        renderer={renderer}
                      />
                    )}
                </MaterialButton>
                <StyledCenterRow>
                  {claimAt * 1000 > new Date().getTime() ||
                  new BigNumber(tokenPurchased).lte(0) ? (
                    ''
                  ) : (
                    <StyledInfoLabel className="mt-4">
                      Remain tokens to claim{' '}
                      {getRemainTokenPercentToClaim(percentClaimed)}%
                    </StyledInfoLabel>
                  )}
                </StyledCenterRow>
              </StyledSwapWrap>
            </StyledBox>
          </StyledInfoSolid>
          <Spacer size="md" />
          {/* {!!history.length && (
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
          )} */}
        </StyledInfoWrap>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <h6 style={{ color: 'white', textAlign: 'center', fontWeight: 600 }}>
            Purchase History
          </h6>
          <div className="d-flex justify-content-center w-100 mb-3">
            <div
              className="text-center d-flex justify-content-center"
              style={{
                width: 'fit-content',
                border: '1px solid #454545',
                borderRadius: 5,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <div style={{ width: window.innerWidth > 600 ? 200 : '30%' }}>
                <p style={{ color: '#bdbdbd' }}>Token purchased</p>
                <h6 style={{ color: 'yellow', fontWeight: 600, marginTop: 4 }}>
                  {formatCurrency(purchasedAmount?.toString(), false, 4)}{' '}
                  {tokenSymbol}
                </h6>
              </div>
              <div style={{ width: window.innerWidth > 600 ? 200 : '30%' }}>
                {' '}
                <p style={{ color: '#bdbdbd' }}>Amount (USD)</p>
                <h6 style={{ color: 'yellow', fontWeight: 600, marginTop: 4 }}>
                  {!purchaseStats ? 0 : purchaseStats?.amountUsd}$
                </h6>
              </div>
              <div style={{ width: window.innerWidth > 600 ? 200 : '30%' }}>
                {' '}
                <p style={{ color: '#bdbdbd' }}>Profit/Loss (%)</p>
                {purchaseStats && (
                  <>
                    {new BigNumber(purchaseStats?.profit).gt(0) && (
                      <h6
                        style={{
                          color: 'green',
                          fontWeight: 600,
                          marginTop: 4,
                        }}
                      >
                        {purchaseStats?.profit}%
                      </h6>
                    )}
                    {new BigNumber(purchaseStats?.profit).eq(0) && (
                      <h6
                        style={{
                          color: 'yellow',
                          fontWeight: 600,
                          marginTop: 4,
                        }}
                      >
                        {!purchaseStats?.profit ? 0 : purchaseStats?.profit}%
                      </h6>
                    )}
                    {new BigNumber(purchaseStats?.profit).lt(0) && (
                      <h6
                        style={{ color: 'red', fontWeight: 600, marginTop: 4 }}
                      >
                        {purchaseStats?.profit}%
                      </h6>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
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

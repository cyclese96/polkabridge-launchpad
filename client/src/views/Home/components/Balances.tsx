import BigNumber from 'bignumber.js'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import PolkaBridgeIcon from '../../../components/PolkaBridgeIcon'
import useTokenBalance from '../../../hooks/useTokenBalance'

import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf'
import useTokenTotalSupply from '../../../hooks/useTokenTotalSupply'
import usePolkaBridge from '../../../hooks/usePolkaBridge'
import { getPolkaBridgeAddress } from '../../../pbr/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import PolkaBridge from '../../../assets/img/balance.png'
import PolkaBridges from '../../../assets/img/supply.png'

const Balances = memo(() => {
  const pbr = usePolkaBridge()
  // const totalSupply = useTokenSupply(getPolkaBridgeAddress(pbr))
  let circulatingSupply = useTokenTotalSupply(getPolkaBridgeAddress(pbr))
  const lockedBalance = useTokenBalanceOf(getPolkaBridgeAddress(pbr), "0x6a97eedd28becb3590c19dead324e0fc203dd2a6").plus(useTokenBalanceOf(getPolkaBridgeAddress(pbr), "0x624b06b8452c9bdb8d558b591bf1b6825a133937"))
  const pbrBalance = useTokenBalance(getPolkaBridgeAddress(pbr))
  circulatingSupply = circulatingSupply.minus(lockedBalance)
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <PolkaBridgeIcon /> */}
              <img src={PolkaBridge} height="50" alt="PBR Balance"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your Available PBR Balance" />
                <Value
                  value={!!account ? getBalanceNumber(pbrBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
     
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalance>
            <img height="50px" src={PolkaBridges} alt="Total PBR Supply"/>
            <Spacer />
            <div style={{ flex: 1 }}>
              <Label text="PBR Circulating Supply" />
              <Value
                value={circulatingSupply ? getBalanceNumber(circulatingSupply) : '~'}
              />
            </div>
          </StyledBalance>
        </CardContent>
        
      </Card>
    </StyledWrapper>
  )
})

const Footnote = styled.div`
  font-size: 14px;
  padding: 5px 20px;
  color: ${(props) => props.theme.color.grey[100]};
  background-color: ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  float: right;
  color: ${(props) => props.theme.color.white};
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances

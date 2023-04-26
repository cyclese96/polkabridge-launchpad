import React from 'react'
import styled from 'styled-components'
import usePendingTransactions from '../../../hooks/usePendingTransactions'
import MaterialButton from '../../Button/MaterialButton'
import useWallet from '../../../hooks/useWallet'

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet()
  const pendingTransactions = usePendingTransactions()
  return (
    <>
      {!!account && !!pendingTransactions.length ? (
        <StyledTxButton>
          <MaterialButton onClick={() => {}}>
            <a
              href={`https://etherscan.io/address/${account}`}
            >{`${pendingTransactions.length} Transaction(s)`}</a>{' '}
          </MaterialButton>
        </StyledTxButton>
      ) : null}
    </>
  )
}

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`

export default TxButton

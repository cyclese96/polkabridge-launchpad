import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContentWallet from '../../CardContentWallet'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContentWallet>
      <Button variant="transparent" onClick={onConnect} margin="5px 0" justify="space-between">
        <CardTitle text={title} />
        {icon}
      </Button>
    </CardContentWallet>
  </Card>
)

export default WalletCard

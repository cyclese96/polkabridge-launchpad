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
      <div
        onClick={onConnect}
        className="d-flex justify-content-between p-2"
        style={{ marginLeft: 10 }}
      >
        <CardTitle text={title} />
        {icon}
      </div>
    </CardContentWallet>
  </Card>
)

export default WalletCard

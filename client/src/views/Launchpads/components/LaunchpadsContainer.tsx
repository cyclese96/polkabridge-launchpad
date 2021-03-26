import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Logo from '../../../assets/img/balance.png'
import PageHeader from '../../../components/PageHeader'
import Launchpad from '../../Launchpad'
import JoinLaunchpad from '../../JoinLaunchpad'
import LaunchpadCards from './LaunchpadCards'


const LaunchpadsContainer: React.FC = () => {
  const { path } = useRouteMatch()
  // const { account } = useWallet()
  // const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  return <>
    <Route exact path={path}>
      <PageHeader
        icon={<img src={Logo} height="120" />}
        subtitle="Join hot IDO projects on PolkaBridge."
        title="Select Your Favorite Pool"
      />
      <LaunchpadCards />
    </Route>
    <Route path={`${path}/view/:launchpadId`}>
      <Launchpad />
    </Route>
    <Route path={`${path}/join/:launchpadId`}>
      <JoinLaunchpad />
    </Route>
  </>
}

export default LaunchpadsContainer

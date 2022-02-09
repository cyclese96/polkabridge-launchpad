import React, { useCallback, useEffect, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import LaunchpadsProvider from './contexts/Launchpads'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import PolkaBridgeProvider from './contexts/PolkaBridgeProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Launchpads from './views/Launchpads'
import Home from './views/Home'
import config from './config'
import { getCurrentAccount, getCurrentNetworkId } from './pbr/utils'
import useNetwork from './hooks/useNetwork'
import { isMobile } from 'react-device-detect'
import Navbar from './components/TopBar/components/Navbar'
import Rules from './views/Rules/Rules'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      {/* <Router> */}
      {/* <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} /> */}
      <Navbar />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route exact path="/rules">
          <Rules />
        </Route>
        <Route path="/launchpads">
          <Launchpads />
        </Route>
      </Switch>
      {/* </Router> */}
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  const { chainId, changeNetwork, setConnected, status } = useNetwork()

  useEffect(() => {
    ;(async () => {
      if (isMobile) {
        //enable window.ethereum for mobile device
        const account = await getCurrentAccount()
      }
      // console.log('prev  id', chainId)
      const _id = await getCurrentNetworkId()
      // console.log('testConnect:  init with network id ', _id)
      changeNetwork(_id)
      if (Number(_id) !== Number(chainId)) {
        if (isMobile) {
          window.location.reload()
        }
      }
      localStorage.chainId = _id
    })()
  }, [chainId, changeNetwork])
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl: config.ankrEthereumRpc },
        }}
      >
        <PolkaBridgeProvider>
          <TransactionProvider>
            <LaunchpadsProvider>
              <Router>
                <ModalsProvider>{children}</ModalsProvider>
              </Router>
            </LaunchpadsProvider>
          </TransactionProvider>
        </PolkaBridgeProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App

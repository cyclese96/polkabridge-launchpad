import React, { useCallback, useEffect, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
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
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
       
        <Switch>
          <Route path="/" exact>
            <Home />
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
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={config.chainId}
        connectors={{
          walletconnect: { rpcUrl: config.rpc },
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

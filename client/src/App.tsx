import React, { useCallback, useEffect, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import DisclaimerModal from './components/DisclaimerModal'
import ModalsProvider from './contexts/Modals'
import useModal from './hooks/useModal'
import theme from './theme'
import Launchpads from './views/Launchpads'
import Home from './views/Home'
import Navbar from './components/TopBar/components/Navbar'
import Rules from './views/Rules/Rules'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'
import {
  ethereumClient,
  projectId,
  wagmiClient,
} from './web3Connection/wagmiClient'
import { Web3Modal } from '@web3modal/react'

// const Providers: React.FC = ({ children }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <WagmiConfig client={wagmiClient}>
//         <Router>
//           <ModalsProvider>{children}</ModalsProvider>
//         </Router>
//       </WagmiConfig>
//       <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
//     </ThemeProvider>
//   )
// }

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

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <Router>
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

          <Disclaimer />
        </Router>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ThemeProvider>
  )
}
export default App

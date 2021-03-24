import React from 'react'
import { Switch } from 'react-router-dom'
import LaunchpadsContainer from './components/LaunchpadsContainer'


const Launchpads: React.FC = () => {
  return (
    <Switch>
      <LaunchpadsContainer />
    </Switch>
  )
}

export default Launchpads

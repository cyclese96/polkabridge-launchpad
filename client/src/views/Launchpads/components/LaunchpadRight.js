import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    height: 350,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(41, 42, 66, 0.3)',
    border: '1px solid #212121',
    filter: 'drop-shadow(0 0 0.5rem #212121)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
      height: '100%',
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
  },
  logoWrapper: {
    height: 45,
    width: 45,
    backgroundColor: '#ffffff',
    border: '1px solid #bdbdbd',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
  },
  tokenTitle: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: '#e5e5e5',
  },
  tokenSubtitle: {
    fontWeight: 300,
    padding: 0,
    paddingLeft: 10,
    fontSize: 12,
    color: '#bdbdbd',
  },
  tokenAmount: {
    fontWeight: 500,
    padding: 0,
    paddingLeft: 10,
    fontSize: 16,
    color: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function LaunchpadRight() {
  const classes = useStyles()
  return (
    <Card className={classes.card} elevation={10}>
      <h6 className={classes.title}>UPCOMING POOLS</h6>
      <div className="mt-5">
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex justify-content-start">
            <div className={classes.logoWrapper}>
              <img
                src="https://launchpad.polkabridge.org/img/tokens/punt.jpg"
                className={classes.logo}
              />
            </div>
            <div>
              <div className={classes.tokenTitle}>Cryptopunt Private</div>
              <div className={classes.tokenSubtitle}></div>
            </div>
          </div>
          <div className={classes.tokenAmount}>0.45</div>
        </div>
        )
      </div>
    </Card>
  )
}

export default LaunchpadRight

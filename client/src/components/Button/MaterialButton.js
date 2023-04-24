import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  stakeButton: {
    background: `linear-gradient(to bottom,#D9047C, #BF1088)`,
    color: 'white',
    width: '100%',
    height: 40,
    textTransform: 'none',
    borderRadius: 30,
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
    padding: '5px 20px 5px 20px',
    '&:hover': {
      // background: 'rgba(224, 7, 125, 0.7)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: 13,
    },
  },
  unstakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#f6f6f6',
    borderColor: '#f6f6f6',
    width: '100%',
    height: 40,
    borderRadius: 30,
    textTransform: 'none',
    fontSize: 16,
    marginRight: 5,
    marginLeft: 5,
    padding: '5px 20px 5px 20px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: 15,
    },
  },
}))

const MaterialButton = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  hidden = false,
}) => {
  const classes = useStyles()
  return (
    <Button
      hidden={hidden}
      onClick={onClick}
      color="primary"
      variant="contained"
      disabled={disabled}
      className={
        variant == 'primary' ? classes.stakeButton : classes.unstakeButton
      }
    >
      {children}
    </Button>
  )
}

export default MaterialButton

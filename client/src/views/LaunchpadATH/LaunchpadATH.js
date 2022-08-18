import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  background: {
    paddingBottom: 20,
    paddingLeft: '8%',
    paddingRight: '8%',
    backgroundColor: 'transparent',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingLeft: '1%',
      paddingRight: '1%',
    },
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 54,
    fontWeight: 700,
    verticalAlign: 'middle',
    wordSpacing: '0px',
    margin: '0px 0px 12px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
    },
  },
  itemWrapper: {
    marginLeft: 10,
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'linear-gradient(rgb(23, 29, 42) 0%, rgba(23, 29, 42, 0) 100%)',
    padding: '7px 20px 7px 20px',
    borderRadius: 20,
    backgroundColor: 'initial',
    color: 'white',
    boxShadow: `rgb(0 0 0 / 2%) 0px 1px 1px, rgb(0 0 0 / 2%) 0px 2px 2px, rgb(0 0 0 / 2%) 0px 4px 4px, rgb(0 0 0 / 2%) 0px 6px 8px, rgb(0 0 0 / 2%) 0px 8px 16px`,
  },
  logo: {
    height: 20,
    width: 20,
  },
  title: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: 600,
  },
  growth: {
    backgroundColor: 'rgba(0,100,0,0.7)',
    borderRadius: 20,
    color: 'white',
    padding: '3px 8px 3px 8px',
    marginLeft: 8,
    fontSize: 12,
  },
}))
export default function LaunchpadATH() {
  const classes = useStyles()
  return (
    <div className={classes.background}>
      <div>
        <div class="marquee-wrapper ">
          <div class="marquee-block">
            <div class="marquee-inner to-left">
              <span>
                <div class="marquee-item">
                  <a href="https://alphadex.io/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/alphadex.jpg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>AlphaDex</div>
                      <div className={classes.growth}>500X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://pixelverse.ai/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/pixelverse.png"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PixelVerse</div>
                      <div className={classes.growth}>86X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://www.peoplez.io/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/peoplez.svg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PeopleZ</div>
                      <div className={classes.growth}>50X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://defactor.com/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/defactor.svg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>Defactor</div>
                      <div className={classes.growth}>30X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://playermon.com/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/playmon.png"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PlayerMon</div>
                      <div className={classes.growth}>30X</div>
                    </div>
                  </a>
                </div>
              </span>
              <span>
                <div class="marquee-item">
                  <a href="https://alphadex.io/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/alphadex.jpg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>AlphaDex</div>
                      <div className={classes.growth}>500X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://pixelverse.ai/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/pixelverse.png"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PixelVerse</div>
                      <div className={classes.growth}>86X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://www.peoplez.io/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/peoplez.svg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PeopleZ</div>
                      <div className={classes.growth}>50X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://defactor.com/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/defactor.svg"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>Defactor</div>
                      <div className={classes.growth}>30X</div>
                    </div>
                  </a>
                </div>
                <div class="marquee-item">
                  <a href="https://playermon.com/" target="_blank">
                    <div className={classes.itemWrapper}>
                      <div>
                        <img
                          src="/images/tokens/playmon.png"
                          className={classes.logo}
                        />
                      </div>
                      <div className={classes.title}>PlayerMon</div>
                      <div className={classes.growth}>30X</div>
                    </div>
                  </a>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

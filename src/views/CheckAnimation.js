import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Done from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  checkContainer: {
    display: 'flex',
    width: "100%",
    justifyContext: 'center',
    alignItems: 'center',
    left: '45%'
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  fav: {
    fontSize: '250px',
    opacity: '0.7'

  }
}));

export default function SimpleGrow({anim, color}) {
  const classes = useStyles();
  return (
    <div className={classes.root}
      // style={{
      //   position: 'fixed',
      //   top: '15%',
      //   left: '43%',
      //   // margin: '0 auto',
      //   zIndex: anim ? '3' : '-1'
      // }}
    >
      
      <div className={classes.checkContainer}>
        <Grow
          in={anim}
          {...((anim) ? { timeout: 500 } : {})}
        >
          <Done elevation={4} style={{
            color,
          }} className={classes.fav}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </Done>
        </Grow>
      </div>
    </div>
  );
}
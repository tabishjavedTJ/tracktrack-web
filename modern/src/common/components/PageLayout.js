import React, { useState } from 'react';
import {
  AppBar,
  Breadcrumbs,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from './LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    height: '100%',
    display: 'flex',
  },
  mobileRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  desktopDrawer: {
    width: theme.dimensions.drawerWidthDesktop,
  },
  mobileDrawer: {
    width: theme.dimensions.drawerWidthTablet,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    alignItems: 'stretch',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const PageTitle = ({ breadcrumbs }) => {
  const theme = useTheme();
  const t = useTranslation();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  if (desktop) {
    return (
      <Typography variant="h6" noWrap>{t(breadcrumbs.at(0))}</Typography>
    );
  }
  return (
    <Breadcrumbs>
      {breadcrumbs.slice(0, -1).map((breadcrumb) => (
        <Typography variant="h6" color="inherit" key={breadcrumb}>{t(breadcrumb)}</Typography>
      ))}
      <Typography variant="h6" color="textPrimary">{t(breadcrumbs.at(-1))}</Typography>
    </Breadcrumbs>
  );
};

const PageLayout = ({ menu, breadcrumbs, children }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Hidden mdDown>
        <div className={classes.desktopRoot}>
          <Drawer
            variant="permanent"
            className={classes.desktopDrawer}
            classes={{ paper: classes.desktopDrawer }}
          >
            <div className={classes.toolbar}>
              <Toolbar>
                <IconButton size="large" color="inherit" edge="start" onClick={() => navigate('/')}>
                  <ArrowBackIcon />
                </IconButton>
                <PageTitle breadcrumbs={breadcrumbs} />
              </Toolbar>
            </div>
            <Divider />
            {menu}
          </Drawer>
          <div className={classes.content}>{children}</div>
        </div>
      </Hidden>

      <Hidden mdUp>
        <div className={classes.mobileRoot}>
          <Drawer
            variant="temporary"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            classes={{ paper: classes.mobileDrawer }}
          >
            {menu}
          </Drawer>
          <AppBar position="static" color="inherit">
            <Toolbar>
              <IconButton size="large" color="inherit" edge="start" onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <PageTitle breadcrumbs={breadcrumbs} />
            </Toolbar>
          </AppBar>
          <div className={classes.content}>{children}</div>
        </div>
      </Hidden>
    </>
  );
};

export default PageLayout;

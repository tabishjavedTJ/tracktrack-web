import React, { useState } from 'react';

import {
  Typography, AppBar, Toolbar, IconButton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffectAsync } from '../reactHelper';
import { useTranslation } from '../common/components/LocalizationProvider';
import Map from '../map/core/Map';
import MapPositions from '../map/MapPositions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

const EventPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const t = useTranslation();

  const { id } = useParams();

  const [event, setEvent] = useState();
  const [position, setPosition] = useState();

  useEffectAsync(async () => {
    if (id) {
      const response = await fetch(`/api/events/${id}`);
      if (response.ok) {
        setEvent(await response.json());
      } else {
        throw Error(await response.text());
      }
    }
  }, [id]);

  useEffectAsync(async () => {
    if (event && event.positionId) {
      const response = await fetch(`/api/positions?id=${event.positionId}`);
      if (response.ok) {
        const positions = await response.json();
        if (positions.length > 0) {
          setPosition(positions[0]);
        }
      } else {
        throw Error(await response.text());
      }
    }
  }, [event]);

  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <IconButton size="large" color="inherit" edge="start" onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{t('positionEvent')}</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mapContainer}>
        <Map>
          {position && <MapPositions positions={[position]} />}
        </Map>
      </div>
    </div>
  );
};

export default EventPage;

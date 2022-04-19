import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Container, CssBaseline, styled, Toolbar, Typography,
} from '@mui/material';

import { Routes, Route } from 'react-router-dom';

import { MainPage } from '../../pages/MainPage/MainPage';

import styles from './App.module.scss';
import { DictionariesPage } from '../../pages/Dictionaries/DictionariesPage/DictionariesPage';
import { WordsPage } from '../../pages/WordsPage/WordsPage';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <div className={styles.App}>
      <CssBaseline />

      {/* <Box sx={{flexGrow: 1}}> */}
      {/*  <AppBar position="fixed"> */}
      {/*    <Toolbar> */}
      {/*      <Typography variant="h6" */}
      {/*                  component="h2" */}
      {/*                  sx={{flexGrow: 1}}> */}
      {/*        Words */}
      {/*      </Typography> */}
      {/*    </Toolbar> */}
      {/*  </AppBar> */}
      {/*  <Offset /> */}
      {/* </Box> */}
      <Container
        maxWidth="sm"
        sx={{ height: '100%' }}
      >
        <Routes>
          <Route
            path="/"
            element={<DictionariesPage />}
          />
          <Route
            path="/words"
            element={<WordsPage />}
          />
        </Routes>
        {/* <MainPage /> */}
      </Container>
    </div>
  );
}

export default App;

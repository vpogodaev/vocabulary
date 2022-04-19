import React from 'react';
import { DictionariesPage } from '../Dictionaries/DictionariesPage/DictionariesPage';
import { WordsPage } from '../WordsPage/WordsPage';

// This page for all testing now

type TMainPageProps = {};

export const MainPage: React.FC<TMainPageProps> = ({}): JSX.Element =>
// return <WordsPage />
  <DictionariesPage />;

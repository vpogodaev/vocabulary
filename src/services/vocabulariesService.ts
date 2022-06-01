import { ORIGIN } from './constants';
import { IVocabulary, INewVocabulary } from '../models/Vocabulary/IVocabulary';
import { httpFetch, Methods } from './http';

const route = 'vocabularies';

const getVocabularies = (): Promise<IVocabulary[]> =>
  httpFetch<IVocabulary[]>(`${ORIGIN}/${route}`);

const postVocabulary = (vocabulary: INewVocabulary) =>
  httpFetch<IVocabulary>(`${ORIGIN}/${route}`, vocabulary, Methods.POST);

const deleteVocabulary = (vocabularyId: number) =>
  httpFetch(`${ORIGIN}/${route}/${vocabularyId}`, null, Methods.DELETE);

export const VocabulariesAPI = {
  getVocabularies,
  postVocabulary,
  deleteVocabulary,
};

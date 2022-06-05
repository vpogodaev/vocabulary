import { ORIGIN } from './constants';
import { IVocabulary, INewVocabulary } from '../models/Vocabulary/IVocabulary';
import { httpFetch, Methods } from './http';

const route = 'vocabularies';

const fetchVocabularies = (): Promise<IVocabulary[]> =>
  httpFetch<IVocabulary[]>(`${ORIGIN}/${route}`);

const fetchVocabulary = (vocabularyId: number): Promise<IVocabulary> =>
  httpFetch<IVocabulary>(`${ORIGIN}/${route}/${vocabularyId}`);

const postVocabulary = (vocabulary: INewVocabulary) =>
  httpFetch<IVocabulary>(`${ORIGIN}/${route}`, vocabulary, Methods.POST);

const deleteVocabulary = (vocabularyId: number) =>
  httpFetch(`${ORIGIN}/${route}/${vocabularyId}`, null, Methods.DELETE);

export const VocabulariesAPI = {
  fetchVocabularies,
  fetchVocabulary,
  postVocabulary,
  deleteVocabulary,
};

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from '.';
import type {AppState} from './types';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

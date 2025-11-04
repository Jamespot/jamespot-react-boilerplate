import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppExtensionsDispatch, RootExtensionsState } from './Store.types';

export const useExtensionsDispatch = () => useDispatch<AppExtensionsDispatch>();
export const useExtensionsSelector: TypedUseSelectorHook<RootExtensionsState> = useSelector;

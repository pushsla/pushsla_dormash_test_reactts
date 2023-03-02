//*module
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
//*local
import type { RootState, AppDispatch } from '@data/storage'

// typescripted hook to useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
// typescripted hook to useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
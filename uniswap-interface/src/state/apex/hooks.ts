import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import * as models from './model'
import { fetchShareCode, consumeShareCode} from './actions'

export function useApexState(): AppState['apex'] {
  return useSelector<AppState, AppState['apex']>(state => state.apex)
}

export function useGetShareCodeCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (user_id: string) => {
      return models.fetchShareCode(user_id)
        .then(share_code => {
          dispatch(fetchShareCode({ share_code }))
          return share_code;
        })
        .catch(error => {
          console.debug('hook error:', error)
        })
    },
    [dispatch]
  )
}

export function useConsumeShareCodeCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (share_code: string) => {
      return models.consumeShareCode(share_code)
        .then(account => {
          dispatch(consumeShareCode({ account }))
          return account;
        })
        .catch(error => {
          console.debug('hook error:', error)
        })
    },
    [dispatch]
  )
}


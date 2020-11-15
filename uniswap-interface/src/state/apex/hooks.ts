import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from 'web3-eth-contract'
import * as models from './model'
import { getEarned } from '../../hooks/apex'
import { getApexMasterContract, getApexTokenContract } from '../../utils'
import { 
  fetchShareCode, consumeShareCode, 
  createApexMainContract, createApexTokenContract 
} from './actions'

export function useApexState(): AppState['apex'] {
  return useSelector<AppState, AppState['apex']>(state => state.apex)
}

export function useApexGetEarned() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (contract: Contract, account: string) => {
      const result = await getEarned(contract, account)
      debugger
      console.debug(result)
    },
    [dispatch]
  )
}

export function useCreateApexMainContractCallback(libray?: Web3Provider) {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    () => {
      dispatch(createApexMainContract({ contract: getApexMasterContract(libray) }))
    },
    [dispatch]
  )
}

export function useCreateApexTokenContractCallback(libray?: Web3Provider) {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    () => {
      dispatch(createApexTokenContract({ contract: getApexTokenContract(libray) }))
    },
    [dispatch]
  )
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


import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from 'web3-eth-contract'
import * as models from './model'
import * as hooks from '../../hooks/apex'
import { getApexMasterContract, getApexTokenContract } from '../../utils'
import { 
  fetchShareCode, consumeShareCode, createApexMainContract, 
  createApexTokenContract, getApexCount, getETHBalance, getETHPrice,
  getLPGenerationCompleted, getApexTop10, getUserReferrals 
} from './actions'

export function useApexState(): AppState['apex'] {
  return useSelector<AppState, AppState['apex']>(state => state.apex)
}

export function useGetApexTop10Callback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const list: any[] = await hooks.arrayTop10()
      dispatch(getApexTop10( { list }))
    },
    [dispatch]
  )
}

export function useGetUserReferralsCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (account: string) => {
      const list: any[] = await hooks.arrayUserReferrals(account)
      dispatch(getUserReferrals( { list }))
    },
    [dispatch]
  )
}
export function useGetLPGenerationCompletedCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const completed: boolean = await hooks.getLPGenerationCompleted()
      dispatch(getLPGenerationCompleted( { completed }))
    },
    [dispatch]
  )
}

export function useGetApexCountCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (account: string) => {
      const count: number = await hooks.getApexCount(account)
      dispatch(getApexCount( { count }))
    },
    [dispatch]
  )
}

export function useGetETHBalanceCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const balance: number = await hooks.getETHBalance()
      dispatch(getETHBalance({ balance }))
    },
    [dispatch]
  )
}

export function useGetETHPriceCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const price: number = await hooks.getETHPrice()
      dispatch(getETHPrice({ price }))
    },
    [dispatch]
  )
}

export function useApexGetEarned() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (contract: Contract, account: string) => {
      try {
        const result = await hooks.getEarned(contract, account)
        debugger
        console.debug(result)
      } catch (error) {
        console.error('get earned error', error)
      }
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


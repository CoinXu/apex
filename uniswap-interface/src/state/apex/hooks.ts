import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from 'web3-eth-contract'
import * as models from './model'
import * as hooks from '../../hooks/apex'
import { getApexMainContract, getApexLPTokenContract } from '../../utils'
import { 
  fetchShareCode, consumeShareCode, createApexMainContract, 
  createApexTokenContract, getApexCount, getETHBalance, getETHPrice,
  getLPGenerationCompleted, getApexTop10, getUserReferrals,

  getApexUserInfo, getApexHaveStarted, getApexDecreaseRewardTime,
  getApexMiningCount, getApexCountOfLockStorage, getApexDynamicInfo, 
  getApexPrizeAmount, getApexETHInfo, getApexForcastAnnualization
} from './actions'
import { ChainId } from '@uniswap/sdk'

export function useApexState(): AppState['apex'] {
  return useSelector<AppState, AppState['apex']>(state => state.apex)
}

export function useApexForcastAnnualizationCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async() => {
      const n = await hooks.apexForcastAnnualization()
      dispatch(getApexForcastAnnualization({ value: n }))
    },
    [dispatch]
  )
}

export function useGetTEHDynamicInfo() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const info = await hooks.apexGetETHInfo()
      dispatch(getApexETHInfo({ info }))
    },
    [dispatch]
  )
}

export function useGetApexHavaStartedCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const started: boolean = await hooks.apexHaveStarted()
      dispatch(getApexHaveStarted({ started }))
    },
    [dispatch]
  )
}

export function useApexDecreaseRewardTimeCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const time: number = await hooks.apexDecreaseRewardTime()
      dispatch(getApexDecreaseRewardTime({ time }))
    },
    [dispatch]
  )
}

export function useGetApexMiningCountCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (account: string) => {
      const count: number = await hooks.apexMiningCount(account)
      dispatch(getApexMiningCount({ count }))
    },
    [dispatch]
  )
}

export function useGetApexCountOfLockStorageCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (chainId: ChainId) => {
      const count: number = await hooks.apexCountOfLockStorage(chainId)
      dispatch(getApexCountOfLockStorage({ count }))
    },
    [dispatch]
  )
}

export function useGetApexUserInfoCallback(account: string) {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const info = await hooks.apexUserInfo(account)
      dispatch(getApexUserInfo({ info }))
    },
    [dispatch]
  )
}

export function useGetApexTop10Callback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const list = await hooks.apexGetTop10()
      dispatch(getApexTop10( { list }))
    },
    [dispatch]
  )
}

export function useGetApexDynamicInfoCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const info = await hooks.apexDynamicInfo()
      dispatch(getApexDynamicInfo({ info }))
    },
    [dispatch]
  )
}

export function useGetApexPrizeAmountCallback() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async () => {
      const amount: number = await hooks.apexGetPrizeAmount()
      dispatch(getApexPrizeAmount({ amount }))
    },
    [dispatch]
  )
}
///////////////////////////////////////////////////////////

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
      dispatch(createApexMainContract({ contract: getApexMainContract(libray) }))
    },
    [dispatch]
  )
}

export function useCreateApexTokenContractCallback(libray?: Web3Provider) {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    () => {
      dispatch(createApexTokenContract({ contract: getApexLPTokenContract(libray) }))
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


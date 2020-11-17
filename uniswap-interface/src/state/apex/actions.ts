import { createAction } from '@reduxjs/toolkit'
import { Contract } from 'web3-eth-contract'
import { ApexDynamicInfoStruct, ApexTop10ItemStruct, ApexUserInfo, ApexETHInfo } from '../../hooks/apex'

export const fetchShareCode = createAction<{ share_code: string }>('apex/fetchShareCode')
export const consumeShareCode = createAction<{ account: string }>('apex/consumeShareCode')
export const createApexMainContract = createAction<{ contract: Contract }>('apex/createApexMainContract')
export const createApexTokenContract = createAction<{ contract: Contract }>('apex/createApexTokenContract')
export const getApexCount = createAction<{ count: number }>('apex/getApexCount')
export const getETHBalance = createAction<{ balance: number }>('apex/getETHBalance')
export const getETHPrice = createAction<{ price: number }>('apex/getETHPrice')
export const getLPGenerationCompleted = createAction<{ completed: boolean }>('apex/getLPGenerationCompleted')
export const getUserReferrals = createAction<{ list: any[] }>('apex/getUserReferrals')

export const getApexUserInfo = createAction<{ info: ApexUserInfo }>('apex/getApexUserInfo')
export const getApexHaveStarted = createAction<{ started: boolean}>('apex/getApexHaveStarted')
export const getApexDecreaseRewardTime = createAction<{ time: number }>('apex/getApexDecreaseRewardTime')
export const getApexMiningCount = createAction<{ count: number }>('apex/getApexMiningCount')
export const getApexCountOfLockStorage = createAction<{ count: number }>('apex/getApexCountOfLockStorage')
export const getApexTop10 = createAction<{ list: ApexTop10ItemStruct[] }>('apex/getApexTop10')
export const getApexDynamicInfo = createAction<{ info: ApexDynamicInfoStruct }>('apex/getApexDynamicInfo')
export const getApexPrizeAmount = createAction<{ amount: number }>('apex/getApexPrizeAmount')
export const getApexETHInfo = createAction<{ info: ApexETHInfo }>('apex/getApexETHInfo')


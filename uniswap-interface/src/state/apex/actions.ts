import { createAction } from '@reduxjs/toolkit'
import { Contract } from 'web3-eth-contract'

export const fetchShareCode = createAction<{ share_code: string }>('apex/fetchShareCode')
export const consumeShareCode = createAction<{ account: string }>('apex/consumeShareCode')
export const createApexMainContract = createAction<{ contract: Contract }>('apex/createApexMainContract')
export const createApexTokenContract = createAction<{ contract: Contract }>('apex/createApexTokenContract')
export const getApexCount = createAction<{ count: number }>('apex/getApexCount')
export const getETHBalance = createAction<{ balance: number }>('apex/getETHBalance')
export const getETHPrice = createAction<{ price: number }>('apex/getETHPrice')
export const getLPGenerationCompleted = createAction<{ completed: boolean }>('apex/getLPGenerationCompleted')
export const getApexTop10 = createAction<{ list: any[] }>('apex/getApexTop10')
export const getUserReferrals = createAction<{ list: any[] }>('apex/getUserReferrals')

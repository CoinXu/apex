import { createAction } from '@reduxjs/toolkit'
import { Contract } from 'web3-eth-contract'

export const fetchShareCode = createAction<{ share_code: string }>('apex/fetchShareCode')
export const consumeShareCode = createAction<{ account: string }>('apex/consumeShareCode')
export const createApexMainContract = createAction<{ contract: Contract }>('apex/createApexMainContract')
export const createApexTokenContract = createAction<{ contract: Contract }>('apex/createApexTokenContract')

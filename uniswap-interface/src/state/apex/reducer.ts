import { createReducer } from '@reduxjs/toolkit'
import { fetchShareCode, consumeShareCode, createApexMainContract, createApexTokenContract } from './actions'
import { Contract } from 'web3-eth-contract'

export interface ApexState {
  readonly shareCode: string;
  readonly shareAccount: string;
  readonly consumed: boolean;
  readonly mainContract: Contract | null;
  readonly tokenContract: Contract | null;
}

const initialState: ApexState = {
  shareCode: "",
  shareAccount: "",
  consumed: false,
  mainContract: null,
  tokenContract: null
}

export default createReducer(initialState, builder => {
  builder
  .addCase(fetchShareCode, (state, action) => {
    state.shareCode = action.payload.share_code
  })
  .addCase(consumeShareCode, (state, action) => {
    state.shareAccount= action.payload.account
    state.consumed = action.payload.account.length > 0 
  })
  .addCase(createApexTokenContract, (state, action) => {
    state.tokenContract= action.payload.contract
  })
  .addCase(createApexMainContract, (state, action) => {
    state.mainContract = action.payload.contract
  })
})

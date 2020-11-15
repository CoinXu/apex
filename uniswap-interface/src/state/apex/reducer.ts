import { createReducer } from '@reduxjs/toolkit'
import { fetchShareCode, consumeShareCode } from './actions'

export interface ApexState {
  readonly shareCode: string;
  readonly shareAccount: string;
  readonly consumed: boolean;
}

const initialState: ApexState = {
  shareCode: "",
  shareAccount: "",
  consumed: false
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
})

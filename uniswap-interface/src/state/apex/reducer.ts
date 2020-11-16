import { createReducer } from '@reduxjs/toolkit'
import { 
  fetchShareCode, consumeShareCode, createApexMainContract, 
  createApexTokenContract, getApexCount, getETHBalance, getETHPrice,
  getApexTop10, getUserReferrals
} from './actions'
import { Contract } from 'web3-eth-contract'

export interface ApexState {
  readonly shareCode: string;
  readonly shareAccount: string;
  readonly consumed: boolean;
  readonly mainContract: Contract | null;
  readonly tokenContract: Contract | null;
  readonly apexCount: number;
  readonly ethBalance: number;
  readonly ethPrice: number;
  readonly isFirstApexManning: boolean;
  readonly top10: any[];
  readonly userReferrals: any[];
}

const initialState: ApexState = {
  shareCode: "",
  shareAccount: "",
  consumed: false,
  mainContract: null,
  tokenContract: null,
  apexCount: 0,
  ethBalance: 0,
  ethPrice: 0,
  isFirstApexManning: false,
  top10: [],
  userReferrals: []
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
  .addCase(getApexCount, (state, action) => {
    state.apexCount = action.payload.count
  })
  .addCase(getETHBalance, (state, action) => {
    state.ethBalance = action.payload.balance
    state.isFirstApexManning = state.ethBalance > 1000
  })
  .addCase(getETHPrice, (state, action) => {
    state.ethPrice = action.payload.price
  })
  .addCase(getApexTop10, (state, action) => {
    state.top10 = action.payload.list
  })
  .addCase(getUserReferrals, (state, action) => {
    state.userReferrals = action.payload.list
  })
})

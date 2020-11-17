import { createReducer } from '@reduxjs/toolkit'
import { 
  fetchShareCode, consumeShareCode, createApexMainContract, 
  createApexTokenContract, getApexCount, getETHBalance, getETHPrice,
  getApexTop10, getUserReferrals,

  getApexUserInfo, getApexHaveStarted, getApexDecreaseRewardTime,
  getApexMiningCount, getApexCountOfLockStorage, getApexDynamicInfo, 
  getApexPrizeAmount
} from './actions'
import { ApexETHInfo, ApexDynamicInfoStruct, ApexTop10ItemStruct, ApexUserInfo } from '../../hooks/apex'
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
  readonly userReferrals: any[];

  readonly started: boolean;
  readonly decreaseRewardTime: number;
  readonly mining: number;
  readonly countOfLockStorage: number;
  readonly userInfo: ApexUserInfo;
  readonly top10: ApexTop10ItemStruct[];
  readonly dynamicInfo: ApexDynamicInfoStruct;
  readonly prizeAmount: number;
  readonly ethInfo: ApexETHInfo;
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
  userReferrals: [],

  started: false,
  decreaseRewardTime: 0,
  mining: 0,
  countOfLockStorage: 0,
  userInfo: { amount: 0, rewardDebt: 0 },
  top10: [],
  dynamicInfo: {},
  prizeAmount: 0,
  ethInfo: { price: 0 }
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

  /////////////////////////////////
  .addCase(getApexUserInfo, (state, action) => {
    state.userInfo = action.payload.info
  })
  .addCase(getApexHaveStarted, (state, action) => {
    state.started = action.payload.started
  })
  .addCase(getApexDecreaseRewardTime, (state, action) => {
    state.decreaseRewardTime = action.payload.time
  })
  .addCase(getApexMiningCount, (state, action) => {
    state.mining = action.payload.count
  })
  .addCase(getApexCountOfLockStorage, (state, action) => {
    state.countOfLockStorage = action.payload.count
  })
  .addCase(getApexDynamicInfo, (state, action) => {
    state.dynamicInfo = action.payload.info
  })
  .addCase(getApexPrizeAmount, (state, action) => {
    state.prizeAmount = action.payload.amount
  })
})

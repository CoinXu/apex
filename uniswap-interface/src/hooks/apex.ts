import { Contract } from 'web3-eth-contract'
import ethers from 'ethers'
import BigNumber from 'bignumber.js'
import web3 from 'web3'
import { getApexMasterContract, getApexTokenContract } from '../utils'
import { APEX_DEFAULT_REFERRER_ADDRESS } from '../constants'

// const TOKEN_STAKE_POOL_ID = 0
const STAKE_POOL_ID = 1

export async function getApexCount(account: string): Promise<number> {
  // TODO
  console.log(account)
  return 888
}

export async function getApexToUSD(amount: number): Promise<number> {
  // TODO
  console.log(amount)
  return amount
}

export async function getETHBalance(): Promise<number> {
  // TODO
  return 888
}

export async function getETHPrice(): Promise<number> {
  // TODO
  return 888
}

export async function getEarned(contract: Contract, account: string) {
  console.log(contract)
  return getApexMasterContract().methods
    .pendingApex(STAKE_POOL_ID, account)
    .call()
}

export async function harvest(contract: Contract, first: boolean, account: string) {
  console.log(contract)
  // return contract.methods.pendingApex(STAKE_POOL_ID, account).call()
  // return getApexMasterContract().methods.pendingApex(STAKE_POOL_ID, account).call()
  return deposit(contract, first, account, 0)
}

export async function getWhitelistContributed(account: string): Promise<number> {
  return getApexMasterContract()
    .methods
    .whitelistContributed(account)
    .call()
}

// 首矿判断的话有个函数LPGenerationCompleted返回bool值，false那就是首矿状态，true就不是首矿
export async function getLPGenerationCompleted(): Promise<boolean> {
  return getApexMasterContract()
    .methods
    .LPGenerationCompleted()
    .call()
}

// 在不是首矿的情况下，点了加速过后就触发depositWhitelist，然后ApproveLP，然后stakeLP
export async function deposit(contract: Contract, first: boolean, account: string, amount: number, address: string = APEX_DEFAULT_REFERRER_ADDRESS) {
  console.log(contract, address, web3)
  await getApexMasterContract() 
    .methods
    .depositWhitelist(address)
    .send({ 
      from: account,
      value: web3.utils.toWei(web3.utils.toBN(amount), 'ether') 
    })
    .on('transactionHash', (hash: string) => {
      return hash
    })

  if (!first) {
    await approveLP(getApexTokenContract(), getApexMasterContract(), account)
    await stakeLP(contract, amount, account)
  }
}

export function claimLP(contract: Contract, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .claimLPTokens()
    .send({ from: account })
    .on('transactionHash', (hash: string) => {
      debugger
      return hash
    })
}

export function approveLP(ipContract: Contract, contract: Contract, account: string) {
  console.log('approve:', ipContract, contract.options.address)
  return getApexTokenContract() 
    .methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export function stakeLP(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .deposit(STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (hash: string) => {
      debugger
      return hash
    })
}

export function stake(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .deposit(STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (hash: string) => {
      debugger
      return hash
    })
}

export function unstake(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .withdraw(STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (hash: string) => {
      debugger
      return hash
    })
}

export async function arrayTop10(): Promise<any[]> {
  return []
  // return getApexMasterContract()
  //   .methods
  //   .getTop(10)
  //   .call()
}

export async function arrayUserReferrals(account: string): Promise<any[]> {
  console.log(account)
  return []
  // return getApexMasterContract() 
  //   .methods
  //   .userReferrals(account)
  //   .call()
}


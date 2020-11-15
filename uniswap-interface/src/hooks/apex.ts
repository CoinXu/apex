import { Contract } from 'web3-eth-contract'
import ethers from 'ethers'
import BigNumber from 'bignumber.js'
import { getApexMasterContract, getApexTokenContract } from '../utils'

// const TOKEN_STAKE_POOL_ID = 0
const STAKE_POOL_ID = 1

export async function getEarned(contract: Contract, account: string) {
  console.log(contract)
  return getApexMasterContract().methods
    .pendingApex(STAKE_POOL_ID, account)
    .call()
  // return contract.methods
  //   .pendingApex(STAKE_POOL_ID, account)
  //   .call()
}

export async function harvest(contract: Contract, account: string) {
  console.log(contract)
  // return contract.methods.pendingApex(STAKE_POOL_ID, account).call()
  return getApexMasterContract().methods.pendingApex(STAKE_POOL_ID, account).call()
}

export function deposit(contract: Contract, account: string, address: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .depositWhitelist(address)
    .send({ from: account })
    .on('transactionHash', (tx: any) => tx.transactionHash)
}

export function claimLP(contract: Contract, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .claimLPToken()
    .send({ from: account })
    .on('transactionHash', (tx: any) => tx.transactionHash)
}

export function approveLP(ipContract: Contract, contract: Contract, account: string) {
  console.log(ipContract)
  return getApexTokenContract() 
    .methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export function stakeLP(contract: Contract, poolId: string, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .deposit(poolId,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (tx: any) => tx.transactionHash)
}

export function stake(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .deposit(STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (tx: any) => tx.transactionHash)
}

export function unstake(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .withdraw(STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
    .on('transactionHash', (tx: any) => tx.transactionHash)
}

export async function arrayTop10(contract: Contract) {
  console.log(contract)
  return getApexMasterContract()
    .methods
    .top10()
    .call()
}

export async function arrayUserReferrals(contract: Contract, account: string) {
  console.log(contract)
  return getApexMasterContract() 
    .methods
    .userReferrals(account)
    .call()
}


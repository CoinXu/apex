import { Contract } from 'web3-eth-contract'
import ethers from 'ethers'
import BigNumber from 'bignumber.js'
import web3 from 'web3'
import {
  getApexMainContract, getApexLPTokenContract,
  getApexTopReferrerContract,
  getApexWETHContract
} from '../utils'
import {
  APEX_MAIN_ADRESS, APEX_DEFAULT_REFERRER_ADDRESS, APEX_TOP_REFERRER_ADRESS,
  APEX_LP_TOKEN_ADRESS
} from '../constants'
import { ChainId } from '@uniswap/sdk'
import axios from 'axios'

const APEX_LP_TOKEN_STAKE_POOL_ID = '0'
const APEX_STAKE_POOL_ID = '1'

// 两个倒计时功能：使用haveStarted变量来判断首矿情况设计倒计时，首矿未开启则全部显示0。
// 格式：日：小时：分钟：秒。
export async function apexHaveStarted(): Promise<boolean> {
  return getApexMainContract().methods.haveStarted().call()
}

export async function apexDecreaseRewardTime(): Promise<number> {
  const time: string = await getApexMainContract()
    .methods
    .decreaseRewardTime()
    .call()

  return new BigNumber(time).toNumber()
}

// APEX挖矿所得量：pendingApex前端调用只在显示有收益的时候，
// 调用两次，两个池子的结果加一加，pid就是pool id，调用deposit的时候要填的一样，0是LP池，1是无损池
// 分别调用两次，第一次pid传入0，第二次pid传入1.将两次返回的结果相加
export async function apexMiningCount(account: string): Promise<number> {
  const lp: string = await getApexMainContract()
    .methods
    .pendingApex(APEX_LP_TOKEN_STAKE_POOL_ID, account)
    .call()
  const stake: string = await getApexMainContract()
    .methods
    .pendingApex(APEX_STAKE_POOL_ID, account)
    .call()

  const n = new BigNumber(lp).plus(new BigNumber(stake))
  const r = web3.utils.fromWei(n.toString(), 'ether')
  return parseFloat(r)
}

// 锁仓总量：总合约在pair合约上的balance + 在WETH合约上的balance
// pair合约在exchangeconnector那个合约上，变量tokenUniswapPair，WETH的地址在uniswap官方文档上有。									

// LPToken.balanceOf(Main合约地址).call	
// wethToken.balanceOf(Main合约地址).call
export async function apexCountOfLockStorage(chainId?: ChainId): Promise<number> {
  try {
    const weth: string = await getApexWETHContract(chainId)
      .methods
      .balanceOf(APEX_MAIN_ADRESS)
      .call()
    const lp: string = await getApexLPTokenContract()
      .methods
      .balanceOf(APEX_MAIN_ADRESS)
      .call()
    const n = new BigNumber(lp).plus(new BigNumber(weth))
    return parseFloat(web3.utils.fromWei(n.toString(), 'ether'))
  } catch (e) {
    console.log('banance error', e)
    return 0
  }
}

// 预计年化：总工程师给个公式计算，前端实现。显示USD。
// rewardPerBlock = rewardRate * SECONDS_PER_DAY / BLOCK_PER_DAY
// 年华率：rewardPerBlock * 2336000
// TODO
export async function apexForcastAnnualization(): Promise<number> {
  const contract = getApexMainContract()
  const rewardRate: string = await contract.methods.rewardRate().call()
  const SECONDS_PER_DAY: string = await contract.methods.SECONDS_PER_DAY().call()
  const BLOCK_PER_DAY: string = await contract.methods.BLOCK_PER_DAY().call()

  const rewardPerBlock = new BigNumber(rewardRate)
    .times(new BigNumber(SECONDS_PER_DAY))
    .div(new BigNumber(BLOCK_PER_DAY))
  const result = rewardPerBlock.times(new BigNumber(2336000))
  return result.toNumber()
}

// 用户帐户信息
// rewardDebt: 解除质押输入框最大值
export interface ApexUserInfo {
  amount: number;
  rewardDebt: number;
}

export async function apexUserInfo(account: string): Promise<ApexUserInfo> {
  const result: any = await getApexMainContract()
    .methods
    .userInfo(APEX_STAKE_POOL_ID, account)
    .call()

  return {
    amount: new BigNumber(result.amount).toNumber(),
    rewardDebt: new BigNumber(result.rewardDebt).toNumber()
  }
}

// 质押：传_pid为1 ，邀请人地址、amount、ETH同值取输入框
// _Pid:1池ID
// amount余额
// referrerAddress邀请人地址
// Value to send (ETH)以太坊
// 用户质押功能。amount和ETH都使用输入框的值
// 质押功能最大值按钮默认32ETHk
export async function apexStake(amount: number, account: string, address: string = APEX_DEFAULT_REFERRER_ADDRESS): Promise<void> {
  address = address || APEX_DEFAULT_REFERRER_ADDRESS
  await getApexMainContract()
    .methods
    // pid, amount, account, refereraddress
    .deposit(APEX_STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      account,
      address
    )
    .send({
      from: account,
      value: web3.utils.toWei(web3.utils.toBN(amount), 'ether')
    })
}

// 解除质押：pid同样为1，amount最大值待工程师给调用数据。
export async function apexUnstake(amount: number, account: string): Promise<void> {
  await getApexMainContract()
    .methods
    .deposit(APEX_STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      account
    )
    .send({ from: account })
}

// top 10现在的接口是：function getTop(uint256 k) public view returns(address[] memory) 
// 返回前k名的地址，通过这个mapping来得到一个地址的总令牌量，
// mapping(address => uint256) public lpAmounts;
// 返还数据首矿启动才有，getTop(k)返回的是一个address array 。

// getTop	call	k:取前10就传10	address数组
// lpAmounts	call	address：拿到的前十名地址	uint256：返回数量
export interface ApexTop10ItemStruct {
  address: string;
  apex: number;
  eth: number;
}

export async function apexGetTop10(): Promise<ApexTop10ItemStruct[]> {
  try {
    const top10: string[] = await getApexTopReferrerContract()
      .methods
      .getTop(10)
      .call()
    const amounts: string[] = await getApexTopReferrerContract()
      .methods
      .lpAmounts(top10)
      .call()

    return amounts.map<ApexTop10ItemStruct>((r, i) => ({
      address: top10[i],
      // apex: new BigNumber(r).toNumber(),
      apex: 0,
      eth: new BigNumber(r).toNumber()
    }))
  } catch (e) {
    return []
  }
}

export async function apexPublishedCounter(): Promise<number> {
  return await getApexLPTokenContract()
    .methods
    .totalSupply()
    .call()
}

export interface ApexDynamicInfoStruct {
  publishedCount: number;
  holdApexAddress: string;
  createdAtTimestamp: number;
  reserveUSD: number;
  token0Price: number;
  priceUSD: number;
  daily: { date: number, priceUSD: number }[];
  priceIncrease: number;
  apexIncrease: number;
}

async function thegraph<T = any>(query: string,
  url: string = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'): Promise<T> {
    try {
      const response = await axios.post(url, { query })
      return response.data.data as T
    } catch (e) {
      return null as any
    }
}

async function getHoldApexAddress(): Promise<string> {
  try {
    const url: string =  'http://www.tokenview.com:8088/eth/token/' + APEX_LP_TOKEN_ADRESS
    const response = await axios(url)
    return response.data
  } catch (e) {
    return ""
  }
}

// APEX流动池信息，包括线性图，几乎是在UNISWAP的接口文档里有详细资料。上线后马上根据官方文档对接。
export async function apexDynamicInfo(): Promise<ApexDynamicInfoStruct> {
  // 上线时间 https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
  // get	Pair	createdAtTimestamp
  // get	Pair	reserveUSD
  // get	Pair	token0Price
  const address = '0xd3d2e2692501a5c9ca623199d38826e513033a17'
  const pair = await thegraph<{
    pair: {
      createdAtTimestamp: string,
      reserveUSD: string,
      token0Price: string
    }
  }>(`{
    pair(id: "${address}") {
      createdAtTimestamp
      reserveUSD
      token0Price
    }
  }`)
  // 价格涨跌幅就第priceUSD的第二个数据对比第一条的涨跌幅
  // 这个tokendaydates的priceUSD就是美元价格
  // 这个连起来就是价格波浪线
  const daily = await thegraph<{
    tokenDayDatas: {
      priceUSD: string,
      date: number
    }[]
  }>(`{
    tokenDayDatas(orderBy: date, orderDirection: desc, where: {
      token: "${address}"
    }) {
      date
      priceUSD
    }
  }`)
  // 流动池涨跌幅用这个
  const apex = await thegraph<{ 
    pairDayDatas: {
      reserveUSD: string 
    }[]
  }>(`{
    pairDayDatas(first: 2, orderBy: date, orderDirection: desc, 
      where: {
        pairAddress: "${address}",
        date_gt: 1592505859
      }
    ) { 
      reserveUSD
    }
  }`)
  const holdApexAddress: string = await getHoldApexAddress()
  const publishedCount: number = await apexPublishedCounter()

  const { pair: { createdAtTimestamp, reserveUSD, token0Price } } = pair
  const [df, ds] = daily.tokenDayDatas
  const [af, as] = apex.pairDayDatas

  return {
    holdApexAddress,
    publishedCount,
    createdAtTimestamp: new BigNumber(createdAtTimestamp).toNumber(),
    reserveUSD: new BigNumber(reserveUSD).toNumber(),
    token0Price: new BigNumber(token0Price).toNumber(),
    priceUSD: df ? new BigNumber(df.priceUSD).toNumber() : 0,
    daily: daily.tokenDayDatas.map(r => {
      return {
        date: r.date,
        priceUSD: new BigNumber(r.priceUSD).toNumber()
      }
    }),
    priceIncrease: df.priceUSD === "0" ? 0 : ((df && ds)
      ? new BigNumber(ds.priceUSD)
        .minus(new BigNumber(df.priceUSD))
        .div(new BigNumber(df.priceUSD))
        .toNumber()
      
      : 0),
    apexIncrease: af.reserveUSD === "0" ? 0 : ((af && as)
      ? new BigNumber(as.reserveUSD)
          .minus(new BigNumber(af.reserveUSD))
          .div(new BigNumber(af.reserveUSD))
          .toNumber()
      : 0)
  }
}

// 在不是首矿的情况下，点了加速过后就触发depositWhitelist，然后ApproveLP，然后stakeLP
export async function apexAccelerate(first: boolean, account: string, amount: number, address: string = APEX_DEFAULT_REFERRER_ADDRESS) {
  await getApexMainContract()
    .methods
    .depositWhitelist(address)
    .send({
      from: account,
      value: web3.utils.toWei(web3.utils.toBN(amount), 'ether')
    })

  if (!first) {
    await apexApproveLP(account)
    await apexStakeLP(amount, account)
  }
}

// 领奖
export async function apexReceivePrize(account: string): Promise<void> {
  await getApexTopReferrerContract()
    .methods
    .claimPrize(account)
    .send({ from: account })
}

// 奖金池：领奖功能top10合约上面的claimPrize，奖金池金额显示top10合约的以太坊数量*以太坊即时价格。
export async function apexGetPrizeAmount(): Promise<number> {
  const web3: any = window.web3
  // 余额
  const balance: BigNumber = await new Promise(function (resove) {
    web3.eth.getBalance(APEX_TOP_REFERRER_ADRESS, function (v: BigNumber) {
      resove(v == null ? new BigNumber(0) : v)
    })
  })
  const info = await apexGetETHInfo()
  // TODO eth price
  // const ethPrice: BigNumber = new BigNumber(1)
  return balance.times(new BigNumber(info.price)).toNumber()
}

// 提现
export async function apexHarvest(contract: Contract, first: boolean, account: string) {
  return deposit(contract, first, account, 0)
}

export function apexApproveLP(account: string) {
  return getApexLPTokenContract()
    .methods
    .approve(getApexMainContract(), ethers.constants.MaxUint256)
    .send({ from: account })
}

export function apexStakeLP(amount: number, account: string) {
  return getApexMainContract()
    .methods
    .deposit(APEX_STAKE_POOL_ID,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send({ from: account })
}

export interface ApexETHInfo {
  price: number;
}
export async function apexGetETHInfo(): Promise<ApexETHInfo> {
  const response = await axios({
    "method": "GET",
    "url": "https://coinpaprika1.p.rapidapi.com/tickers",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
      "x-rapidapi-key": "fe3ed0b2bdmsh6c94004b2e9a021p121d3djsnb15989aab0db",
      "useQueryString": true
    }
  })
  const item = response.data.find((r: any) => r.id === 'eth-ethereum')
  return {
    price: item ? item.quotes.USD.price : 0
  }
}

/////////////////////////////////////////////////////////////////////////////////
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
  return getApexMainContract().methods
    .pendingApex(APEX_STAKE_POOL_ID, account)
    .call()
}

export async function harvest(contract: Contract, first: boolean, account: string) {
  console.log(contract)
  // return contract.methods.pendingApex(STAKE_POOL_ID, account).call()
  // return getApexMainContract().methods.pendingApex(STAKE_POOL_ID, account).call()
  return deposit(contract, first, account, 0)
}

export async function getWhitelistContributed(account: string): Promise<number> {
  return getApexMainContract()
    .methods
    .whitelistContributed(account)
    .call()
}

// 首矿判断的话有个函数LPGenerationCompleted返回bool值，false那就是首矿状态，true就不是首矿
export async function getLPGenerationCompleted(): Promise<boolean> {
  return getApexMainContract()
    .methods
    .LPGenerationCompleted()
    .call()
}

// 在不是首矿的情况下，点了加速过后就触发depositWhitelist，然后ApproveLP，然后stakeLP
export async function deposit(contract: Contract, first: boolean, account: string, amount: number, address: string = APEX_DEFAULT_REFERRER_ADDRESS) {
  console.log(contract, address, web3)
  await getApexMainContract()
    .methods
    .depositWhitelist(address)
    .send({
      from: account,
      value: web3.utils.toWei(web3.utils.toBN(amount), 'ether')
    })

  if (!first) {
    await approveLP(getApexLPTokenContract(), getApexMainContract(), account)
    await stakeLP(contract, amount, account)
  }
}

export function claimLP(contract: Contract, account: string) {
  console.log(contract)
  return getApexMainContract()
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
  return getApexLPTokenContract()
    .methods
    .approve(contract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export function stakeLP(contract: Contract, amount: number, account: string) {
  console.log(contract)
  return getApexMainContract()
    .methods
    .deposit(APEX_STAKE_POOL_ID,
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
  return getApexMainContract()
    .methods
    .deposit(APEX_STAKE_POOL_ID,
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
  return getApexMainContract()
    .methods
    .withdraw(APEX_STAKE_POOL_ID,
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
  // return getApexMainContract()
  //   .methods
  //   .getTop(10)
  //   .call()
}

export async function arrayUserReferrals(account: string): Promise<any[]> {
  console.log(account)
  return []
  // return getApexMainContract() 
  //   .methods
  //   .userReferrals(account)
  //   .call()
}


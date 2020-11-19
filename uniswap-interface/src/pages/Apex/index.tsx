import React, { useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import CountDown from 'react-countdown'
import CountDownRender from './CountDown'
import Card from '../../components/Card'
import { Box, Image } from 'rebass'
import { ButtonPrimary } from '../../components/Button'
import Copy from '../../components/AccountDetails/Copy'
import { TYPE } from '../../theme'
import SpeedUp from './SpeedUp'
import Pledge from './Pledge'
import UnlockPledge from './UnlockPledge'
import Apex from './Apex'
import Top10 from './Top10'
import Intro from './Intro'
import { apexHarvest, apexReceivePrize } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import {
  useGetShareCodeCallback, useConsumeShareCodeCallback, useApexState,
  useCreateApexMainContractCallback, useCreateApexTokenContractCallback,
  useApexGetEarned, useGetApexCountCallback, useGetETHBalanceCallback, useGetETHPriceCallback,

  useGetApexHavaStartedCallback, useApexDecreaseRewardTimeCallback,
  useGetApexCountOfLockStorageCallback, useGetTEHDynamicInfo,
  useGetApexPrizeAmountCallback, useGetApexMiningCountCallback,
  useApexForcastAnnualizationCallback
} from '../../state/apex/hooks'
import useParsedQueryString from '../../hooks/useParsedQueryString'
// import { APEX_MAIN_ADRESS } from '../../constants'
// import { abi as ApexMasterABI } from '../../constants/abis/apex_master_chef.json'
// import Web3 from 'web3'
// import { getEarned as _getEarned } from '../../hooks/apex'

import ApexBanner0 from '../../assets/images/apex/apex_banner_0.png'
import ApexBanner1 from '../../assets/images/apex/apex_banner_1.png'
import ApexBanner2 from '../../assets/images/apex/apex_banner_2.png'
import ApexHeaderIcon from '../../assets/images/apex/marginalia-bitcoin-minin.png'

import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

function Invitation() {
  const state = useApexState()
  const { account, library } = useActiveWeb3React()
  const link: string = `${window.location.origin}/#/${state.shareCode || ''}`
  const qs = useParsedQueryString()
  const getShareCode = useGetShareCodeCallback()
  const createApexMainContract = useCreateApexMainContractCallback(library)
  const createApexTokenContract = useCreateApexTokenContractCallback(library)
  const consumeShareCode = useConsumeShareCodeCallback()
  const getEarned = useApexGetEarned()
  const getApexCount = useGetApexCountCallback()
  const getETHBalance = useGetETHBalanceCallback()
  const getETHPrice = useGetETHPriceCallback()
  const getApexMiningCount = useGetApexMiningCountCallback()

  useEffect(() => {
    if (account) getApexCount(account)
  }, [account])

  useEffect(() => {
    if (account) getETHBalance()
  }, [account])

  useEffect(() => {
    if (account) getETHPrice()
  }, [account])

  useEffect(() => {
    if (!state.mainContract) {
      createApexMainContract()
    }
  }, [account, state.mainContract, window.web3])

  useEffect(() => {
    if (!state.tokenContract) {
      createApexTokenContract()
    }
  }, [account, state.tokenContract, window.web3])

  useEffect(() => {
    if (state.mainContract && account) {
      getEarned(state.mainContract, account)
    }
  }, [state.mainContract, account])

  useEffect(() => {
    if (account) {
      getShareCode(account)
    }
  }, [account, state.consumed])

  useEffect(() => {
    if (qs.shareCode) {
      consumeShareCode(qs.shareCode as string)
    }
  }, [qs.shareCode])

  useEffect(() => {
    if (account) getApexMiningCount(account)
  }, [account])

  return (
    <>
      <Card border="1px solid #63c695" backgroundColor="#fff">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box>
            <TYPE.black fontSize="14px">推荐链接</TYPE.black>
            <TYPE.gray fontWeight={0} fontSize="12px" style={{ wordBreak: 'break-word' }}>
              {link}
            </TYPE.gray>
          </Box>
          <Box>
            <Copy toCopy={link}>
              <TYPE.blue fontSize="10px">
                邀请好友<br />分享复制
              </TYPE.blue>
            </Copy>
          </Box>
        </Box>
        <Box mt={24} width="100%" display="flex" sx={{ alignItems: 'center' }}>
          <TYPE.blue fontSize={18} mr={11}>APEX:</TYPE.blue>
          <TYPE.blue fontSize={22}>{state.mining}</TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box style={{ lineHeight: 1 }} display="flex" sx={{ alignItems: 'center' }}>
            <TYPE.blue fontSize={14} fontWeight={0} mr={11}>≈</TYPE.blue>
            <TYPE.blue fontSize={30}>${state.mining * state.dynamicInfo.priceUSD}</TYPE.blue>
          </Box>
          <Box>
            <ButtonPrimary
              onClick={() => state.mainContract && account && apexHarvest(state.mainContract, state.started, account)}
              padding="2px 4px"
              width="60px"
              style={{ backgroundColor: '#DFF0E9' }}
              borderRadius="15px">
              <TYPE.main color="primary1" fontSize={18}>
                提现
              </TYPE.main>
            </ButtonPrimary>
          </Box>
        </Box>
      </Card>
    </>
  )
}

function CurrencyPreview() {
  const { account, chainId } = useActiveWeb3React()
  const state = useApexState()
  const getApexPrizeAmount = useGetApexPrizeAmountCallback()
  const getApexCountOfLockStorage = useGetApexCountOfLockStorageCallback()
  const getApexETHInfo = useGetTEHDynamicInfo()
  const getApexForcastAnnualization = useApexForcastAnnualizationCallback()

  useEffect(() => { getApexPrizeAmount() }, [account])
  useEffect(() => { if (chainId) getApexCountOfLockStorage(chainId) }, [account])
  useEffect(() => { getApexETHInfo() }, [])
  useEffect(() => { getApexForcastAnnualization() }, [])

  return (
    <>
      <Card border="1px solid #63c695" backgroundColor="#fff">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gridTemplateRows: 'repeat(3, 24px)',
          justifyContent: 'space-between',
          columnGap: '6px',
          rowGap: '6px'
        }}>
          <Box>
            <TYPE.blue fontWeight={0}>锁仓总量：</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue textAlign="right">
              {state.countOfLockStorage} USD
            </TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue fontWeight={0}>预计年化：</TYPE.blue>
          </Box>
          <Box>
          <TYPE.blue textAlign="right">{state.annualization} %</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue fontWeight={0}>奖金池：</TYPE.blue>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <ButtonPrimary
              onClick={() => state.mainContract && account && apexReceivePrize(account)}
              padding="0px 4px"
              width="60px"
              mr="10px"
              style={{ backgroundColor: '#DFF0E9' }}
              borderRadius="15px">
              <TYPE.main color="primary1" fontSize={14}>
                领奖
              </TYPE.main>
            </ButtonPrimary>
            <TYPE.blue>{state.prizeAmount} USD</TYPE.blue>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export function RedirectToApex(props: RouteComponentProps<{ shareCode: string }>) {
  const {
    location: { search },
    match: {
      params: { shareCode }
    }
  } = props

  return (
    <Redirect
      to={{
        ...props.location,
        pathname: '/',
        search:
          search && search.length > 1
            ? `${search}&shareCode=${shareCode}`
            : `?shareCode=${shareCode}`
      }}
    />
  )
}

function DecreaseRewardTime() {
  const { account } = useActiveWeb3React()
  const state = useApexState()

  const getApexHaveStarted = useGetApexHavaStartedCallback()
  const getDecreaseRewardTime = useApexDecreaseRewardTimeCallback()

  useEffect(() => {
    getApexHaveStarted()
  }, [account])
  useEffect(() => {
    getDecreaseRewardTime()
  }, [account])

  return (
    <>
      <Box width="100%" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
        <Image
          src={ApexHeaderIcon}
          alt="APEX"
          width="60px"
          height="52px"
        />
        <TYPE.largeHeader
          ml={10}
          textAlign="center"
          style={{
            background: 'linear-gradient(90deg, #0CA99A 0.146484375%, #F7DF78 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
          创世挖矿倒计时
        </TYPE.largeHeader>
      </Box>
      <CountDown 
        overtime
        autoStart
        date={new Date(state.decreaseRewardTime * 1000)} 
        renderer={CountDownRender} />
    </>
  )
}

function Banner() {
  return (
    <Carousel className="apex-home" nextIcon={null} prevIcon={null} style={{ width: '100%' }}>
      <Carousel.Item>
        <Image
          src={ApexBanner0}
          alt="APEX"
          sx={{ width: '100%', borderRadius: '12px' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src={ApexBanner1}
          alt="APEX"
          sx={{ width: '100%', borderRadius: '12px' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src={ApexBanner2}
          alt="APEX"
          sx={{ width: '100%', borderRadius: '12px' }} />
      </Carousel.Item>
    </Carousel>
  )
}

export default function () {
  return (
    <>
      <Box width="100%" id="reward-time">
        <DecreaseRewardTime />
      </Box>
      <Box width="100%" paddingTop="17px">
        <Banner />
      </Box>
      <Box width="100%" pt={20} id="manning">
        <Invitation />
      </Box>
      <Box width="100%" pt={18}>
        <CurrencyPreview />
      </Box>
      <Box width="100%" pt={21}>
        <SpeedUp />
      </Box>
      <Box width="100%" pt={10}>
        <Pledge />
      </Box>
      <Box width="100%" pt={10}>
        <UnlockPledge />
      </Box>
      <Box width="100%" pt={20} id="apex">
        <Apex />
      </Box>
      <Box width="100%" pt={18} id="top10">
        <Top10 />
      </Box>
      <Box width="100%" id="apex-swap">
        <Intro />
      </Box>
    </>
  )
}

import React, { useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
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
import { harvest, claimLP } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import {
  useGetShareCodeCallback, useConsumeShareCodeCallback, useApexState,
  useCreateApexMainContractCallback, useCreateApexTokenContractCallback,
  useApexGetEarned, useGetApexCountCallback, useGetETHBalanceCallback, useGetETHPriceCallback,
  useGetLPGenerationCompletedCallback
} from '../../state/apex/hooks'
import useParsedQueryString from '../../hooks/useParsedQueryString'
// import { APEX_MAIN_ADRESS } from '../../constants'
// import { abi as ApexMasterABI } from '../../constants/abis/apex_master_chef.json'
// import Web3 from 'web3'
// import { getEarned as _getEarned } from '../../hooks/apex'

import ApexBanner0 from '../../assets/images/apex/apex_banner_0.png'
import ApexBanner1 from '../../assets/images/apex/apex_banner_1.png'
import ApexBanner2 from '../../assets/images/apex/apex_banner_2.png'

import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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
      // const w3: any = window.web3
      // const web3 = new Web3(w3.currentProvider)
      // // @ts-ignore
      // const contract = new web3.eth.Contract(ApexMasterABI, APEX_MAIN_ADRESS)
      // debugger
      // deposit(contract, account, APEX_MAIN_ADRESS)
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

  return (
    <>
      <Card border="1px solid #63c695">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box>
            <TYPE.black>推荐链接</TYPE.black>
            <TYPE.gray style={{ wordBreak: 'break-word' }}>{link}</TYPE.gray>
          </Box>
          <Box>
            <Copy toCopy={link}>
              <TYPE.blue>
                邀请好友<br />分享复制
              </TYPE.blue>
            </Copy>
          </Box>
        </Box>
        <Box mt={24} sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box>
            <TYPE.blue fontSize={18}>APEX: 8888</TYPE.blue>
            <TYPE.blue fontSize={22}>≈ $888</TYPE.blue>
          </Box>
          <Box>
            <ButtonPrimary
              onClick={() => state.mainContract && account && harvest(state.mainContract, state.isFirstApexManning, account)}
              padding="2px 4px"
              width="60px"
              borderRadius="4px">
              提现
            </ButtonPrimary>
          </Box>
        </Box>
      </Card>
    </>
  )
}

function CurrencyPreview() {
  const { account } = useActiveWeb3React()
  const state = useApexState()
  const getIsFirstApexManning = useGetLPGenerationCompletedCallback()

  useEffect(() => {
    getIsFirstApexManning()
  }, [getIsFirstApexManning, state.isFirstApexManning])

  const bonus: number = state.isFirstApexManning
    ? state.ethBalance * state.ethPrice * 0.07
    : state.ethBalance * state.ethPrice
  return (
    <>
      <Card border="1px solid #63c695">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '80px auto',
          gridTemplateRows: 'repeat(3, 24px)',
          justifyContent: 'space-between',
          columnGap: '6px',
          rowGap: '6px'
        }}>
          <Box>
            <TYPE.blue>锁仓总量：</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue>- USD</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue>预计年化：</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue>-</TYPE.blue>
          </Box>
          <Box>
            <TYPE.blue>奖金池：</TYPE.blue>
          </Box>
          <Box sx={{
            display: 'flex'
          }}>
            <ButtonPrimary
              onClick={() => state.mainContract && account && claimLP(state.mainContract, account)}
              padding="2px 4px"
              width="60px"
              mr="10px"
              borderRadius="4px">
              提奖
            </ButtonPrimary>
            <TYPE.blue>{bonus} USD</TYPE.blue>
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

export default function () {
  return (
    <>
      <Carousel nextIcon={null} prevIcon={null}>
        <Carousel.Item>
          <Image
            src={ApexBanner0}
            alt="APEX"
            sx={{ width: ['100%', 'auto'], borderRadius: '12px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src={ApexBanner1}
            alt="APEX"
            sx={{ width: ['100%', 'auto'], borderRadius: '12px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src={ApexBanner2}
            alt="APEX"
            sx={{ width: ['100%', 'auto'], borderRadius: '12px' }} />
        </Carousel.Item>
      </Carousel>
      <Box width="100%" pt={24}>
        <Invitation />
      </Box>
      <Box width="100%" pt={24}>
        <CurrencyPreview />
      </Box>
      <Box width="100%" pt={24}>
        <SpeedUp />
      </Box>
      <Box width="100%" pt={12}>
        <Pledge />
      </Box>
      <Box width="100%" pt={12}>
        <UnlockPledge />
      </Box>
      <Box width="100%" pt={24}>
        <Apex />
      </Box>
      <Box width="100%" pt={24}>
        <Top10 />
      </Box>
      <Intro />
    </>
  )
}

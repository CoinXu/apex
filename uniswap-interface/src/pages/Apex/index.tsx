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
import { harvest } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import { 
  useGetShareCodeCallback, useConsumeShareCodeCallback, useApexState,
  useCreateApexMainContractCallback, useCreateApexTokenContractCallback,
  useApexGetEarned
} from '../../state/apex/hooks'
import useParsedQueryString from '../../hooks/useParsedQueryString'
// import { APEX_MAIN_ADRESS } from '../../constants'
// import { abi as ApexMasterABI } from '../../constants/abis/apex_master_chef.json'
// import Web3 from 'web3'
// import { getEarned as _getEarned } from '../../hooks/apex'

import ApexBanner0 from '../../assets/images/apex/apex_banner_0.png'

function Invitation() {
  const state = useApexState()
  const link: string = `${window.location.origin}/#/${state.shareCode || ""}`
  const { account, library } = useActiveWeb3React()
  const qs = useParsedQueryString()
  const getShareCode = useGetShareCodeCallback()
  const createApexMainContract = useCreateApexMainContractCallback(library)
  const createApexTokenContract = useCreateApexTokenContractCallback(library)
  const consumeShareCode = useConsumeShareCodeCallback()
  const getEarned = useApexGetEarned()

  useEffect(() => {
      if (!state.mainContract) {
        createApexMainContract()
      }
  }, [createApexMainContract, account, state.mainContract, window.web3])

  useEffect(() => {
    if (!state.tokenContract) {
      createApexTokenContract()
    }
  }, [createApexTokenContract, account, state.tokenContract, window.web3])

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
  }, [getEarned, state.mainContract, account])

  useEffect(() => {
    if (account) {
      getShareCode(account)
    }
  }, [getShareCode, account, state.consumed])

  useEffect(() => {
    if (qs.shareCode) {
      consumeShareCode(qs.shareCode as string)
    }
  }, [consumeShareCode, qs.shareCode])

  return (
    <>
      <Card border="1px solid green">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box>
            <TYPE.black>推荐链接</TYPE.black>
            <TYPE.link style={{ wordBreak: 'break-word' }}>{link}</TYPE.link>
          </Box>
          <Box>
            <Copy toCopy={link}>
              邀请好友<br />分享复制
            </Copy>
          </Box>
        </Box>
        <Box mt={36} sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '12px'
        }}>
          <Box>
            <TYPE.subHeader>APEX: 8888</TYPE.subHeader>
            <TYPE.subHeader>≈$888</TYPE.subHeader>
          </Box>
          <Box>
            <ButtonPrimary
              onClick={() => state.mainContract && account && harvest(state.mainContract, account)}
              padding="2px 4px"
              width="80px"
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
  return (
    <>
      <Card border="1px solid green">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '80px auto',
          gridTemplateRows: 'repeat(3, 24px)',
          justifyContent: 'space-between',
          columnGap: '6px',
          rowGap: '6px'
        }}>
          <Box>
            <TYPE.subHeader>锁仓总量：</TYPE.subHeader>
          </Box>
          <Box>
            <TYPE.subHeader>8888 USD</TYPE.subHeader>
          </Box>
          <Box>
            <TYPE.subHeader>预计年化：</TYPE.subHeader>
          </Box>
          <Box>
            <TYPE.subHeader>300%</TYPE.subHeader>
          </Box>
          <Box>
            <TYPE.subHeader>奖金池：</TYPE.subHeader>
          </Box>
          <Box>
            <TYPE.subHeader>8888 USD</TYPE.subHeader>
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
      <Image
        src={ApexBanner0}
        alt="APEX"
        sx={{ width: ['100%', 'auto'] }} />
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

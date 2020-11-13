import React, { } from 'react'
import Card from '../../components/Card'
import { Flex, Box, Image } from 'rebass'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import { TYPE } from '../../theme'
import SpeedUp from './SpeedUp'
import Pledge from './Pledge'
import UnlockPledge from './UnlockPledge'
import Apex from './Apex'
import Top10 from './Top10'
import Intro from './Intro'

import ApexBanner0 from '../../assets/images/apex/apex_banner_0.png'

function Invitation() {
  return (
    <>
      <Card>
        <Flex>
          <Box
            width={3 / 5}>
            <TYPE.black>推荐链接</TYPE.black>
            <TYPE.link>https://apex.com</TYPE.link>
          </Box>
          <Box
            width={2 / 5}>
            <ButtonEmpty>邀请好友分享复制</ButtonEmpty>
          </Box>
        </Flex>
        <Flex>
          <Box
            width={3 / 5}>
            <TYPE.subHeader>APEX: 8888</TYPE.subHeader>
            <TYPE.subHeader>≈$888</TYPE.subHeader>
          </Box>
          <Box
            style={{ textAlign: "center" }}
            width={2 / 5}>
            <ButtonPrimary
              padding="2px 4px"
              width="80px"
              borderRadius="4px">
              提现
            </ButtonPrimary>
          </Box>
        </Flex>
      </Card>
    </>
  )
}

function CurrencyPreview() {
  return (
    <>
      <Card>
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


export default function () {
  return (
    <>
      <Image
        src={ApexBanner0}
        alt="APEX"
        sx={{ width: ['100%', 'auto'] }} />
      <Invitation />
      <CurrencyPreview />
      <SpeedUp />
      <Pledge />
      <UnlockPledge />
      <Apex />
      <Top10 />
      <Intro />
    </>
  )
}

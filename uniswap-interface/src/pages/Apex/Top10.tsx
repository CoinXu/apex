import React, { useEffect } from 'react'
import Card from '../../components/Card'
import { Box, Image } from 'rebass'
import { TYPE } from '../../theme'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useGetApexTop10Callback, useGetUserReferralsCallback } from '../../state/apex/hooks'

import Top1 from '../../assets/images/apex/top1.png'
import Top2 from '../../assets/images/apex/top2.png'
import Top3 from '../../assets/images/apex/top3.png'

const Counter = styled(TYPE.largeHeader)`
  padding: 6px 12px;
  border: 1px solid tranparent;
  border-radius: 12px;
  box-shadow: 0 0 1px 8px outside;
`

export default function Top10() {
  const { account } = useActiveWeb3React()
  const getTop10 = useGetApexTop10Callback()
  const getUserReferrals = useGetUserReferralsCallback()

  useEffect(() => {
    getTop10()
  }, [account])

  useEffect(() => {
    if(account) getUserReferrals(account)
  }, [account])

  return (
    <Card border="1px solid #63c695">
      <TYPE.largeHeader textAlign="center">Top10 竞赛排名</TYPE.largeHeader>
      <TYPE.mediumHeader textAlign="center">倒计时</TYPE.mediumHeader>
      <Counter pt={16} textAlign="center">--:--:--:--</Counter>
      <Box pt={16} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '12px',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyItems: 'center'
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top2} variant="ravatar" alt="top 2" />
          <TYPE.black>-- APEX</TYPE.black>
          <TYPE.blue>-- ETH</TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top1} variant="ravatar" alt="top 1" />
          <TYPE.black>-- APEX</TYPE.black>
          <TYPE.blue>-- ETH</TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top3} variant="ravatar" alt="top 3" />
          <TYPE.black>-- APEX</TYPE.black>
          <TYPE.blue>-- ETH</TYPE.blue>
        </Box>
      </Box>
      <Box pt={16} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '12px',
        gridTemplateRows: 'repeat(6, auto)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyItems: 'center'
      }}>
        <TYPE.darkGray>Top4</TYPE.darkGray>
        <TYPE.darkGray>-- APEX</TYPE.darkGray>
        <TYPE.darkGray>-- ETH</TYPE.darkGray>

        {/* <TYPE.black>Top4</TYPE.black>
        <TYPE.black>888...APEX</TYPE.black>
        <TYPE.black>888...ETH</TYPE.black>

        <TYPE.black>Top4</TYPE.black>
        <TYPE.black>888...APEX</TYPE.black>
        <TYPE.black>888...ETH</TYPE.black> */}
      </Box>
    </Card>
  )
}

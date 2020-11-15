import React from 'react'
import Card from '../../components/Card'
import { Box, Image } from 'rebass'
import { TYPE } from '../../theme'
import styled from 'styled-components'

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
  return (
    <Card border="1px solid green">
      <TYPE.largeHeader textAlign="center">Top10 竞赛排名</TYPE.largeHeader>
      <TYPE.mediumHeader textAlign="center">倒计时</TYPE.mediumHeader>
      <Counter pt={16} textAlign="center">88:06:06:06</Counter>
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
          <Image mb={10} size={48} src={Top2} alt="top 2" />
          <TYPE.main>888...APEX</TYPE.main>
          <TYPE.black>888...ETH</TYPE.black>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} size={72} src={Top1} alt="top 1" />
          <TYPE.main>888...APEX</TYPE.main>
          <TYPE.black>888...ETH</TYPE.black>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} size={48} src={Top3} alt="top 3" />
          <TYPE.main>888...APEX</TYPE.main>
          <TYPE.black>888...ETH</TYPE.black>
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
        <TYPE.black>Top4</TYPE.black>
        <TYPE.black>888...APEX</TYPE.black>
        <TYPE.black>888...ETH</TYPE.black>

        <TYPE.black>Top4</TYPE.black>
        <TYPE.black>888...APEX</TYPE.black>
        <TYPE.black>888...ETH</TYPE.black>

        <TYPE.black>Top4</TYPE.black>
        <TYPE.black>888...APEX</TYPE.black>
        <TYPE.black>888...ETH</TYPE.black>
      </Box>
    </Card>
  )
}

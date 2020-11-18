import React, { useEffect } from 'react'
import Card from '../../components/Card'
import { Box, Image } from 'rebass'
import { TYPE } from '../../theme'
// import styled from 'styled-components'
import CountDown from 'react-countdown'
import CountDownRender from './CountDown'
import { useActiveWeb3React } from '../../hooks'
import { useGetApexTop10Callback, useApexState } from '../../state/apex/hooks'

import Top1 from '../../assets/images/apex/top1.png'
import Top2 from '../../assets/images/apex/top2.png'
import Top3 from '../../assets/images/apex/top3.png'

// const Counter = styled(TYPE.largeHeader)`
//   padding: 6px 12px;
//   border: 1px solid tranparent;
//   border-radius: 12px;
//   box-shadow: 0 0 1px 8px outside;
// `


function viewAddress(address: string) {
  return address.replace(/^(\w{4})(\w+?)(\w{4})$/, (a, b, c, d) => c + '...' + d)
}

export default function Top10() {
  const state = useApexState()
  const { account } = useActiveWeb3React()
  const getTop10List = useGetApexTop10Callback()

  useEffect(() => { getTop10List() }, [account])

  const [f, s, t, ...others] = state.top10

  return (
    <Card border="1px solid #63c695" backgroundColor="#fff">
      <TYPE.largeHeader
        fontSize={20}
        textAlign="center"
        style={{
          background: 'linear-gradient(90deg, #0CA99A 0.146484375%, #F7DF78 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
        Top10 竞赛排名
      </TYPE.largeHeader>
      <TYPE.mediumHeader
        style={{
          background: 'linear-gradient(90deg, #0CA99A 0.146484375%, #F7DF78 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
        textAlign="center">倒计时</TYPE.mediumHeader>
      <CountDown 
        overtime
        autoStart
        date={Date.now() + state.decreaseRewardTime} 
        renderer={CountDownRender} />
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
          <TYPE.black fontSize={14}>
            {s ? viewAddress(s.address) : '-'}
          </TYPE.black>
          <TYPE.blue fontSize={20}>
            {s ? s.eth : 0} ETH
          </TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top1} variant="ravatar" alt="top 1" />
          <TYPE.black fontSize={14}>
            {f ? viewAddress(f.address) : '-'}
          </TYPE.black>
          <TYPE.blue fontSize={20}>
            {f ? f.eth : 0} ETH
          </TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top3} variant="ravatar" alt="top 3" />
          <TYPE.black fontSize={14}>
            {t ? viewAddress(t.address) : '-'}
          </TYPE.black>
          <TYPE.blue fontSize={20}>
            {t ? t.eth : 0} ETH
          </TYPE.blue>
        </Box>
      </Box>
      <Box pt={16} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '12px',
        gridTemplateRows: 'repeat(' + others.length + ', auto)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyItems: 'center'
      }}>
        {others.map((r, i) => (
          <>
            <TYPE.darkGray fontSize={14}>Top{4 + i}</TYPE.darkGray>
            <TYPE.darkGray fontSize={14}>
              {f ? viewAddress(f.address) : '-'}
            </TYPE.darkGray>
            <TYPE.darkGray fontSize={14}>
              {f ? f.eth : 0} ETH
            </TYPE.darkGray>
          </>
        ))}
      </Box>
    </Card>
  )
}

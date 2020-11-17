import React, { useEffect } from 'react'
import Card from '../../components/Card'
import { Box, Image } from 'rebass'
import { TYPE } from '../../theme'
// import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useGetApexTop10Callback, useGetUserReferralsCallback } from '../../state/apex/hooks'

import Top1 from '../../assets/images/apex/top1.png'
import Top2 from '../../assets/images/apex/top2.png'
import Top3 from '../../assets/images/apex/top3.png'

// const Counter = styled(TYPE.largeHeader)`
//   padding: 6px 12px;
//   border: 1px solid tranparent;
//   border-radius: 12px;
//   box-shadow: 0 0 1px 8px outside;
// `

export default function Top10() {
  const { account } = useActiveWeb3React()
  const getTop10 = useGetApexTop10Callback()
  const getUserReferrals = useGetUserReferralsCallback()

  useEffect(() => {
    getTop10()
  }, [account])

  useEffect(() => {
    if (account) getUserReferrals(account)
  }, [account])

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
      <Box width="100%" paddingTop="6px" style={{ textAlign: 'center' }}>
        <Box style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '24px',
          backgroundColor: '#F1F8F2',
          boxShadow: '2px 6px 6px 1px #dff0e9'
        }}>
          <TYPE.largeHeader
            fontSize={24}
            color="primary1"
            style={{
              textShadow: '0px 4px 5px rgba(0, 127, 115, 0.43)'
            }}
          >
            88 : 06 : 06 : 06
        </TYPE.largeHeader>
        </Box>
      </Box>

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
          <TYPE.black fontSize={14}>-- APEX</TYPE.black>
          <TYPE.blue fontSize={20}>-- ETH</TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top1} variant="ravatar" alt="top 1" />
          <TYPE.black fontSize={14}>-- APEX</TYPE.black>
          <TYPE.blue fontSize={20}>-- ETH</TYPE.blue>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, max-content)',
          justifyContent: 'center',
          alignItems: 'flex-end',
          justifyItems: 'center'
        }}>
          <Image mb={10} src={Top3} variant="ravatar" alt="top 3" />
          <TYPE.black fontSize={14}>-- APEX</TYPE.black>
          <TYPE.blue fontSize={20}>-- ETH</TYPE.blue>
        </Box>
      </Box>
      <Box pt={16} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '12px',
        gridTemplateRows: 'repeat(4, auto)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyItems: 'center'
      }}>
        <TYPE.darkGray fontSize={14}>Top4</TYPE.darkGray>
        <TYPE.darkGray fontSize={14}>-- APEX</TYPE.darkGray>
        <TYPE.darkGray fontSize={14}>-- ETH</TYPE.darkGray>

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

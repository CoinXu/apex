import React, { useRef, useEffect } from 'react'
import Card from '../../components/Card'
import Copy from '../../components/AccountDetails/Copy'
import { IconWrapper } from '../../theme/components'
import { TYPE } from '../../theme'
import { Box } from 'rebass'
import { APEX_MAIN_ADRESS } from '../../constants'
import { useApexState, useGetApexDynamicInfoCallback } from '../../state/apex/hooks'
import { useActiveWeb3React } from '../../hooks'
import F2 from '@antv/f2'
import moment from 'moment'

import ApexCoin from '../../assets/images/apex/apex_coin.png'
import ETHCoin from '../../assets/images/apex/eth_coin.png'

// const MockData = [{
//   time: '2020-02',
//   tem: 26
// }, {
//   time: '2020-03',
//   tem: 18
// }, {
//   time: '2020-04',
//   tem: 26
// }, {
//   time: '2020-05',
//   tem: 12
// }, {
//   time: '2020-06',
//   tem: 10
// }, {
//   time: '2020-07',
//   tem: 22
// }, {
//   time: '2020-08',
//   tem: 16
// }, {
//   time: '2020-09',
//   tem: 26
// }, {
//   time: '2020-10',
//   tem: 12
// }];

function renderChart(container: HTMLCanvasElement, data: { time: string, tem: number }[]): void {
  const chart = new F2.Chart({
    el: container,
    pixelRatio: window.devicePixelRatio
  })

  chart.source(data, {
    time: {
      type: 'timeCat',
      tickCount: 3,
      range: [0, 1]
    },
    tem: {
      tickCount: 5,
      min: 0
    }
  });

  chart.axis('time', {
    label: function label(text, index, total) {
      const textCfg = { textAlign: '' };
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  })
  chart.tooltip({
    showCrosshairs: true
  })

  chart.area()
    .position('time*tem')
    .color('l(90) 0:#248E84 1:#f7f7f7')
    .shape('smooth')

  chart.line()
    .position('time*tem')
    .color('l(90) 0:#248E84 1:#f7f7f7')
    .shape('smooth')
  chart.render()
}

function Chart(props: { data: { date: number, priceUSD: number }[] }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      renderChart(canvas.current, props.data.map(r => ({
        time: moment(r.date * 1000).format('yyyy-MM'),
        tem: parseFloat(r.priceUSD.toFixed(2))
      })))
    } 
  }, [canvas.current])

  return (
    <canvas ref={canvas} id="cid" style={{ width: '100%', height: 160 }} />
  )
}

export default function Apex() {
  const state = useApexState()
  const { account } = useActiveWeb3React()
  const getApexDynamicInfo = useGetApexDynamicInfoCallback()

  useEffect(() => { getApexDynamicInfo() }, [account])

  return (
    <Card 
      border="1px solid #63c695" 
      backgroundColor="#fff">
      <TYPE.largeHeader fontSize={20}>APEX</TYPE.largeHeader>
      <Box
        pt={20}
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px auto',
          gridTemplateRows: 'repeat(5, 24px)',
          columnGap: '6px',
          rowGap: '6px'
        }}>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            合约地址：
          </TYPE.darkGray>
        </Box>
        <Box sx={{
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: 'auto auto'
        }}>
          <TYPE.darkGray fontWeight={0} fontSize={14} style={{ color: '#333' }}>
            {APEX_MAIN_ADRESS.replace(/^(\w{6})(\w+?)(\w{6})$/, (a, b, c, d) => b + '...' + d)}
          </TYPE.darkGray>
          <Copy toCopy={APEX_MAIN_ADRESS}>
            <TYPE.blue fontWeight={0} fontSize={14}>
              复制
            </TYPE.blue>
          </Copy>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            锁仓总量：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            {state.countOfLockStorage} 
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            发行总量：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            {state.dynamicInfo.publishedCount}
          </TYPE.darkGray>
        </Box>
        {/* <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            持币地址：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            {state.dynamicInfo.holdApexAddress || '-'} 
          </TYPE.darkGray>
        </Box> */}
        {/* <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            转帐次数：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            -
          </TYPE.darkGray>
        </Box> */}
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            上线价格：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            1:888
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            上线时间：
          </TYPE.darkGray>
        </Box>
        <Box>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            {moment(state.dynamicInfo.createdAtTimestamp * 1000).format('yyyy-MM-DD')}
          </TYPE.darkGray>
        </Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>流动资金池</TYPE.subHeader>
        <Box pt="6px" sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.main fontSize={18} color="primary1">
            $ {state.dynamicInfo.reserveUSD.toFixed(2)}
          </TYPE.main>
        <TYPE.main fontSize={14} style={{ color: '#2FD268' }}>
          {state.dynamicInfo.apexIncrease > 0 ? '+' : ''}
          {(state.dynamicInfo.apexIncrease * 100).toFixed(2)}%
        </TYPE.main>
        </Box>
        <Box pt={10} sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '14px'
        }}>
          <IconWrapper size={25}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
          <TYPE.main>{state.isFirstApexManning ? state.apexCount : '-'}</TYPE.main>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}> APEX</TYPE.darkGray>
        </Box>
        <Box mt="8px" sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '14px'
        }}>
          <IconWrapper size={25}><img src={ETHCoin} alt="eth coin" /></IconWrapper>
          <TYPE.main>{state.isFirstApexManning ? state.ethBalance : '-'}</TYPE.main>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}> ETH</TYPE.darkGray>
        </Box>
      </Box>
      <Box pt={22}>
        <TYPE.subHeader>价格（APEX:ETH）</TYPE.subHeader>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.darkGray fontSize={14} fontWeight={0} style={{ color: '#333' }}>
            1:{(1 / state.dynamicInfo.token0Price).toFixed(2)}
          </TYPE.darkGray>
          <TYPE.main fontSize={14} style={{ color: '#2FD268' }}>
            {state.dynamicInfo.priceIncrease > 0 ? '+' : ''}
            {state.dynamicInfo.priceIncrease.toFixed(2)}%
          </TYPE.main>
        </Box>
        <Box>
          <TYPE.main fontSize={18} color="primary1">
            ≈ ${state.dynamicInfo.priceUSD.toFixed(2)}
          </TYPE.main>
        </Box>
      </Box>
      <Box pt={20} width="100%">
        <TYPE.subHeader style={{ color: '#666' }}>价格走势</TYPE.subHeader>
        {
          state.dynamicInfo.daily.length > 0 
            ? (<Chart data={state.dynamicInfo.daily} />)
            : null
        }
      </Box>
    </Card>
  )
}

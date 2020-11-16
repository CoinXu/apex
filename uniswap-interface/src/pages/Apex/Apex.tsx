import React from 'react'
import Card from '../../components/Card'
import Copy from '../../components/AccountDetails/Copy'
import { IconWrapper } from '../../theme/components'
import { TYPE } from '../../theme'
import { Box } from 'rebass'
import { APEX_MAIN_ADRESS } from '../../constants'
import { useApexState } from '../../state/apex/hooks'

import ApexCoin from '../../assets/images/apex/apex_coin.png'
import ETHCoin from '../../assets/images/apex/eth_coin.png'

export default function Apex() {
  const state = useApexState()

  return (
    <Card border="1px solid #63c695">
      <TYPE.subHeader>APEX</TYPE.subHeader>
      <Box
        pt={20}
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px auto',
          gridTemplateRows: 'repeat(6, 24px)',
          columnGap: '6px',
          rowGap: '6px'
        }}>
        <Box>
          <TYPE.darkGray>
            合约地址：
          </TYPE.darkGray>
        </Box>
        <Box sx={{
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: 'auto auto'
        }}>
          <TYPE.gray>{APEX_MAIN_ADRESS.replace(/^(\w{6})(\w+?)(\w{6})$/, (a, b, c, d) => b + '...' + d)}</TYPE.gray>
          <Copy toCopy={APEX_MAIN_ADRESS}>
            <TYPE.blue>
              复制
            </TYPE.blue>
          </Copy>
        </Box>
        <Box>
          <TYPE.darkGray>
            发行总量：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
        <Box>
          <TYPE.darkGray>
            持币总量：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
        <Box>
          <TYPE.darkGray>
            持币地址：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
        <Box>
          <TYPE.darkGray>
            转帐次数：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
        <Box>
          <TYPE.darkGray>
            上线价格：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
        <Box>
          <TYPE.darkGray>
            上线时间：
          </TYPE.darkGray>
        </Box>
        <Box>-</Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>流动资金池</TYPE.subHeader>
        <Box pt={12} sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {/* <TYPE.main>$8888</TYPE.main>
          <TYPE.main>+3.7%</TYPE.main> */}
          <TYPE.main>-</TYPE.main>
          <TYPE.main>-</TYPE.main>
        </Box>
        <Box pt={10} sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '16px'
        }}>
          <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
          <TYPE.main>{state.isFirstApexManning ? state.apexCount : '-'}</TYPE.main>
          <TYPE.black>枚 APEX</TYPE.black>
        </Box>
        <Box pt={10} sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '16px'
        }}>
          <IconWrapper size={22}><img src={ETHCoin} alt="eth coin" /></IconWrapper>
          <TYPE.main>{state.isFirstApexManning ? state.ethBalance : '-'}</TYPE.main>
          <TYPE.black>枚 ETH</TYPE.black>
        </Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>价格（APEX:ETH）</TYPE.subHeader>
        <Box pt={12} sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {/* <TYPE.main>1:0.36</TYPE.main>
          <TYPE.main>+3.7%</TYPE.main> */}
          <TYPE.main>-</TYPE.main>
          <TYPE.main>-</TYPE.main>
        </Box>
        <Box>
          <TYPE.black>
            -
            {/* ≈ $888 */}
          </TYPE.black>
        </Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>价格走势</TYPE.subHeader>
        <div>-</div>
      </Box>
    </Card>
  )
}

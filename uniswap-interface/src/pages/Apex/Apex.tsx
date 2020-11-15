import React from 'react'
import Card from '../../components/Card'
import Copy from '../../components/AccountDetails/Copy'
import { IconWrapper } from '../../theme/components'
import { TYPE } from '../../theme'
import { Box } from 'rebass'

import ApexCoin from '../../assets/images/apex/apex_coin.png'
import ETHCoin from '../../assets/images/apex/eth_coin.png'

export default function Apex() {
  const address: string = 'xxxx'

  return (
    <Card border="1px solid green">
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
        <Box>合约地址：</Box>
        <Box sx={{
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: 'auto auto'
        }}>
          <TYPE.gray>{address}</TYPE.gray>
          <Copy toCopy={address}>复制</Copy>
        </Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
        <Box>发行总量：</Box>
        <Box>888</Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>流动资金池</TYPE.subHeader>
        <Box pt={12} sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.main>$8888</TYPE.main>
          <TYPE.main>+3.7%</TYPE.main>
        </Box>
        <Box pt={10} sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '16px'
        }}>
          <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
          <TYPE.main>88</TYPE.main>
          <TYPE.black>枚 APEX</TYPE.black>
        </Box>
        <Box pt={10} sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          columnGap: '16px'
        }}>
          <IconWrapper size={22}><img src={ETHCoin} alt="eth coin" /></IconWrapper>
          <TYPE.main>88</TYPE.main>
          <TYPE.black>枚 ETH</TYPE.black>
        </Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>价格（APEX:ETH）</TYPE.subHeader>
        <Box pt={12} sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.main>1:0.36</TYPE.main>
          <TYPE.main>+3.7%</TYPE.main>
        </Box>
        <Box>
          <TYPE.black>
            ≈ $888
          </TYPE.black>
        </Box>
      </Box>
      <Box pt={20}>
        <TYPE.subHeader>价格走势</TYPE.subHeader>
        <div>todo</div>
      </Box>
    </Card>
  )
}

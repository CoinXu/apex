import React from 'react'
import { IconWrapper } from '../../theme/components'
import { Box } from 'rebass'
import { TYPE } from '../../theme'
import Card from '../../components/Card'
import { ButtonPrimary } from '../../components/Button'
import { deposit } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import { useApexState } from '../../state/apex/hooks'
import { APEX_MAIN_ADRESS } from '../../constants'

import ApexCoin from '../../assets/images/apex/apex_coin.png'
import ApexCoinGray from '../../assets/images/apex/apex_coin_gray.png'

export default function SpeedUp() {
  const state = useApexState()
  const { account } = useActiveWeb3React()

  return (
    <>
      <Card border="1px solid green">
        <Box 
          width={['100%', '50%', '25%']} 
          sx={{
            display: 'grid',
            gridTemplateColumns: '100px auto 60px',
            columnGap: '6px',
            alignItems: 'center'
          }}>
          <Box>
            <TYPE.largeHeader>令牌名单</TYPE.largeHeader>
          </Box>
          <Box 
            sx={{
              display: 'grid',
              columnGap: '2px',
              gridTemplateColumns: 'repeat(5, 22px)',
              alignItems: 'center',
              flexWrap: 'nowrap'
            }}>
            <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
            <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
            <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
            <IconWrapper size={22}><img src={ApexCoin} alt="apex coin" /></IconWrapper>
            <IconWrapper size={22}><img src={ApexCoinGray} alt="apex coin gray" /></IconWrapper>
          </Box>
          <Box>
            <ButtonPrimary 
              onClick={() => {
                if (!state.mainContract || !account) return
                deposit(state.mainContract, account, APEX_MAIN_ADRESS)
              }}
              padding="2px 4px" 
              width="100%"
              borderRadius="4px">
              加速
            </ButtonPrimary>
          </Box>
        </Box>
      </Card>
    </>
  )
}

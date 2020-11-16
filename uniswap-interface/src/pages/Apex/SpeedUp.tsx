import React, { useState } from 'react'
import { IconWrapper } from '../../theme/components'
import { Box } from 'rebass'
import { TYPE } from '../../theme'
import Card from '../../components/Card'
import { ButtonPrimary } from '../../components/Button'
import { deposit } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import { useApexState } from '../../state/apex/hooks'

import ApexCoin from '../../assets/images/apex/apex_coin.png'
import ApexCoinGray from '../../assets/images/apex/apex_coin_gray.png'

export default function SpeedUp() {
  const state = useApexState()
  const { account } = useActiveWeb3React()
  // TODO Get count from contract
  const [count, setCount] = useState<number>(1)
  const total: number = 5
  const light: number = count 
  const gray: number = total - light
  let k: number = 0

  return (
    <>
      <Card border="1px solid #63c695" backgroundColor="#dff0e9" padding="0">
        <Box
          width={['100%', '50%', '25%']}
          sx={{
            display: 'grid',
            gridTemplateColumns: '110px auto 80px',
            columnGap: '6px',
            alignItems: 'center'
          }}>
          <Box padding="0.5rem 0 0.5rem 0.5rem">
            <TYPE.blue fontSize={24}>令牌名单</TYPE.blue>
          </Box>
          <Box 
            sx={{
              display: 'grid',
              columnGap: '2px',
              gridTemplateColumns: 'repeat(5, 22px)',
              alignItems: 'center',
              flexWrap: 'nowrap'
            }}>
            {new Array(light).fill(0).map(() => {
              const i = ++k 
              return (
                <IconWrapper key={i} size={22} onClick={() => setCount(i)}>
                  <img src={ApexCoin} alt="apex coin" />
                </IconWrapper>
              )
            })}
            {new Array(gray).fill(0).map(() => {
              const i = ++k
              return (
                <IconWrapper key={i} size={22} onClick={() => setCount(i)}>
                  <img src={ApexCoinGray} alt="apex coin gray" />
                </IconWrapper>
              )
            })}
          </Box>
          <Box height="100%">
            <ButtonPrimary
              onClick={() => {
                if (!state.mainContract || !account) return
                deposit(state.mainContract, state.isFirstApexManning, account, count, state.shareAccount || undefined)
              }}
              padding="2px 4px"
              width="100%"
              height="100%"
              borderRadius="10px">
              加速
            </ButtonPrimary>
          </Box>
        </Box>
      </Card>
    </>
  )
}

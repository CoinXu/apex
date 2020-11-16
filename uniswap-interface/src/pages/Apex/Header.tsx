import React from 'react'
import { Box, Image } from 'rebass'
import { ButtonPrimary } from '../../components/Button'
import { TYPE } from '../../theme'
import { useActiveWeb3React } from '../../hooks'

import ApexLogo from '../../assets/images/apex/icon_logo.png'

export default function Header() {
  const { account } = useActiveWeb3React()
  return (
    <Box 
      width="100%" 
      padding="10px 18px"
      backgroundColor="#fff"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Box>
        <Image src={ApexLogo} alt="apex logo" width="75px" height="25px" />
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        columnGap: '6px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <ButtonPrimary
          style={{
            backgroundColor: '#F1F8F2'
          }}
          padding="2px"
          borderRadius="5px">
          <TYPE.subHeader color="primary1">
            {account 
              ? account.replace(/^(\w{6})(\w+?)(\w{4})$/, (a, b, c, d) => b + '...' + d)
              : '...'
            }
          </TYPE.subHeader>
        </ButtonPrimary>
        <TYPE.main color="primary1" fontSize={14} fontWeight={0}>EN</TYPE.main>
      </Box>
    </Box>
  )
}

import React from 'react'
import Card from '../../components/Card'
import { Box, Image, Link } from 'rebass'
import { TYPE } from '../../theme'

import IconCup from '../../assets/images/apex/icon_cup.png'
import IconHammer from '../../assets/images/apex/icon_hammer.png'
import IconBeosin from '../../assets/images/apex/icon_beosin.png'
import IconLogo from '../../assets/images/apex/icon_logo.png'
import Icon1 from '../../assets/images/apex/icon_1.png'
import Icon2 from '../../assets/images/apex/icon_2.png'
import Icon3 from '../../assets/images/apex/icon_3.png'
import Icon4 from '../../assets/images/apex/icon_4.png'
import Icon5 from '../../assets/images/apex/icon_5.png'

export default function Intro() {
  return (
    <>
      <Card
        bg="primary"
        mt={20}
        border="1px solid #fff"
        borderRadius="16px 0 16px 0">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.mediumHeader>流动性挖矿</TYPE.mediumHeader>
          <Image src={IconCup} size={32} />
        </Box>
        <Box pt={20}>
          <TYPE.white>APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...</TYPE.white>
        </Box>
      </Card>

      <Card
        bg="primary"
        mt={20}
        border="1px solid #fff"
        borderRadius="16px 0 16px 0">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <TYPE.mediumHeader>流动性挖矿</TYPE.mediumHeader>
          <Image src={IconHammer} size={32} />
        </Box>
        <Box pt={20}>
          <TYPE.white>APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...APEX，无预挖，零预留...</TYPE.white>
        </Box>
      </Card>

      <Box pt={30} style={{ textAlign: 'center' }}>
        <TYPE.largeHeader>合约审计机构</TYPE.largeHeader>
        <Box>
          <Image mt={16} src={IconBeosin} alt="icon beosin" />
        </Box>
        <Box>
          <Image mt={48} src={IconLogo} alt="apex logo" />
        </Box>
        <Box>
          <Link href="mailto:support@apexswap.org">
            <TYPE.black>support@apexswap.org</TYPE.black>
          </Link>
        </Box>
      </Box>

      <Box width="100%" mt={24} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, max-content)',
        columnGap: '6px',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        <Link href="#">
          <Image size={24} src={Icon1} alt="icon" />
        </Link>
        <Link href="#">
          <Image size={24} src={Icon2} alt="icon" />
        </Link>
        <Link href="#">
          <Image size={24} src={Icon3} alt="icon" />
        </Link>
        <Link href="#">
          <Image size={24} src={Icon4} alt="icon" />
        </Link>
        <Link href="#">
          <Image size={24} src={Icon5} alt="icon" />
        </Link>
      </Box>
    </>
  )
}

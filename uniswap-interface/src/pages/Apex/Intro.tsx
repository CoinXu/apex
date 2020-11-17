import React from 'react'
import Card from '../../components/Card'
import { Box, Image, Link } from 'rebass'
import { TYPE } from '../../theme'

import IconCup from '../../assets/images/apex/icon_cup.png'
import IconHammer from '../../assets/images/apex/icon_hammer.png'
import IconBeosin from '../../assets/images/apex/icon_beosin_1.png'
import IconLogo from '../../assets/images/apex/icon_logo.png'
import Icon1 from '../../assets/images/apex/icon_1_1.png'
import Icon2 from '../../assets/images/apex/icon_1_2.png'
import Icon3 from '../../assets/images/apex/icon_1_3.png'
import Icon4 from '../../assets/images/apex/icon_1_4.png'
import Icon5 from '../../assets/images/apex/icon_1_5.png'

export default function Intro() {
  return (
    <>
      <TYPE.largeHeader textAlign="center" mt={32} color="primary1">
        APEX Swap
      </TYPE.largeHeader>
      <Card
        mt={20}
        padding="0"
        border="1px solid #8fca97"
        overflow="hidden"
        borderRadius="24px 0 24px 0">
        <Box
          style={{
            backgroundImage: 'linear-gradient(to right, #7ac987, #028073)',
            padding: '0.5rem 1.25rem'
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <TYPE.mediumHeader color="#fff">流动性挖矿</TYPE.mediumHeader>
          <Image src={IconHammer} size={32} />
        </Box>
        <Box pt={20} backgroundColor="#8fca97" padding="1rem">
          <TYPE.body color="white">
            APEX，无预挖，零预留，超共识阶梯式减产机制，合约私钥即时销毁，流动池永久开放，与玩家共同创造一个开放与自由的去中心化金融世界。
          </TYPE.body>
        </Box>
      </Card>
      <Card
        mt={20}
        padding="0"
        border="1px solid #8fca97"
        overflow="hidden"
        borderRadius="24px 0 24px 0">
        <Box
          style={{
            backgroundImage: 'linear-gradient(to right, #7ac987, #028073)',
            padding: '0.5rem 1.25rem'
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <TYPE.mediumHeader color="#fff">Top10</TYPE.mediumHeader>
          <Image src={IconCup} size={32} />
        </Box>
        <Box pt={20} backgroundColor="#8fca97" padding="1rem">
          <TYPE.body color="white">
            Top10竞赛机制，将吸引更多令牌玩家的加入，分享属于个人的财富盛宴，这是一场基于区块链，去中心化的现实版头号玩家，APEX机制由智能合约运行，无法篡改，一经创世开启将永久运行下去。
          </TYPE.body>
        </Box>
      </Card>

      <Box pt={30} style={{ textAlign: 'center' }}>
        <TYPE.mediumHeader color="primary1">合约审计机构</TYPE.mediumHeader>
        <Box>
          <Image mt={16} src={IconBeosin} width="102px" height="49px" alt="icon beosin" />
        </Box>
        <Box>
          <Image mt={10} src={IconLogo} width="84px" height="28px" alt="apex logo" />
        </Box>
        <Box mt="8px">
          <Link href="mailto:support@apexswap.org">
            <TYPE.black fontSize={14} fontWeight={0} style={{ color: '#333' }}>support@apexswap.org</TYPE.black>
          </Link>
        </Box>
      </Box>

      <Box width="100%" mt={12} sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, max-content)',
        columnGap: '6px',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        <Link href="https://t.me/apexswap">
          <Image size={45} src={Icon1} alt="icon" />
        </Link>
        <Link href="https://twitter.com/apexswap">
          <Image size={45} src={Icon5} variant="avatar" alt="icon" />
        </Link>
        <Link href="https://discord.gg/xr7rPt6Es5">
          <Image size={45} src={Icon4} variant="avatar" alt="icon" />
        </Link>
        <Link href="https://medium.com/@apexswap">
          <Image size={45} src={Icon3} variant="avatar" alt="icon" />
        </Link>
        <Link href="mailto:support@apexswap.org">
          <Image size={45} src={Icon2} variant="avatar" alt="icon" />
        </Link>
      </Box>
    </>
  )
}

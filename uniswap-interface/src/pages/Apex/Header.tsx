import React from 'react'
import { Box, Image } from 'rebass'
import { ButtonPrimary } from '../../components/Button'
import { TYPE } from '../../theme'
import { useActiveWeb3React } from '../../hooks'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import i18n from '../../i18n'

import ApexLogo from '../../assets/images/apex/icon_logo.png'

const StyledLine = styled.div<{ width: number }>`
  margin-bottom: 3px;
  margin-top: 3px;
  width: ${({ width }) => `${width}px`};
  height: 2px;
  background: #007F73;
`

const IconThreeLine = React.forwardRef<any, any>(({ children, onClick }, ref) => (
  <Box ref={ref} onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}>
    <StyledLine width={14} />
    <StyledLine width={10} />
    <StyledLine width={7} />
    {children}
  </Box>
));

const IconEN = React.forwardRef<any, any>(({ children, onClick }, ref) => (
  <Box ref={ref} onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}>
    <TYPE.main color="primary1" fontSize={14} fontWeight={0}>EN</TYPE.main>
  </Box>
));

function scrollIntoView(selector: string, offset: number = 46) {
  const element = document.querySelector(selector)
  if (!element) return

  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = element.getBoundingClientRect().top
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })

  // const headerOffset = 46;
  // const elementPosition = element.getBoundingClientRect().top;
  // const offsetPosition = elementPosition - headerOffset;

  // window.scrollTo({
  //   top: offsetPosition,
  //   behavior: "smooth"
  // });

  // if (!selector) return

  // const element = document.querySelector(selector)
  // if (element) {
  //   element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }
}

export default function Header() {
  const { account } = useActiveWeb3React()
  return (
    <Box
      className="apex-header"
      width="100%"
      padding="10px 18px"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 999 }}
      backgroundColor="#fff"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Box>
        <Link to="/">
          <Image src={ApexLogo} alt="apex logo" width="75px" height="25px" />
        </Link>
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        columnGap: '20px',
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
            · {account
              ? account.replace(/^(\w{6})(\w+?)(\w{4})$/, (a, b, c, d) => b + '...' + d)
              : '...'
            }
          </TYPE.subHeader>
        </ButtonPrimary>
        <Box>
          <Dropdown>
            <Dropdown.Toggle as={IconThreeLine} variant="link" id="dropdown-basic">
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => scrollIntoView('#reward-time', 66)}>首页</Dropdown.Item>
              <Dropdown.Item onClick={() => scrollIntoView("#manning")}>
                挖矿
              </Dropdown.Item>
              <Dropdown.Item onClick={() => window.location.href = window.location.origin + '/swap'}>
                兑换
              </Dropdown.Item>
              <Dropdown.Item onClick={() => scrollIntoView("#apex")}>
                流动性
              </Dropdown.Item>
              <Dropdown.Item onClick={() => scrollIntoView("#top10")}>
                Top10
              </Dropdown.Item>
              <Dropdown.Item onClick={() => scrollIntoView("#apex-swap")}>
                APEX
              </Dropdown.Item>
              <Dropdown.Item href="https://t.me/apexswap">Join</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Box>
        <Box className="apex-header-i18n">
          <Dropdown>
            <Dropdown.Toggle as={IconEN} variant="link" id="dropdown-en">
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>EN</Dropdown.Item>
              <Dropdown.Item onClick={() => i18n.changeLanguage('zh-CN')}>中文</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Box>
      </Box>
    </Box>
  )
}

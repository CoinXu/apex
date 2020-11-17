import React, { useState, useEffect } from 'react'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { ButtonPrimary } from '../../components/Button'
import Card from '../../components/Card'
import { Box } from 'rebass'
// import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { apexStake } from '../../hooks/apex'
import { useApexState, useGetApexUserInfoCallback } from '../../state/apex/hooks'
import { TYPE } from '../../theme'
// import { APEX_MAIN_ADRESS } from '../../constants'

// export const StyledBalanceMax = styled.button<{ 
//   width?: string, 
//   height?: string, 
//   padding?: string }>`
//   background-color: ${({ theme }) => theme.primary5};
//   border: 1px solid ${({ theme }) => theme.primary5};
//   border-radius: 0.5rem;
//   font-size: 0.875rem;

//   font-weight: 500;
//   cursor: pointer;
//   margin-right: 0.5rem;
//   color: ${({ theme }) => theme.primaryText1};
//   :hover {
//     border: 1px solid ${({ theme }) => theme.primary1};
//   }
//   :focus {
//     border: 1px solid ${({ theme }) => theme.primary1};
//     outline: none;
//   }

//   width: ${({ width }) => (width ? width: 'auto')};
//   height: ${({ height }) => (height ? height : '28px')};
//   padding: ${({ padding }) => (padding ? padding : '0 0')};
//   text-align: center;
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     margin-right: 0.5rem;
//   `};
// `

export interface CurrencyInputGroupOption {
  value: string | number;
  buttonText: string;
  helpButtonText: string;
  placeholder?: string;
  maxValue: number;
  onUserInput(value: string): void;
  onButtonClick(value: string): void;
}

export function CurrencyInputGroup({
  value,
  helpButtonText,
  buttonText,
  placeholder,
  maxValue,
  onUserInput,
  onButtonClick
}: CurrencyInputGroupOption) {
  const [v, setState] = useState<string>("" + value)
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 50px 80px',
      // gridTemplateColumns: 'auto 80px',
      alignItems: 'center',
      columnGap: '6px'
    }}>
      <Box padding="0.5rem 0 0.5rem 0.5rem">
        <NumericalInput
          fontSize="14px"
          style={{ width: '100%' }}
          value={v}
          placeholder={placeholder}
          onUserInput={val => {
            setState(val)
            onUserInput(val)
          }}
        />
      </Box>
      <Box>
        <TYPE.main 
          onClick={() => setState(maxValue.toString())}
          textAlign="center" 
          fontSize={14} 
          color="primary1">
          {helpButtonText}
        </TYPE.main>
      </Box>
      <Box height="100%">
        <ButtonPrimary 
          onClick={() => onButtonClick(v)}
          padding="2px 4px" 
          width="100%"
          height="100%"
          style={{ background: '#DFF0E9', border: '1px solid #52C18B' }}
          fontSize={14}
          borderRadius="10px">
          <TYPE.main color="primary1" fontSize={14}>
            {buttonText}
          </TYPE.main >
        </ButtonPrimary>
      </Box>
      </Box>
  )
}

export default function Pledge() {
  const state = useApexState()
  const { account } = useActiveWeb3React()
  const getApexUserInfo = useGetApexUserInfoCallback(account || "")

  useEffect(() => { 
    if(account) {
      getApexUserInfo() 
    }
  }, [account])

  console.log(state.userInfo) 
  // 用户质押功能。amount和ETH都使用输入框的值，————质押功能最大值按钮默认32ETH
  return (
    <Card border="1px solid #52C18B" backgroundColor="#fff" padding="0">
      <CurrencyInputGroup
        value=""
        helpButtonText="最大值"
        buttonText="质押"
        placeholder="请输入金额"
        maxValue={32}
        onButtonClick={(value: string) => {
          if (!state.mainContract || !account) return
          apexStake(parseFloat(value), account, state.shareAccount)
        }}
        onUserInput={() => { }} />
    </Card>
  )
}

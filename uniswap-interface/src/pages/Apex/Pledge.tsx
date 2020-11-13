import React from 'react'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { ButtonPrimary } from '../../components/Button'
import Card from '../../components/Card'
import { Box } from 'rebass'
import styled, { } from 'styled-components'

const StyledBalanceMax = styled.button<{ 
  width?: string, 
  height?: string, 
  padding?: string }>`
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  width: ${({ width }) => (width ? width: 'auto')};
  height: ${({ height }) => (height ? height : '28px')};
  padding: ${({ padding }) => (padding ? padding : '0 0')};
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

export interface CurrencyInputGroupOption {
  value: string | number;
  buttonText: string;
  helpButtonText: string;
  placeholder?: string;
  onUserInput(value: string): void;
}

export function CurrencyInputGroup({
  value,
  helpButtonText,
  buttonText,
  placeholder,
  onUserInput
}: CurrencyInputGroupOption) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'auto auto 80px',
      columnGap: '6px'
    }}>
      <Box>
        <NumericalInput
          style={{ width: '100%' }}
          value={value}
          placeholder={placeholder}
          onUserInput={val => {
            onUserInput(val)
          }}
        />
      </Box>
      <Box>
        <StyledBalanceMax width="100%" onClick={() => { }}>{helpButtonText}</StyledBalanceMax>
      </Box>
      <Box>
        <ButtonPrimary 
          padding="2px 4px" 
          width="100%"
          borderRadius="4px">
          {buttonText}
        </ButtonPrimary>
      </Box>
      </Box>
  )
}

export default function Pledge() {
  return (
    <Card border="1px solid green">
      <CurrencyInputGroup
        value=""
        helpButtonText="max"
        buttonText="质押"
        placeholder="请输入金额"
        onUserInput={() => { }} />
    </Card>
  )
}

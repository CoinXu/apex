import React from 'react'
import { CurrencyInputGroup } from './Pledge'
import Card from '../../components/Card'
import { unstake } from '../../hooks/apex'
import { useActiveWeb3React } from '../../hooks'
import { useApexState } from '../../state/apex/hooks'

export default function Pledge() {
  const state = useApexState()
  const { account } = useActiveWeb3React()

  return (
    <Card border="1px solid green">
      <CurrencyInputGroup
        value=""
        helpButtonText="max"
        buttonText="解除质押"
        placeholder="请输入金额"
        onButtonClick={(value: string) => {
          if (!state.mainContract || !account) return
          unstake(state.mainContract, parseFloat(value), account)
        }}
        onUserInput={() => { }} />
    </Card>
  )
}

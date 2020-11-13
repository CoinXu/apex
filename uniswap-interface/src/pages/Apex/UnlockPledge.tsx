import React from 'react'
import { CurrencyInputGroup } from './Pledge'
import Card from '../../components/Card'

export default function Pledge() {
  return (
    <Card border="1px solid green">
      <CurrencyInputGroup
        value=""
        helpButtonText="max"
        buttonText="解除质押"
        placeholder="请输入金额"
        onUserInput={() => { }} />
    </Card>
  )
}

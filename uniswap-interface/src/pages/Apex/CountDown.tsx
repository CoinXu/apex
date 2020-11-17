import React from 'react'
import { Box } from 'rebass'
import { TYPE } from '../../theme'

function toFixed(value: number, length: number = 2): string {
  const sv: string = "" + value
  const vl: number = sv.length
  const n: number = length - vl

  let result = sv

  for (let i = 0; i < n; i++) {
    result = "0" + result
  }

  return result
}

export default function CountDownRender(props: {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean
}) {
  return (
    <Box width="100%" paddingTop="6px" style={{ textAlign: 'center' }}>
      <Box style={{
        display: 'inline-block',
        padding: '6px 16px',
        borderRadius: '24px',
        backgroundColor: '#F1F8F2',
        boxShadow: '2px 6px 6px 1px #dff0e9'
      }}>
        <TYPE.largeHeader
          fontSize={24}
          color="primary1"
          style={{
            textShadow: '0px 4px 5px rgba(0, 127, 115, 0.43)'
          }}
        >
          {
            props.completed 
              ? "00 : 00 : 00 : 00"
              : `${toFixed(props.days)} : ${toFixed(props.hours)} : ${toFixed(props.minutes)} : ${toFixed(props.seconds)}`
          }
        </TYPE.largeHeader>
      </Box>
    </Box>
  )
}

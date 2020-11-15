import { createAction } from '@reduxjs/toolkit'

export const fetchShareCode = createAction<{ share_code: string }>('apex/fetchShareCode')
export const consumeShareCode = createAction<{ account: string }>('apex/consumeShareCode')

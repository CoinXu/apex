import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { abi as ApexTokenABI } from '../constants/abis/ApexToken.json'
import { abi as ApexMainABI } from '../constants/abis/ApexMain.json'
import { abi as ApexExchangeConnectorABI }  from '../constants/abis/ApexExchangeConnector.json'
import { abi as ApexTopReferralsABI }  from '../constants/abis/ApexTopReferrer.json'
import { 
  ROUTER_ADDRESS, APEX_MAIN_ADRESS, APEX_LP_TOKEN_ADRESS, 
  APEX_EXCHANGE_CONNECTOR_ADRESS, APEX_TOP_REFERRER_ADRESS 
} from '../constants'
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER, WETH } from '@uniswap/sdk'
import { TokenAddressMap } from '../state/lists/hooks'
import Web3 from 'web3'
import { Contract as ETHContract } from 'web3-eth-contract'
// import { useActiveWeb3React } from '../hooks'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.'
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}etherscan.io`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
  ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

function createApexContract(abi: any, address: string, library?: Web3Provider): ETHContract {
  const w3: any = window.web3
  const web3 = new Web3(library || w3.currentProvider)
  return new web3.eth.Contract(abi, address)
}

export function getApexLPTokenContract(library?: Web3Provider): ETHContract {
  return createApexContract(ApexTokenABI, APEX_LP_TOKEN_ADRESS, library)
}

export function getApexMainContract(library?: Web3Provider): ETHContract {
  return createApexContract(ApexMainABI, APEX_MAIN_ADRESS, library)
}

export function getApexTopReferrerContract(library?: Web3Provider): ETHContract {
  return createApexContract(ApexTopReferralsABI, APEX_TOP_REFERRER_ADRESS, library)
}

export function getApexExchangeConnectorContract(library?: Web3Provider): ETHContract {
  return createApexContract(ApexExchangeConnectorABI, APEX_EXCHANGE_CONNECTOR_ADRESS, library)
}

export function getApexWETHContract(chainId?: ChainId): ETHContract {
  // const { chainId } = useActiveWeb3React()
  const address: string = chainId ? WETH[chainId].address : WETH[ChainId.MAINNET].address
  // const address: string = '0x80C68d6FF578fbdF7D2aee31BD2FdEf337585319'
  return createApexContract(ApexTokenABI, address)
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === ETHER) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}

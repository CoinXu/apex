export async function fetchShareCode(user_id: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/invivation/create/${user_id}`)
    if (response.ok) {
      return await response.text()
    }
    return ""
  } catch (error) {
    console.debug('Failed to fetch share code', error)
  }
  return ""
}

export async function consumeShareCode(share_code: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/invivation/consume/${share_code}`)
    const account = await response.text()
    if (account) {
      console.debug('share account: %s', account)
    } else {
      console.debug('invalide share code or consumed: %s', share_code)
    }
    return account || "";
  } catch (error) {
    console.debug('Failed to consume share code', error)
  }
  return "";
}

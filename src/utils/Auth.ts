type LSItem = {
  key: string
  value: string
}

export const setLocalStorage = (
  ...items: Array<LSItem>
) => {
  if (items.length !== 0) {
    items.forEach((item) => {
      localStorage.setItem(item.key, item.value)
    })
  }
}

export const removeLocalStorage = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("familyName")
  localStorage.removeItem("givenName")
}

export const getLocalStorage = (...keys: Array<string>) => {
  if (keys.length !== 0) {
    let result: any = {}
    keys.forEach((value) => {
      result[value] = localStorage.getItem(value)
    })
    return result
  } else {
    return null
  } 
}

export const setAuthStorage = (data: any) => {
  const { user, accessToken } = data
    setLocalStorage(
      { key: "token", value: accessToken },
      { key: "username", value: user.username },
      { key: "familyName", value: user.familyName },
      { key: "givenName", value: user.givenName },
    )
}

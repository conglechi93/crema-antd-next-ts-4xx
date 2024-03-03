export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date()
  let expires = ''
  if (exdays > 0) {
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    expires = `expires=${d.toUTCString()}`
  }
  document.cookie = `${cname}=${cvalue} ${
    expires ? `;expires=${expires}` : ''
  };path=/`
}

export const getCookie = (cname: string) => {
  let name = `${cname}=`
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const removeCookie = (cname: string) => {
  document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

export const checkCookie = (name: string) => {
  let user = getCookie(name)
  if (user) {
    return true
  }
  return false
}

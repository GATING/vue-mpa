import { post, put } from '@/utils/request'
import { clearStorage, setStorage } from '@util/auth'

export const fetchLogin = async data => {
  const userInfo = await post('/user/login', data)
  setStorage('token', userInfo.token)
  setStorage('userInfo', userInfo)
}
export const fetchLogout = async () => {
  await put('/user/logout')
  clearStorage()
}

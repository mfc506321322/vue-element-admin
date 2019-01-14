import request from '@/utils/request'

export function getUserList(page=1) {
  return request({
    url: `http://123.206.55.50:15000/users/list?page=${page}`, 
    method: 'get'
  })
}

export function setUserInfo(obj) {
  return request({
    url: `http://123.206.55.50:15000/users/update`, 
    method: 'post',
    data:obj
  })
}

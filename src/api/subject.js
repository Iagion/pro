import request from '@/axios'
import qs from 'qs'
// 获取课程
export function getClass () {
    return request({
      method:'GET',
      url:'classify',
    })
  }
// 删除课程
export function delClass (pk) {
  return request({
    method:'DELETE',
    url:'classify',
    data:{
      pk:pk
    },
    headers:{
      "Content-Type":'application/x-www-form-urlencoded'
    }
  })
}

// 新增课程
export function addClass(name) {
  const formdate = new FormData()
  formdate.append("name",name)
  return request({
    method:'POST',
    url:'classify',
    data:formdate,
  })
}

// 编辑课程
export function editClass(obj){
  return request({
    method:'PUT',
    url:'classify',
    data:qs.stringify(obj),
    headers:{
      "Content-Type":'application/x-www-form-urlencoded'
    }
  })
}
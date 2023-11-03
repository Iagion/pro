import request from '@/axios'
import qs from 'qs'

export function getChapter(pk){
    return request({
        url:'chapter?pk=' + pk
    })
}

export function delChapter(pk){
    return request({
        method:'DELETE',
        url:'chapter',
        data:{
          pk:pk
        },
        headers:{
          "Content-Type":'application/x-www-form-urlencoded'
        }
      })
}

export function addChapter(pk,chapter_name){
    const formdate = new FormData()
    formdate.append("pk",pk)
    formdate.append("chapter_name",chapter_name)
    return request({
      method:'POST',
      url:'chapter',
      data:formdate,
  })
}

export function editChapter(pk,chapter_name){
  console.log(pk);
  return request({
    method:'PUT',
    url:'chapter',
    data:{
      pk:pk,
      chapter_name :chapter_name
    },
    headers:{
      "Content-Type":'application/x-www-form-urlencoded'
    }
  })
}
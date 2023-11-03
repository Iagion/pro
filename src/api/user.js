import request from '@/axios'
import qs from 'qs'
export function login (data) {
    //formdata格式
    // let formdata = new FormData()
    // formdata.append('username',data.username)
    // formdata.append('password',data.password)
    // formdata.append('uuid',data.uuid)
    // formdata.append('text',data.text)
    return request ({
        method: 'POST',
        data: qs.stringify(data), //form表单格式
        // data:formdata,//formdata格式
        url: 'supersignin',
        headers:{
        'Content-Type':'application/x-www-form-urlencoded'
        }//form表单格式
    })  
}

export function profile(token){
    return request({
        url:'superprofile',
        headers:{
            authorization:`Bearer ${token}`
        }
    })
}


//修改头像
export function uploadAvatar(token,file){
    let formdata = new FormData()
    formdata.append('avator',file)
    return request({
        url:'changesuperavator',
        method:"POST",
        data:formdata
    })
}

export function generateAccount(token,username){
    let formdata = new FormData()
    formdata.append('username',username)
    return request({
        url:'createsuperuser',
        method:"POST",
        data:formdata,
    })
}

export function emailCaptcha(email){
    return request({
        method:'POST',
        url:'superbindemail',
        data:{
            email:email
        },
        headers:{
          "Content-Type":'application/x-www-form-urlencoded'
        }
      })
}

export function emailbind(text){
    return request({
        method:'PUT',
        url:'superbindemail',
        data:{
            text:text
        },
        headers:{
          "Content-Type":'application/x-www-form-urlencoded'
        }
      })
}

export function passwordCaptcha(){
    return request({
        method:'POST',
        url:'superchangepwd'
      })
}
import  axios  from "axios"

let token=localStorage.getItem('token')

//create axios with token authorization
export const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
})
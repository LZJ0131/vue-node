import axios from './http'



const user={
  getuser(){
    return axios.get('/api/users/getuser')
  },
  deluser(params){
    return axios.get('/api/users/deluser',{
      params:params
    })
  },
  changeuser(params){
    return axios.post('/api/users/changeuser',params)
  },
  searchuser(params){
    return axios.post('/api/users/searchuser',params)
  }
}
export default user



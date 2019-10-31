import axios from 'axios'
import {config} from '@/config'

async function users(store){
  try{
    const res = await axios.get(config.apiURL + '/users', {
      params: {
        userActive: true
      }
    })
    return res.data.users
  }
  catch{
  }
}

export default users

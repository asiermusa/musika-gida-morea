import {config} from '@/config'
import axios from 'axios'
const utils = {
  _regions(e){
    let region = null
    if(e == 'AR') region = {'label': 'ARABA', 'value': e}
    else if(e == 'BI') region = {'label': 'BIZKAIA', 'value': e}
    else if(e == 'GI') region = {'label': 'GIPUZKOA', 'value': e}
    else if(e == 'LA') region = {'label': 'LAPURDI', 'value': e}
    else if(e == 'NA') region = {'label': 'NAFARROA', 'value': e}
    else if(e == 'BN') region = {'label': 'BEHE NAFARROA', 'value': e}
    else if(e == 'ZU') region = {'label': 'ZUBEROA', 'value': e}

    return region
  },
  async _bands(params){
    const user = await axios.get(config.apiURL + '/bands', { params })
    try{
      return user.data.bands
    }
    catch (err) {
      console.warn(err)
    }
  }
}

export default utils

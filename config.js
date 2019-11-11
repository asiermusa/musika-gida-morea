const env = process.env.NODE_ENV || 'development';
let keys = null

let countryList = [
  {label: 'ARABA', value: 'AR'},
  {label: 'BIZKAIA', value: 'BI'},
  {label: 'GIPUZKOA', value: 'GI'},
  {label: 'LAPURDI', value: 'LA'},
  {label: 'NAFARROA', value: 'NA'},
  {label: 'BEHE NEFARROA', value: 'BN'},
  {label: 'ZUBEROA', value: 'ZU'},
]

let socialList = [
  'WEBGUNEA',
  'BANDCAMP',
  'TWITTER',
  'FACEBOOK',
  'INSTAGRAM',
]

if (env == 'development'){
  keys = {
    apiURL: 'http://127.0.0.1:5000/api/v1',
    serverURL: 'http://127.0.0.1:5000',
    backendCallbackSLUG: '',
    countryList,
    socialList,
    title: 'Musika Gida Morea ♀',
    pushTopic: 'musikaMorea11-06'
  }
}
else{
  keys = {
    apiURL: 'https://api-gidamorea.com.es/gidamorea-jwt/api/v1',
    serverURL: 'https://api-gidamorea.com.es/gidamorea-jwt',
    backendCallbackSLUG: '/gidamorea-jwt',
    countryList,
    socialList,
    title: 'Musika Gida Morea ♀',
    pushTopic: 'musikaMorea11-06'
  }
}

export const config = keys

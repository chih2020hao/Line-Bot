import axios from 'axios'
import csv from 'csvtojson'

const getData = async () => {
  // const filepath = 'data.csv'
  // csv()
  //   .fromFile('data.csv')
  //   .then((jsonObj) => {
  //     console.log(jsonObj)
  //   })
  // const response = await axios.get('https://data.taipei/api/getDatasetInfo/downloadResource?id=8ef1626a-892a-4218-8344-f7ac46e1aa48&rid=0d635fa0-2a02-4278-af79-415d2d27207b')
  // csv()
  //   .fromString(response)
  //   .then((jsonObj) => {
  //     console.log(jsonObj)
  //   })
  const response = await axios.get('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/csv/file')

  const json = await csv().fromString(response.data)
  console.log(json)
}
getData()

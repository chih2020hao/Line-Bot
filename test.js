import axios from 'axios'
import csv from 'csvtojson'

const getKeyWord = async () => {
  // const filepath = 'data.csv'
  // csv()
  //   .fromFile(filepath)
  //   .then((jsonObj) => {
  //     console.log(jsonObj)
  //   })
  const response = await axios.get('data.csv')
  console.log(response)
}
getKeyWord()

import axios from 'axios'
import csv from 'csvtojson'
import schedule from 'node-schedule'

const getData = async () => {
  const response = await axios.get('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/csv/file')

  const json = await csv().fromString(response.data)
  console.log('json')
}
getData()

const rule = new schedule.RecurrenceRule()
const time = [0, 15, 30, 45]
rule.minute = time

schedule.scheduleJob(rule, () => {
  getData()
})

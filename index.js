import linebot from 'linebot'
import dotenv from 'dotenv'
import axios from 'axios'
import scheduld from 'node-scheduld'
import csv from 'csvtojson'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

let dataTaipei = []
let dataNewTaipei = []

const updateData = async () => {
  const res1 = await axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
  const res2 = await axios.get('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/csv/file')
  dataTaipei = res1.data
  dataNewTaipei = await csv().fromString(res2.data)
}

scheduld.scheduldJob('* 30 * * * *', () => {
  updateData()
})
updateData()

bot.on('message', async event => {
  try {
    const location = event.message.location
    let reply = ''
    const address = location.address.slice(0, 3)

    if (address === 243) {
      reply = 'boom!'
    }
    // for (const data of dataTaipei) {
    //   if (data.title === text) {
    //     reply = data.showInfo[0].locationName
    //     break
    //   }
    // }

    reply = (reply.length === 0) ? '找不到資料' : reply
    event.reply(reply)
  } catch (error) {
    event.reply('發生了錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})

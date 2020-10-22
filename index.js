import linebot from 'linebot'
import dotenv from 'dotenv'
import axios from 'axios'
import scheduld from 'node-scheduld'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

let exhubitions = []

const updateData = async () => {
  const response = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
  exhubitions = response.data
}

scheduld.scheduldJob('* * 0 * * *', () => {
  updateData()
})

updateData()

bot.on('message', async event => {
  try {
    const text = event.message.text
    let reply = ''

    for (const data of exhubitions) {
      if (data.title === text) {
        reply = data.showInfo[0].locationName
        break
      }
    }

    reply = (reply.length === 0) ? '找不到資料' : reply
    event.reply(reply)
  } catch (error) {
    event.reply('發生了錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})

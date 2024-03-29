import { WechatyBuilder } from 'wechaty'
import { onLogin, onScan ,onMessage} from './onListener.js'
import { request } from './db.js'


async function main () {
  const bot = WechatyBuilder.build()
  bot
    .on('scan', onScan)
    .on('login',onLogin)
    .on('message',onMessage)
  await bot.start()
}

main()
  .catch(console.error)
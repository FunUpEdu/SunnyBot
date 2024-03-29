import qrTerm from 'qrcode-terminal'
import { request } from './db'
import { bind, mineData, myBind } from './services';
let roomList = request('/get_rooms')

function isInRoomList(roomName) {
    for (let i = 0; i < roomList.length; i++) {
        const room = roomList[i];
        if (room === roomName) {
            return true
        }
    }
    return false
}
export async function onScan(qrcode, status) {
    qrTerm.generate(qrcode, { small: true })
}
export async function onLogin(user) {
    console.log(`User ${user} logged in`)
}
/**
 * 
 * @param {MessageInterface} msg 
 */
export async function onMessage(msg) {
    const room = msg.room()
    if (room) {
        const topic = await room.topic()
        if ( isInRoomList(topic)) {
            const text = msg.text()
            if (msg.type() == bot.Message.Type.Text) {
                const text = msg.text()
                const talker = msg.talker()
                if (text.startsWith("菜单")) {
                    room.say("🎈菜单:\n🎈我的绑定\n🎈绑定#学号\n🎈我的数据\n🎈今日数据\n🎈开启定时\n🎈关闭定时\n🎈我的定时\n🎈排行榜")
                }
                if (text.startsWith("我的绑定")) {
                    myBind(msg,room,talker)
                }
                if (text.startsWith("绑定")) {
                    bind(msg, room, talker)
                }
                if (text.startsWith("我的数据")) {
                    mineData(msg,room,talker)
                }
                if (text.startsWith("今日数据")) {
                    todayData(msg, room)
                }
                // if (text.startsWith("排行榜")) {
                //     room.say(await generateRank(await room.topic()))
                // }
                // if (text.toLowerCase().startsWith("pk")) {
                //     let atName = text.split('@')[1]
                //     if (atName == undefined) return
                //     room.say(await pk(await msg.talker().name(), atName))
                // }
            }
        }
    }
}
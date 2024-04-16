import qrTerm from 'qrcode-terminal'
import {request} from './db.js'
import {bind, mineData, myBind, todayData, rank, pk} from './services.js';

let roomList = await request('get_rooms')

function isInRoomList(roomName) {
    for (let i = 0; i < roomList.length; i++) {
        const room = roomList[i].roomName;
        if (room.includes(roomName) || roomName.includes(room)) {
            return true
        }
    }
    return false
}

export async function onScan(qrcode, status) {
    qrTerm.generate(qrcode, {small: true})
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
        if (isInRoomList(topic)) {
            const text = msg.text()
            console.log(`收到消息:${text}\n`)
            if (true) {
                const text = msg.text()
                const talker = msg.talker()
                if (text.startsWith("菜单")) {
                    room.say("🎈菜单:\n🎈我的绑定\n🎈绑定#学号\n🎈我的数据\n🎈今日数据\n🎈排行榜")
                }
                if (text.startsWith("我的绑定")) {
                    myBind(msg, room, talker)
                }
                if (text.startsWith("绑定")) {
                    bind(msg, room, talker)
                }
                if (text.startsWith("我的数据")) {
                    mineData(msg, room, talker)
                }
                if (text.startsWith("今日数据")) {
                    todayData(msg, room, talker)
                }
                if (text.startsWith("排行榜")) {
                    rank(msg, room, talker)
                }
                if (text.toLowerCase().startsWith("pk")) {
                    pk(msg, room, talker)
                }
                if (text.startsWith("刷新群组")) {
                    roomList = await request('get_rooms')
                }
            }
        }
    }
}
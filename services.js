import { request } from "./db.js";

export async function myBind(msg,room,talker) {
    const name = await msg.talker().name()
    const data = await request('get_bind', `wxName=${name}`)
    if (data.code == '400' || data.code == 400) {
        room.say("\n您还未绑定",talker)   
    } else {
        room.say(`\n您的绑定为:${data.stuId}`,talker)
    }
}
export async function bind(msg, room, talker) {
    const name = await msg.talker().name()
    let text = await msg.text()
    text = text.replace(" # ", "#")
    text = text.replace("井", "#")
    text = text.trim()
    request('bind', `wxName=${name}&stuId=${text.split('#')[1]}&stuPwd=${text.split('#')[1]}`)
    room.say("\n发送请求成功",talker)
}
export async function mineData(msg,room,talker) {
    let result = '\n'
    const name = await msg.talker().name()
    const data = await request('get_data_by_name', `wxName=${name}`)
    if (data == null) {
        room.say("服务器错误", talker)
    } else {
        if (data.code == '400' || data.code == 400) {
            room.say("您还未绑定", talker)
        } else {
            const speed = data.averageSpeed
            const count = data.count
            const raw = data.data
            for (let i = 0; i < raw.length; i++){
                if (i == raw.length) {
                    result = result + `${raw[i].runnerTime} ${raw[i].runnerMileage} ${raw[i].runnerSpeed} ${raw[i].ok}`
                } else {
                    result = result + `${raw[i].runnerTime} ${raw[i].runnerMileage} ${raw[i].runnerSpeed} ${raw[i].ok}\n`
                }
            }
            result += `\n🏃平均速度:${speed}🏃\n📖总次数:${count}📖\n⬆️当前排名:${data.rank}⬆️`
        }
        room.say(result,talker)
    }
}
export async function todayData(msg, room, talker) {
    const name = await msg.talker().name()
    const data = await request('get_today', `wxName=${name}`)
    if (data == null) {
        room.say("服务器错误", talker)
    } else {
        room.say(`\n${data.msg}`,talker)
    }
}
export async function rank(msg, room, talker) { 
    const name = await msg.talker().name()
    const data = await request('get_rank', "")
    if (data == null) {
        room.say("服务器错误", talker)
    } else {
        let result = '🎈阳光长跑排行榜||只显示前十名🎈\n'
        for (let i = 0; i < data.length; i++) {
        const item = data[i];
            if (i == 0) {
                result += `👑${i}.${item.wxName} ${item.averageSpeed} ${item.count}👑\n`
            } else {
                result += `🎈${i}.${item.wxName} ${item.averageSpeed} ${item.count}🎈\n`
            }
        }
        room.say(result)
    }
}
export async function pk(msg, room, talker) {
    const name = await msg.talker().name()
    const targetName = msg.text().split('@')[1]
    const data = await request('pk', `initName=${name}&targetName=${targetName}`)
    if (data == null) {
        room.say("服务器错误", talker)
    } else {
        room.say(data.msg,talker)
    }
}
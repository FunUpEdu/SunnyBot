import { request } from "./db";

export async function myBind(msg,room,talker) {
    const name = await msg.talker().name()
    const data = await request('my_bind', `wxName=${name}`)
    if (data.code == '400' || data.code == 400) {
        room.say("您还未绑定",talker)   
    } else {
        room.say(`您的绑定为:${data.stuId}`,talker)
    }
}
export async function bind(msg, room, talker) {
    const name = await msg.talker().name()
    let text = await msg.text()
    text = text.split(" # ", "#")
    text = text.split("井", "#")
    text = text.trim()
    request('get_bind', `wxName=${name}&stuId=${text.split('#')[1]}&stuPwd=${text.split('#')[1]}`)
    room.say("绑定成功",talker)
}
export async function mineData(msg,room,talker) {
    let result = ''
    const name = await msg.talker().name()
    const data = await request('get_data_by_name', `wxName=${name}`)
    if (data.code == '400' || data.code == 400) {
        room.say("您还未绑定", talker)
    } else {
        const speed = data.averageSpeed
        const count = data.count
        const raw = data.data
        for (let i = 0; i < raw.length, i++;){
            result = result + `${raw[i].runnerTime} - ${raw[i].runnerSpeed} - ${raw[i].runnerSpeed} - ${raw[i].ok}\n`
        }
        result += `\n平均速度:${speed}\n总次数:${count}`
    }
    room.say(result,talker)
}
export async function todayData(msg, room, talker) {
    // const name = await msg.talker().name()
    // const data = await request('get_today_data', `wxName=${name}`)
    // if (data.code == '400' || data.code == 400) {
    //     room.say("您还未绑定", talker)
    // } else {
    //     room.say(`今日数据:${data.data.runnerTime} - ${data.data.runnerSpeed} - ${data.data.runnerSpeed} - ${data.data.ok}`, talker)
    // }
}
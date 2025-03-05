let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
    let user = global.db.data.users[m.sender]
    let tiempo = 5 * 60
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
        const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
        conn.reply(m.chat, `🎣 Debes esperar *${tiempo2}* para pescar de nuevo.`, m)
        return
    }
    
    let pesca = pickRandom(pescas)
    let rsl = Math.floor(Math.random() * 500)
    cooldowns[m.sender] = Date.now()
    
    let mensaje = `🎣 ${pesca.mensaje} *${toNum(rsl)}* ( *${rsl}* ) yenes 💴.`
    await conn.sendFile(m.chat, pesca.imagen, 'pesca.jpg', mensaje, m)
    
    user.coin += rsl
}

handler.help = ['pescar']
handler.tags = ['economy']
handler.command = ['pescar', 'fish', 'fishing']
handler.group = true
handler.register = true

export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}

function segundosAHMS(segundos) {
    let minutos = Math.floor((segundos % 3600) / 60)
    let segundosRestantes = segundos % 60
    return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

const pescas = [
    { mensaje: "Has atrapado un pez koi y ganas", imagen: "https://qu.ax/QF9k.jpg" },
    { mensaje: "Pescaste un gran atún y obtienes", imagen: "https://qu.ax/3gFj.jpg" },
    { mensaje: "Capturaste un pez espada y ganas", imagen: "https://qu.ax/hYTZ.jpg" },
    { mensaje: "Encontraste una vieja bota en el agua, pero dentro había dinero. Obtienes", imagen: "https://qu.ax/sLJD.jpg" },
    { mensaje: "Atrapas un tiburón pequeño y ganas", imagen: "https://qu.ax/NYqL.jpg" },
    { mensaje: "Lograste sacar un pulpo del agua y obtienes", imagen: "https://qu.ax/JTCz.jpg" },
    { mensaje: "Pescaste una carpa enorme y recibes", imagen: "https://qu.ax/4s7M.jpg" },
    { mensaje: "Sacaste un pez raro y ganas", imagen: "https://qu.ax/L9Bq.jpg" }
]

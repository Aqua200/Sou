let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    if (!m.isGroup) return !1

    let chat = global.db.data.chats[m.chat]
    let delet = m.key.participant
    let bang = m.key.id
    let bot = global.db.data.settings[this.user.jid] || {}

    const isGroupLink = linkRegex.exec(m.text)
    const grupo = `https://chat.whatsapp.com`

    if (isAdmin && chat.antiLink && m.text.includes(grupo)) {
        return conn.reply(m.chat, `～～～  *Ohayō...* ～～～\n  *El anti link está activo, pero como eres admin, te has salvado...* \n  〜 ありがとう 〜`, m)
    }

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }

        await conn.reply(m.chat, `～～～ *E-eh... detecté un enlace...* ～～～\n\n*${await this.getName(m.sender)}, lo siento tanto, pero has enviado un enlace que no está permitido...*\n～～～ すみません ～～～`, m)

        if (!isBotAdmin) {
            return conn.reply(m.chat, `～～～ *Lo siento mucho... No soy admin, no puedo eliminar a nadie...* ～～～\n  ~~~ ごめんなさい ~~~`, m)
        }

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) {
            return conn.reply(m.chat, `～～～ *Oh... esta característica está desactivada... Lo siento mucho...* ～～～\n  ~~~ ごめんなさい ~~~`, m)
        }
    }
    
    return !0
}

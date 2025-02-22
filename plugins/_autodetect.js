let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return;

    const fkontak = { 
        "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    };

    let chat = global.db.data.chats[m.chat];
    let usuario = `@${m.sender.split`@`[0]}`;
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg';

    // Validar que messageStubParameters existe y tiene valores antes de acceder a [0]
    let param = (m.messageStubParameters && m.messageStubParameters.length > 0) ? m.messageStubParameters[0] : '';

    let nombre = `《✧》${usuario} Ha cambiado el nombre del grupo.\n\n> ✦ Ahora el grupo se llama:\n> *${param}*.`;
    let foto = `《✧》Se ha cambiado la imagen del grupo.\n\n> ✦ Acción hecha por:\n> » ${usuario}`;
    let edit = `《✧》${usuario} Ha permitido que ${param === 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo.`;
    let newlink = `《✧》El enlace del grupo ha sido restablecido.\n\n> ✦ Acción hecha por:\n> » ${usuario}`;
    let status = `《✧》El grupo ha sido ${param === 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} Por ${usuario}\n\n> ✦ Ahora ${param === 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje.`;
    
    let admingp = param ? `《✧》@${param.split`@`[0]} Ahora es admin del grupo.\n\n> ✦ Acción hecha por:\n> » ${usuario}` : '';
    let noadmingp = param ? `《✧》@${param.split`@`[0]} Deja de ser admin del grupo.\n\n> ✦ Acción hecha por:\n> » ${usuario}` : '';
    let aceptar = param ? `《✧》Ha llegado un nuevo participante al grupo.\n\n> ◦ ✐ Grupo: *${groupMetadata.subject}*\n\n> ◦ ⚘ Bienvenido/a: @${param.split('@')[0]}\n\n> ◦ ✦ Aceptado por: @${m.sender.split('@')[0]}` : '';

    if (chat.detect && m.messageStubType == 21) {
        await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 22) {
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 23) {
        await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 25) {
        await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 26) {
        await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak });

    } else if (chat.detect2 && m.messageStubType == 27 && param) {
        await conn.sendMessage(m.chat, { text: aceptar, mentions: [`${m.sender}`, `${param}`] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 29 && param) {
        await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${param}`] }, { quoted: fkontak });

    } else if (chat.detect && m.messageStubType == 30 && param) {
        await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${param}`] }, { quoted: fkontak });
    }
}

let cooldowns = {}; // Agrega esta línea para definir la variable cooldowns

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    const time = user.lastberburu + 60000; // 1 minuto de espera
    if (new Date - user.lastberburu < 60000) { // Verifica si el tiempo de espera no ha pasado
        return conn.reply(m.chat, `Por favor, descansa un momento para seguir cazando.\n\n⫹⫺ Tiempo restante: ${clockString(time - new Date())}`, m)
    }

    // Lógica para iniciar la caza
    let rsl = Math.floor(Math.random() * 500); // Yenes ganados
    let damage = Math.floor(Math.random() * 20); // Daño recibido (opcional)

    // Establecer el tiempo de cooldown
    cooldowns[m.sender] = Date.now();

    // Verificar si el usuario tiene suficiente salud para continuar la caza
    if (user.health <= 0) {
        return conn.reply(m.chat, `💔 No tienes suficiente salud para cazar, usa el comando .heal para curarte.`, m);
    }

    // Restar salud al usuario por el daño durante la caza
    user.health -= damage;

    // Si la salud llega a 0 o menos, el usuario se desmaya (opcional)
    if (user.health <= 0) {
        user.health = 0;
        return conn.reply(m.chat, `💔 Te desmayaste durante la caza por falta de salud. Usa .heal para recuperarte.`, m);
    }

    // Obtener el nombre del usuario o su número si no tiene nombre
    let username = m.pushName || m.sender.split('@')[0];

    // Mensajes de la caza
    setTimeout(() => {
        conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Objetivo en radar! 🧚‍♂️🎯*`, null, { mentions: [m.sender] })
    }, 20000);

    setTimeout(() => {
        conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Preparación para la caza! 🗡️*`, null, { mentions: [m.sender] })
    }, 18000);

    setTimeout(() => {
        conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Duende detectado! 🧚‍♂️*`, null, { mentions: [m.sender] })
    }, 15000);

    // Enviar la imagen
    const imageUrl = "https://qu.ax/atpzr.jpeg"; // Reemplaza con la URL de la imagen que desees mostrar
    setTimeout(() => {
        conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `¡Has cazado un duende y ganado *${toNum(rsl)}* yenes! Ahora tienes un total de *${toNum(user.coin + rsl)}* yenes. 💸\n💔 Te queda *${user.health}* de salud.` })
    }, 22000);

    // Actualiza el saldo de yenes en la base de datos
    user.coin += rsl;

    // Actualiza el tiempo de la última caza
    user.lastberburu = new Date * 1;
};

handler.help = ['cazar', 'cazar_duende', 'cazar_duendes'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'cazar_duende', 'duende'];
handler.group = true;
handler.register = true;

export default handler;

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
}

function clockString(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes} minutos y ${seconds} segundos`;
}

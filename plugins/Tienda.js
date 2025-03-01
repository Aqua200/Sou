let handlerBuy = async (m, { conn, usedPrefix }) => {
    let who = m.sender;
    let user = global.db.data.users[who];

    let precio = 1000;  // El precio de una waifu
    if (user.coin < precio) {
        return conn.reply(m.chat, `No tienes suficiente ${moneda} para comprar una waifu.`, m);
    }

    // Lista de waifus con sus nombres y URL de imagen
    const waifus = [
        { name: 'Waifu Sakura', imageUrl: 'https://ejemplo.com/imagen-sakura.jpg' },
        { name: 'Waifu Miku', imageUrl: 'https://ejemplo.com/imagen-miku.jpg' },
        { name: 'Waifu Asuka', imageUrl: 'https://ejemplo.com/imagen-asuka.jpg' }
        // Puedes añadir más waifus a esta lista
    ];

    // Elegir una waifu aleatoria
    let waifu = waifus[Math.floor(Math.random() * waifus.length)];

    // Mostrar la waifu aleatoria
    conn.reply(m.chat, `¡Te ha tocado una waifu aleatoria! Nombre: ${waifu.name}\nPara adquirirla, escribe *${usedPrefix}w*`, m);

    // Comando para adquirir la waifu
    let handlerAcquire = async (m, { conn }) => {
        // Verificar si la waifu ya ha sido adquirida por otro usuario
        if (Object.values(global.db.data.users).some(user => user.waifus.some(w => w.name === waifu.name))) {
            return conn.reply(m.chat, `Esta waifu ya ha sido adquirida por otro usuario y no está disponible para ti.`, m);
        }

        if (user.coin < precio) {
            return conn.reply(m.chat, `No tienes suficiente ${moneda} para adquirir esta waifu.`, m);
        }

        user.coin -= precio;  // Resta el dinero de la cartera
        if (!user.waifus) user.waifus = [];  // Asegúrate de que el usuario tenga un arreglo de waifus
        user.waifus.push(waifu);  // Añade la waifu al inventario del usuario

        conn.reply(m.chat, `¡Has adquirido a ${waifu.name}! Ahora tienes: ${user.waifus.map(w => w.name).join(', ')}`, m);
    }

    handlerAcquire.command = ['w'];  // Este comando será el que adquiera la waifu
    return handlerAcquire;
}

handlerBuy.help = ['comprarwaifu'];
handlerBuy.tags = ['rpg'];
handlerBuy.command = ['comprarwaifu'];

export default handlerBuy;

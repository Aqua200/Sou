let handlerBuy = async (m, { conn, usedPrefix }) => {
    let who = m.sender;
    let user = global.db.data.users[who];

    let precio = 1000;  // El precio de una waifu

    if (user.coin < precio) {
        return conn.reply(m.chat, `No tienes suficiente ${moneda} para comprar una waifu.`, m);
    }

    user.coin -= precio;  // Resta el dinero de la cartera
    let waifu = `Waifu ${user.waifus.length + 1}`;  // Aquí puedes cambiar por el nombre de la waifu deseada
    if (!user.waifus) user.waifus = [];  // Asegúrate de que el usuario tenga un arreglo de waifus
    user.waifus.push(waifu);  // Añade la waifu al inventario del usuario

    conn.reply(m.chat, `¡Has comprado una waifu! Ahora tienes: ${user.waifus.join(', ')}`, m);
}

handlerBuy.help = ['comprarwaifu'];
handlerBuy.tags = ['rpg'];
handlerBuy.command = ['comprarwaifu'];

export default handlerBuy;

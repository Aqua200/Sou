let handlerBuy = async (m, { conn, usedPrefix }) => {
    let who = m.sender;
    let user = global.db.data.users[who];

    let precio = 1000;  // El precio de una waifu
    if (user.coin < precio) {
        return conn.reply(m.chat, `No tienes suficiente ${moneda} para comprar una waifu.`, m);
    }

    user.coin -= precio;  // Resta el dinero de la cartera
    if (!user.waifus) user.waifus = [];  // Asegúrate de que el usuario tenga un arreglo de waifus

    // Nombre y URL de la waifu que deseas añadir
    let waifuName = 'Waifu Sakura';  // Aquí puedes cambiar el nombre de la waifu
    let waifuImageUrl = 'https://ejemplo.com/imagen-sakura.jpg';  // Aquí puedes cambiar la URL de la imagen de la waifu

    // Crea un objeto para la waifu con nombre y URL de la imagen
    let waifu = {
        name: waifuName,
        imageUrl: waifuImageUrl
    };

    user.waifus.push(waifu);  // Añade la waifu al inventario del usuario

    conn.reply(m.chat, `¡Has comprado a ${waifuName}! Ahora tienes: ${user.waifus.map(w => w.name).join(', ')}`, m);
}

handlerBuy.help = ['comprarwaifu'];
handlerBuy.tags = ['rpg'];
handlerBuy.command = ['comprarwaifu'];

export default handlerBuy;

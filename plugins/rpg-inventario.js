import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
    // Verifica si 'm.mentionedJid' está vacío
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    // Verifica si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, 'El usuario no se encuentra en mi base de datos.', m);
    }

    // Verifica si la propiedad 'coin' y otras existen en el usuario
    let user = global.db.data.users[who];
    user.coin = user.coin || 0;
    user.bank = user.bank || 0;
    user.emerald = user.emerald || 0;
    user.iron = user.iron || 0;
    user.gold = user.gold || 0;
    user.coal = user.coal || 0;
    user.stone = user.stone || 0;
    user.exp = user.exp || 0;
    user.health = user.health || 100;
    user.diamond = user.diamond || 0;
    user.candies = user.candies || 0;
    user.gifts = user.gifts || 0;
    user.joincount = user.joincount || 0;
    user.premium = user.premium || false;
    user.lastAdventure = user.lastAdventure || null;

    // Si no tiene armas, inicializarlo
    user.weapons = user.weapons || [];  // Armas en el inventario del usuario
    user.weapon = user.weapon || null; // Arma equipada

    // Prepara los datos
    let name = conn.getName(who);
    let premium = user.premium ? '✅' : '❌';
    let weaponList = '╭━〔 Inventario de ' + name + ' 〕⬣\n' +
                     `┋ 💸 *Moneda en Cartera:* ${user.coin}\n` +
                     `┋ 🏦 *Moneda en Banco:* ${user.bank}\n` + 
                     `┋ ♦️ *Esmeraldas:* ${user.emerald}\n` + 
                     `┋ 🔩 *Hierro:* ${user.iron}\n` +  
                     `┋ 🏅 *Oro:* ${user.gold}\n` + 
                     `┋ 🕋 *Carbón:* ${user.coal}\n` +  
                     `┋ 🪨 *Piedra:* ${user.stone}\n` +  
                     `┋ ✨ *Experiencia:* ${user.exp}\n` + 
                     `┋ ❤️ *Salud:* ${user.health}\n` + 
                     `┋ 💎 *Diamantes:* ${user.diamond}\n` +   
                     `┋ 🍬 *Dulces:* ${user.candies}\n` + 
                     `┋ 🎁 *Regalos:* ${user.gifts}\n` + 
                     `┋ 🎟️ *Tokens:* ${user.joincount}\n` +  
                     `┋ ⚜️ *Premium:* ${premium}\n` + 
                     `┋ ⏳ *Última Aventura:* ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca'}\n` + 
                     `┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n`;

    // Mostrar armas disponibles en el inventario
    if (user.weapons.length > 0) {
        weaponList += `┋ ⚔️ *Armas en Inventario:*\n`;
        user.weapons.forEach((weapon, index) => {
            weaponList += `  ${index + 1}. ${weapon.name} (Daño: +${weapon.attack})\n`;
        });
    } else {
        weaponList += `┋ ⚔️ *No tienes armas en tu inventario.*\n`;
    }

    weaponList += '╰━━━━━━━━━━━━⬣';

    // Imagen que se enviará
    let img = 'https://qu.ax/fRMNm.jpg';

    // Enviar el inventario
    try {
        await conn.sendFile(m.chat, img, 'yuki.jpg', weaponList, m);
    } catch (error) {
        console.error("Error al enviar el archivo:", error);
        conn.reply(m.chat, 'Hubo un error al intentar mostrar el inventario.', m);
    }
}

// Comando para crear armas
let createWeaponHandler = async (m, { conn, text }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    // Verifica si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, 'El usuario no se encuentra en mi base de datos.', m);
    }

    let user = global.db.data.users[who];

    // Verifica si el usuario tiene suficientes recursos
    let requiredIron = 5;  // Ejemplo: se requieren 5 de hierro para crear una espada
    let requiredGold = 3;  // Ejemplo: se requieren 3 de oro

    if (user.iron < requiredIron || user.gold < requiredGold) {
        return conn.reply(m.chat, 'No tienes suficientes recursos para crear una arma. Necesitas 5 de hierro y 3 de oro.', m);
    }

    // Crear una nueva arma
    let newWeapon = {
        name: 'Espada de Hierro',  // El nombre de la arma
        attack: 15,  // El daño de la arma
    };

    // Agregar la nueva arma al inventario
    user.weapons.push(newWeapon);

    // Restar los recursos necesarios para crear el arma
    user.iron -= requiredIron;
    user.gold -= requiredGold;

    conn.reply(m.chat, `¡Has creado una nueva arma! *Espada de Hierro* (Daño: +${newWeapon.attack})`, m);
};

createWeaponHandler.help = ['creaarma'];
createWeaponHandler.tags = ['rpg'];
createWeaponHandler.command = ['creaarma'];
createWeaponHandler.group = true;

export default handler;

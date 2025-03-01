import db from '../lib/database.js';

let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];

    if (!args[0]) {
        return conn.reply(m.chat, `🔨 *Forja del Maestro Hakari*\n\nElige un arma para fabricar:\n\n🗡️ *Espada de Hierro* - 10 hierro + 5 carbón + ¥1,500\n🗡️ *Espada de Oro* - 10 oro + 5 carbón + ¥5,000\n🗡️ *Espada de Diamante* - 10 diamantes + 5 esmeraldas + ¥15,000\n🗡️ *Espada Legendaria* - 20 diamantes + 10 esmeraldas + 10 oro + ¥40,000\n\nEjemplo: *!forja hierro*`, m);
    }

    let armas = {
        hierro: { iron: 10, coal: 5, yen: 1500, ataque: 10, nombre: "Espada de Hierro" },
        oro: { gold: 10, coal: 5, yen: 5000, ataque: 20, nombre: "Espada de Oro" },
        diamante: { diamond: 10, emerald: 5, yen: 15000, ataque: 35, nombre: "Espada de Diamante" },
        legendaria: { diamond: 20, emerald: 10, gold: 10, yen: 40000, ataque: 70, nombre: "Espada Legendaria" }
    };

    let eleccion = args[0].toLowerCase();
    if (!(eleccion in armas)) return conn.reply(m.chat, "⚠️ No existe esa opción. Usa *!forja* para ver las opciones disponibles.", m);

    let arma = armas[eleccion];

    // Verificar si el usuario tiene los materiales y yenes suficientes
    for (let mat in arma) {
        if (mat !== 'ataque' && mat !== 'nombre' && user[mat] < arma[mat]) {
            return conn.reply(m.chat, `❌ No tienes suficientes recursos para forjar *${arma.nombre}*.\nFaltantes: ${arma[mat] - user[mat]} ${mat}`, m);
        }
    }

    // Restar materiales y yenes
    for (let mat in arma) {
        if (mat !== 'ataque' && mat !== 'nombre') {
            user[mat] -= arma[mat];
        }
    }
    user.sword = arma.nombre;
    user.swordAtk = arma.ataque;

    conn.reply(m.chat, `✅ ¡Has forjado una *${arma.nombre}*! 🗡️\n\nAtaque: ⚔️ +${arma.ataque}\nCosto: ¥${arma.yen}`, m);
};

handler.help = ['forja'];
handler.tags = ['rpg'];
handler.command = ['forja'];

export default handler;

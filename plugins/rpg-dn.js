const xpperdiamond = 1000000;
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buydm/i, '');
  count = count ? (/all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperdiamond) : parseInt(count)) : (args[0] ? parseInt(args[0]) : 1);
  count = isNaN(count) ? 1 : Math.max(1, count);

  if (global.db.data.users[m.sender].exp >= xpperdiamond * count) {
    global.db.data.users[m.sender].exp -= xpperdiamond * count;
    global.db.data.users[m.sender].diamond = (global.db.data.users[m.sender].diamond || 0) + count;
    conn.reply(m.chat, `
┌─「 *COMPRA EXITOSA* 」
‣ *Cantidad comprada*: +${count} 💎
‣ *XP gastado*: -${xpperdiamond * count} XP
└──────────────`, m);
  } else {
    conn.reply(m.chat, `❎ Lo siento, no tienes suficiente *XP* para comprar *${count}* diamantes (1,000,000 XP por cada uno).  
     
Gana más XP jugando con *!daily* o verificando tu saldo con *!balance*.  

Si deseas más diamantes, considera hacer una donación con *!donate* y envía el comprobante a *!owner*.`, m);
  }
};

handler.help = ['buydm', 'buyalldm'];
handler.tags = ['econ'];
handler.command = ['buydm', 'buyalldm'];
handler.group = true;
handler.rpg = true;

module.exports = handler;

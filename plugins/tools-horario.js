import moment from 'moment-timezone';

const handler = async (m, { conn }) => {
  // Definir las zonas horarias
  const zonas = [
    { nombre: 'Peru', zona: 'America/Lima' },
    { nombre: 'Mexico', zona: 'America/Mexico_City' },
    { nombre: 'Bolivia', zona: 'America/La_Paz' },
    { nombre: 'Chile', zona: 'America/Santiago' },
    { nombre: 'Argentina', zona: 'America/Argentina/Buenos_Aires' },
    { nombre: 'Colombia', zona: 'America/Bogota' },
    { nombre: 'Ecuador', zona: 'America/Guayaquil' },
    { nombre: 'Costa Rica', zona: 'America/Costa_Rica' },
    { nombre: 'Cuba', zona: 'America/Havana' },
    { nombre: 'Guatemala', zona: 'America/Guatemala' },
    { nombre: 'Honduras', zona: 'America/Tegucigalpa' },
    { nombre: 'Nicaragua', zona: 'America/Managua' },
    { nombre: 'Panama', zona: 'America/Panama' },
    { nombre: 'Uruguay', zona: 'America/Montevideo' },
    { nombre: 'Venezuela', zona: 'America/Caracas' },
    { nombre: 'Paraguay', zona: 'America/Asuncion' },
    { nombre: 'New York', zona: 'America/New_York' },
    { nombre: 'Asia', zona: 'Asia/Jakarta' },
    { nombre: 'Brasil', zona: 'America/Sao_Paulo' },
    { nombre: 'G.N.Q', zona: 'Africa/Malabo' },
    { nombre: 'París', zona: 'Europe/Paris' }
  ];

  // Generar la información con la hora en cada zona
  const fechaInfo = zonas.map(({ nombre, zona }) => {
    const fecha = moment().tz(zona).format('DD/MM/YYYY HH:mm');
    return `⏱️${nombre}: ${fecha}`;
  }).join('\n');

  // Enviar la información
  await conn.sendMessage(m.chat, {
    text: `「 ZONA-HORARIA ⏰ 」
${fechaInfo}
${String.fromCharCode(8206).repeat(850)}
Zona horaria del servidor actual:\n[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ] ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YYYY HH:mm')}`
  }, { quoted: m });
};

handler.help = ['horario'];
handler.tags = ['info'];
handler.command = ['horario'];

export default handler;

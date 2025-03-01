import translate from '@vitalets/google-translate-api';

const handler = async (m, { args }) => {
  if (!args.length) return m.reply('⚠️ Ingresa (idioma) (texto) para traducir.');

  let lang = args[0].length === 2 ? args[0] : 'es';
  let text = args.slice(lang === 'es' ? 0 : 1).join(' ');

  if (!text && m.quoted?.text) text = m.quoted.text;
  if (!text) return m.reply('⚠️ No hay texto para traducir.');

  try {
    const { text: translated } = await translate(text, { to: lang });
    await conn.reply(m.chat, translated, m);
  } catch (error) {
    await m.reply('❌ Error al traducir.');
  }
};

handler.command = ['translate', 'traducir', 'trad'];
export default handler;

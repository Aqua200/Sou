import translate from '@vitalets/google-translate-api';

const idiomas = {
  inglés: 'en', español: 'es', francés: 'fr', alemán: 'de', italiano: 'it',
  portugués: 'pt', japonés: 'ja', chino: 'zh', ruso: 'ru', coreano: 'ko'
};

const handler = async (m, { args }) => {
  let lang = 'es';
  let text = args.join(' ');

  if (args[0] && args[0].length === 2) {
    lang = args[0];
    text = args.slice(1).join(' ');
  } else if (idiomas[args[0]?.toLowerCase()]) {
    lang = idiomas[args[0].toLowerCase()];
    text = args.slice(1).join(' ');
  }

  if (!text && m.quoted?.text) text = m.quoted.text;
  if (!text) return m.reply('⚠️ Escribe el texto o responde un mensaje.');

  try {
    const { text: translated, from } = await translate(text, { to: lang });
    const detectedLang = from.language.iso.toUpperCase();
    
    await conn.reply(m.chat, `🌍 *${detectedLang} ➜ ${lang.toUpperCase()}*\n${translated}`, m);
  } catch (error) {
    await m.reply('❌ Error al traducir.');
  }
};

handler.command = ['translate', 'traducir', 'trad'];
export default handler;

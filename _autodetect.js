import pkg from 'baileys-pro';

const WAMessageStubType = pkg.default;

export async function before(m, { conn, participants, groupMetadata }) {

    if (!m.messageStubType || !m.isGroup) return;

    const fkontak = {

        "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },

        "message": {

            "contactMessage": {

                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`

            }

        },

        "participant": "0@s.whatsapp.net"

    };

    let chat = global.db.data.chats[m.chat];

    let usuario = `@${m.sender.split`@`[0]}`;

    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg';

    let messages = {

        nombre: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تعديل اسم المجموعة!* ✨

⚜️ بواسطة: ${usuario}

⚜️ الاسم الجديد: *${m.messageStubParameters[0]}*

*╯━━━══━━❪👾❫━━══━━━❍*`,

        foto: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تغيير صورة المجموعة!* ✨

⚜️ بواسطة: ${usuario}

*╯━━━══━━❪👾❫━━══━━━❍*`,

        newlink: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تغيير رابط المجموعة!* ✨

⚜️ بواسطة: ${usuario}

*╯━━━══━━❪👾❫━━══━━━❍*`,

        desc: `*╮━━━══━━❪📝❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تحديث وصف المجموعة!* ✨

⚜️ بواسطة: ${usuario}

📄 *الوصف الجديد:*

${m.messageStubParameters[0]}

*╯━━━══━━❪📝❫━━══━━━❍*`,

        edit: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تعديل إعدادات المجموعة!* ✨

⚜️ بواسطة: ${usuario}

⚜️ الآن يمكن لـ ${m.messageStubParameters[0] == 'on' ? 'الإداريين فقط' : 'الجميع'} التحدث!

*╯━━━══━━❪👾❫━━══━━━❍*`,

        status: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم تعديل إعدادات المجموعة!* ✨

⚜️ بواسطة: ${usuario}

⚜️ الآن يمكن لـ ${m.messageStubParameters[0] == 'on' ? 'الإداريين فقط' : 'الجميع'} التحدث!

*╯━━━══━━❪👾❫━━══━━━❍*`,
       


        admingp: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

✨ *تم ترقية العضو!* ✨

⚜️ ${usuario} قام بترقية @${m.messageStubParameters[0].split`@`[0]}!

⚜️ مبارك لك الترقية! 🎉💖

*╯━━━══━━❪👾❫━━══━━━❍*`,

        noadmingp: `*╮━━━══━━❪👾❫━━══━━━❍*

👑 *𝑯𝑨𝑹𝑶𝑵* 👑

💔 *تم إعفاء عضو من الإدارة!* 💔

⚜️ ${usuario} قام بإعفاء @${m.messageStubParameters[0].split`@`[0]} من منصب الإدارة. 😔

*╯━━━══━━❪👾❫━━══━━━❍*`

    };

    let stubTypeActions = {

        21: "nombre",

        22: "foto",

        23: "newlink",

        24: "desc", // ⬅️ وصف المجموعة

        25: "edit",

        26: "status",
        
        //27: "addusr",

        //28: "kickuser",

        29: "admingp",

        30: "noadmingp"

    };

    // ✅ رسائل إدارية

    if (chat.detect && stubTypeActions[m.messageStubType]) {

        let messageKey = stubTypeActions[m.messageStubType];

        let sendOptions = { mentions: [m.sender] };

        if (messageKey === "foto") {

            await conn.sendMessage(m.chat, { image: { url: pp }, caption: messages[messageKey], ...sendOptions }, { quoted: fkontak });

        } else if (messageKey === "admingp" || messageKey === "noadmingp") {

            await conn.sendMessage(m.chat, { text: messages[messageKey], mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak });

        } else {

            await conn.sendMessage(m.chat, { text: messages[messageKey], ...sendOptions }, { quoted: fkontak });

        }

    }

    

  // ✅ ترحيب بالعضو الجديد

    if (chat.detect && (m.messageStubType === 27 || m.messageStubType === 28)) {

        let newJid = m.messageStubParameters[0];

        let groupName = groupMetadata.subject || "المجموعة";

        let welcomeText = `

╭───⌈ 🎤🎶 أهــلًا وســهــلًا ⌋───╮

┃ 👋🎉 مـرحـبـًا بـالـعـضـو الـجـديـد:

┃ ⌟ @${newJid.split('@')[0]} ⌜

┃ 💙 نـورت مـجـمـوعـة ⌟${groupName}⌜، تـمـنـيـاتـنـا لـك بـوقـت ممتـع!

╰────────────────────╯`.trim();

        await conn.sendMessage(m.chat, {

            text: welcomeText,

            mentions: [newJid]

        }, { quoted: fkontak });

    }
 

    

    // ✅ وداع عضو غادر

    if (chat.detect && m.messageStubType === 32) {

        let leftJid = m.messageStubParameters[0];

        let goodbyeText = `

╭───⌈ 💔👋 وداعًا ⌋───╮

┃ 😢 خــرج الـعـضـو:

┃ ⌟ @${leftJid.split('@')[0]} ⌜

┃ 👋 نتمنّى لك التوفيق، في أمان الله.

╰────────────────────╯`.trim();

        await conn.sendMessage(m.chat, {

            text: goodbyeText,

            mentions: [leftJid]

        }, { quoted: fkontak });

    }

}
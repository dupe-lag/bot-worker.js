// Bot logic worker
const SECRET_TOKEN = 'LOTBLOX_PROTECTED_EXTENSION7X9A2P5R8S3V6Y1Z4';

export default {
  async fetch(request) {
    // Verify request
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    const secret = request.headers.get('x-telegram-bot-api-secret-token');
    if (secret !== SECRET_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    const update = await request.json();
    
    // Your bot logic here
    if (update.message) {
      console.log(`Message from ${update.message.chat.id}: ${update.message.text}`);
      
      // Echo example
      if (update.message.text) {
        await sendMessage(update.message.chat.id, `You said: ${update.message.text}`);
      }
    }
    
    return new Response('OK', { status: 200 });
  }
};

async function sendMessage(chatId, text) {
  const BOT_TOKEN = '7983638744:AAFXkXAT7YgihStuRDJpFR7t4ujRb7FFBOc';
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}

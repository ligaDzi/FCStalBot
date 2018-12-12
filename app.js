const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '754409376:AAHCyGyNHJRYbNN3rwEsTON9W4paBlURD5U';

const bot = new TelegramBot(token, {polling: true});

// Обработка ботом наших команд 
bot.onText(/\/start/, async (msg, match) => {

    const chatId = msg.chat.id;
    
    await bot.sendPhoto(chatId, 'top2013.jpg');
    await bot.sendMessage(chatId, 'ФК Сталь Алчевск Приветствует Вас', {
      reply_markup: {
          inline_keyboard: [
              [                  
                {
                    text: "Состав",
                    callback_data: "team" 
                },
                {
                    text: "Расписание",
                    callback_data: "match"
                },
                {
                    text: "Таблица",
                    callback_data: "table"
                },
                {
                    text: "Новости",
                    callback_data: "news"
                }
              ]
          ]
      }
    }); 
    bot.sendMessage(chatId, 'Если есть вопросы обратитесь к администратору @asergeychuk или посетите наш сайт fcstal.herokuapp.com.');
    bot.sendMessage(chatId, 'Бот написан в качестве примера и не несет достоверной информации.');

});



// Обработка событий 
bot.on('callback_query', async (query) => {
    const id = query.message.chat.id;
    
    switch (query.data) {
        case 'team':        
             
            request('https://fcstal.herokuapp.com/players', function(err, res, body){    
    
                const data = JSON.parse(body);
                let html = require('./conversion/team').convData(data);
        
                bot.sendMessage(id, html, {parse_mode: "HTML"});
            });
            break;

        case 'match':        
             
            request('https://fcstal.herokuapp.com/calendartelebot', function(err, res, body){    
    
                const data = JSON.parse(body);
                
                let html = require('./conversion/match').convData(data);
        
                bot.sendMessage(id, html, {parse_mode: "HTML"}); 
            });
            break;

        case 'table':        
             
            request('https://fcstal.herokuapp.com/tabletelebot', function(err, res, body){    
    
                const data = JSON.parse(body);
                
                let html = require('./conversion/table').convData(data);
        
                bot.sendMessage(id, html, {parse_mode: "HTML"}); 
            });
            break;

        case 'news':        
             
            request('https://fcstal.herokuapp.com/newstelebot', function(err, res, body){    
    
                const data = JSON.parse(body);
                
                let htmlArr = require('./conversion/news').convData(data);

                htmlArr.forEach(news => {
                    
                    bot.sendMessage(id, news, {parse_mode: "HTML"}); 
                });
        
            });
            break;
    
        default:
            break;
    }
    
});

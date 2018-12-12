const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

/* 
    Этот ключ создает бот BotFather в телеграме.
    С помощью BotFather создаются (регестрируются) новые боты в телеграме.
*/
const token = '754409376:AAHCyGyNHJRYbNN3rwEsTON9W4paBlURD5U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Обработка ботом наших команд (команды вводятся так /nameComand)
// Команда /start выполняется при запуске бота
bot.onText(/\/start/, async (msg, match) => {

    const chatId = msg.chat.id;
    
    await bot.sendPhoto(chatId, 'top2013.jpg');
    await bot.sendMessage(chatId, 'ФК Сталь Алчевск Приветствует Вас', {
        // Здесь создаются кнопки для бота
        // inline_keyboard означает, что кнопки будут расположенны в одну строку
      reply_markup: {
          inline_keyboard: [
              [                  
                {
                    text: "Состав",
                    // При нажатии на эту кнопку произойдет событие "callback_query"
                    // и строка "EUR" будет передана на сервер в переменной data.
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
    // в query хранятся данные о пользователи общающимся с ботом и 
    // console.log(query);
    const id = query.message.chat.id;
    
    // Запрос к приватбанку за курсами валют, приватбанк вернет json-объект
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

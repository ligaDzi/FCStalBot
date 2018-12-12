
module.exports = {
    convData: function(data){
         
        let newsArr = [];

        data.forEach((news, i) => {

            newsArr[i] = `
            <b>${news.header}</b>                                 
<a href="https://fcstal.herokuapp.com">полная версия</a> 
        
        "${news.text}"

${news.date}
        
                `;  
        });
        
        return newsArr;        
    }
}
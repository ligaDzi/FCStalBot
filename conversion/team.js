
module.exports = {
    convData: function(data){
                  
        let goalkeepers = data.goalkeepers;
        let backs = data.backs;
        let halfbacks = data.halfbacks;
        let forwards = data.forwards;

        let 
            glkStr = '',
            bStr = '',
            hbStr = '',
            fStr = '';

        goalkeepers.forEach(player => {
            glkStr += `${player.number} - ${player.surname} ${player.name}\n`; 
        });
        backs.forEach(player => {
            bStr += `${player.number} - ${player.surname} ${player.name}\n`; 
        });
        halfbacks.forEach(player => {
            hbStr += `${player.number} - ${player.surname} ${player.name}\n`; 
        });
        forwards.forEach(player => {
            fStr += `${player.number} - ${player.surname} ${player.name}\n`; 
        });
        
        let html = `
    <b>Состав ФК Сталь</b>                                 
<a href="https://fcstal.herokuapp.com">полная версия</a> 
<pre>---------------------------------------------------------</pre>

Вратари
${glkStr}
Защитники 
${bStr} 
Полузащитники
${hbStr} 
Нападающие
${fStr} 
        `; 
        return html;        
    }
}
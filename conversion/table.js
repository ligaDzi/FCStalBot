
module.exports = {
    convData: function(data){
         
        let tableStr = '';
        data.forEach(team => {

            tableStr += `${team.position}          <b>${team.nameTeam}</b> ( <b>${team.points}</b> )\n`; 
        });
        
        let html = `
    <b>Таблица</b>                                 
<a href="https://fcstal.herokuapp.com">полная версия</a> 
<pre>---------------------------------------------------------</pre>

${tableStr}

        `; 
        return html;        
    }
}
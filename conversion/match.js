
module.exports = {
    convData: function(data){
         
        let matchStr = '';
        data.forEach(match => {
            if(match.goalHost === null || match.goalVisit === null){
                match.goalHost = match.goalVisit = ' ';
            }
            matchStr += `${match.day} ${match.year}          <b>${match.nameHostTeam}   ${match.goalHost} : ${match.goalVisit}   ${match.nameVisitTeam}</b>\n`; 
        });
        
        let html = `
    <b>Расписание матчей</b>                                 
<a href="https://fcstal.herokuapp.com">полная версия</a> 
<pre>---------------------------------------------------------</pre>

${matchStr}

        `; 
        return html;        
    }
}
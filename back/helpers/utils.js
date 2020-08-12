
module.exports = () => {
 //convertir un objet DATE en string (dd/mm/yyyy hh/mm) 
    converDateToStr= (d) => {
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        let hour = d.getHours();
        let minutes = d.getMinutes();
        if(minutes < 10 ){
            minutes = '0' + minutes        
        }
        if(hour < 10 ){
            hour = '0' + hour        
        }
        if(month < 10 ){
            month = '0' + month        
        }   
        if(day < 10 ){
            day = '0' + day        
        }
        return day+'/'+month+ '/'+year+' '+hour+':'+minutes;
    }
}
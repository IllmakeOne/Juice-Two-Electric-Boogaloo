

export const formatDate = (date) =>{
    if(date==null)return ''
    var res =''
    res += date.getDate() + '-'
    res += (date.getMonth() + 1 ) + '-'
    res += date.getFullYear() 
    return res
}


// function getMonday(d) {
//     d = new Date(d);
//     var day = d.getDay(),
//         diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
//     return new Date(d.setDate(diff));
//   }
  
//   getMonday(new Date()); // Mon Nov 08 2010
// }
export const getCrtWeek = (date, language) => {
    var zileleweek
    if(language == 'en')
        zileleweek= weekDays
    else 
        zileleweek = zileleSaptamanii
    var curr = date
    var first = curr.getDate() - curr.getDay() + 1
    // var last = first + 6 
    
    var firstday = new Date(curr.setDate(first))
    // var lastday = new Date(curr.setDate(last))
    // console.log(firstday)

    const pairs = zileleweek.map((el, index) => {
        const aux = firstday.getDate() - firstday.getDay() + index + 1
        const auxdate = new Date(firstday.setDate(aux) )
        const xoxoxo = formatDate(auxdate)
        return [el, xoxoxo]
    })
    // console.log(pairs)

    return pairs

}

export const getWeek = (inDate, multiplier,language) => {
    var auxMutiplier = 7
    if(multiplier == 0 ){ // if multiplier specified, then mutiply
        return getCrtWeek(inDate,language)
    }//otherwise it will simply return next week
    auxMutiplier *= multiplier
    const nextweek = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate()+auxMutiplier)
    return getCrtWeek(nextweek,language)
}



const weekDays=[//this will be made into a function for the current day
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday']
    
const zileleSaptamanii=[
    'Luni', 
    'Marti',
    'Miercuri',
    'Joi',
    'Vineri', 
    'Sambata',
    'Duminica']

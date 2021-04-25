

export const formatDate = (date) =>{
    if(date==null)return ''
    var res =''
    res += date.getDate() + '-'
    res += (date.getMonth() + 1 ) + '-'
    res += date.getFullYear() 
    return res
}


export const getNumberOfWeek = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// function getMonday(d) {
//     d = new Date(d);
//     var day = d.getDay(),
//         diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
//     return new Date(d.setDate(diff));
//   }
  
//   getMonday(new Date()); // Mon Nov 08 2010
// }

const getMonday = (date) =>{
    var curr = new Date(date)
    var day = curr.getDay()
    var diff = curr.getDate() - day + (day == 0? -6: 1)
    return new Date(curr.setDate(diff))
}
export const getCrtWeek = (date, language) => {
    var zileleweek
    if(language == 'en')
        zileleweek= weekDays
    else 
        zileleweek = zileleSaptamanii
    var curr = date
    //---initial
    // var first = curr.getDate() - curr.getDay() +1 
    // var firstday = new Date(curr.setDate(first))


    //---seocnd try
    
    var firstday = getMonday(curr)

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


export function humanFriendlyDate(dateArr){
    // in form of string array of format mm, dd, yyyy; dont need yyyy
    let num_month = parseInt(dateArr[0]);
    let month = ""
    switch (num_month) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "Feburary";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
    
        default:
            month = "January"
            break;
    }
    let num_date = parseInt(dateArr[1])
    let finalString = num_date+", "+month;
    return finalString;
}

// export function dateComparator(date1, date2){

// }

export function isToday(dateToBeChecked){
    //input in [mm,dd,yyyy] format
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    if(date === parseInt(dateToBeChecked[1]) && month === parseInt(dateToBeChecked[0]))
        return true;
    else
        return false;
}

export function isUpcoming(dateToBeChecked){
    return true;
}
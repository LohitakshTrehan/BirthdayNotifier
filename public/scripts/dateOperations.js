
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
    let today = getTodayDate()
    if(today.date === parseInt(dateToBeChecked[1]) && today.month === parseInt(dateToBeChecked[0]))
        return true;
    else
        return false;
}

export function isUpcoming(dateToBeChecked){
    return true;
    let calendar = []
    if(isLeapYear(getTodayDate().year)){
        calendar = [31,31,29,31,30,31,30,31,31,30,31,30];
    }
    else{
        calendar = [31,31,28,31,30,31,30,31,31,30,31,30];
    }
    let remainingDays = 30;
    let date = getTodayDate().date
    let month = getTodayDate().month % 12;
    let days = calendar[month]
    remainingDays = remainingDays - (days-date)
    if(remainingDays!==0){
           // roll over to next month, one day subtracts from remaining mnth, so one is subtracted
    }
    else{
        date = date + 30
        if(month===0)
            month = 12
        let lastDate = {
            "date": date,
            "month": month
        }
    }
}

export function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let dateObj = {
        date,
        month,
        year
    }
    return dateObj;
}

function isLeapYear(year){
    year = parseInt(year)
    if(year%4===0){
        if(year%100===0){
            if(year%400===0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}
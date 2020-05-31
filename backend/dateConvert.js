getCleanDate = function() {
    let date = new Date();
    console.log(date);

    let day = date.getUTCDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`
    }
    year = year - 2000;
    if (hour < 10) {
        hour = `0${hour}`;
    }
    if (minute < 10) {
        minute = `0${minute}`;
    }
    let cleanDay = `${day}.${month}.${year}`;
    console.log(cleanDay);
    let cleanTime = `${hour}:${minute}`;
    console.log(cleanTime);
    let dateObj = {
        day: cleanDay,
        time: cleanTime
    };
    return dateObj;
}

exports.getCleanDate = getCleanDate;
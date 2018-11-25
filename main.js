window.onload = function(){
    init();
}

function init(){
    var dateInit = new Date();
    var today = new Date(dateInit);
    resetCalendar();
    clockStart();
    getCurrentDay(today);
    getMonthYear(dateInit);
    getCalendar(dateInit);
    setEventToControls(dateInit);
}

function clockStart(){
    setInterval(updateTime, 1000);
    updateTime();
}

function updateTime(){
    let clock = document.querySelector('.time-now');
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10)
        hours = '0' + hours;    
    let minutes = date.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    let seconds = date.getSeconds();
    if (seconds < 10)
        seconds = '0' + seconds;
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

function setEventToControls(date){

    let eventAction = document.querySelector('.event-action');
    eventAction.addEventListener('click', function(){
        open('https://calendar.google.com/calendar/r?tab=wc');
    });

    let dayAction = document.querySelector('.calendar-dates');
    dayAction.addEventListener('click', function(e){
        if (e.target.classList.contains('day')){
            selectDay(e);
        }
    });

    let setInitialDate = document.querySelector('.date-now');
    setInitialDate.addEventListener('click', function(){
        date = new Date();
        getMonthYear(date);
    });
    let setDateUp = document.querySelector('.up-month');
    setDateUp.addEventListener('click', function(e){
        setMonthYear(e, date);
    });
    let setDateDown = document.querySelector('.down-month');
    setDateDown.addEventListener('click', function(e){
        setMonthYear(e, date);
    });
}

function selectDay(e){
    let allDays = [...document.querySelectorAll('.day')];
    for (let i = 0; i < allDays.length; i++){
        allDays[i].classList.remove('selected-day');
    }
    e.target.classList.add('selected-day');   
    let  dayOfWeek = allDays.indexOf(e.target);
    dayOfWeek += 1;
    let eventOfSelect = document.querySelector(".event-day");
    eventOfSelect.textContent = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'][dayOfWeek%7] + ' ' + e.target.textContent;    
}

function getCurrentDay(date){
    let month_now_rus = ['января','февраля','марта','апреля','май','июня','июля','августа','сентября','октября','ноября','декабря'];
    let currentDay = document.querySelector('.date-now');
    currentDay.textContent = `${date.getDate()} ${month_now_rus[date.getMonth()]} ${date.getFullYear()} г.`;
    currentDay.addEventListener('click', function(){
        resetCalendar();
        getCalendar(date);
        document.querySelector(".event-day").textContent = 'Сегодня';
    });
}

function getMonthYear(date){
    let month_name_rus = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    document.querySelector('.calendar-month-year').textContent = month_name_rus[date.getMonth()]+' '+date.getFullYear();
    return date;
}

function setMonthYear(e, date){
    if (e.target.classList.contains('up-month')){
        date.setMonth(date.getMonth() + 1);
        changeMonth(date);
    } else if (e.target.classList.contains('down-month')){
        date.setMonth(date.getMonth() - 1);
        changeMonth(date);
    }
}

function changeMonth(date){
    resetCalendar();
    getMonthYear(date);
    getCalendar(date);
}

function resetCalendar(){
    let calendar = document.querySelector('.calendar-dates');
    while (calendar.firstChild){      
        calendar.removeChild(calendar.firstChild);
    }
} 

function createCalendar(){
    let calendar = document.querySelector('.calendar-dates');
    for (let i = 0; i < 42; i++){
        let day = document.createElement('div');
        day.classList.add('day');
        calendar.appendChild(day);
    }
    return calendar;
}

function getCalendar(sentDate, dateTemp = new Date()){
    createCalendar();
    let tempDate = new Date(sentDate);
    let allDay = [...document.querySelectorAll('.day')];
    let startDayWeek = (new Date(sentDate.getFullYear(), sentDate.getMonth(), 1).getDay())-1;
    let currentMonthDays = daysInMonth(sentDate);
    let prevMonthDays = daysInMonth(new Date(tempDate.setMonth(tempDate.getMonth()-1)));
    if (startDayWeek < 0) startDayWeek = 6;
    let dayCount = 1;
    let endMonth = false;
    for (let i = startDayWeek-1; i >= 0; i--){
        allDay[i].classList.add('disable-date');
        allDay[i].textContent = prevMonthDays;
        prevMonthDays--;
    }
    for (let i = startDayWeek; i < allDay.length; i++){
        if (dayCount > currentMonthDays){
            endMonth = true;
            dayCount = 1;
            allDay[i].classList.add('disable-date');
        }   else if (endMonth)
                allDay[i].classList.add('disable-date');
            else if ((dayCount === dateTemp.getDate()) && (sentDate.getMonth() === dateTemp.getMonth()) && (sentDate.getFullYear() === dateTemp.getFullYear()))
                allDay[i].classList.add('active-date');
        allDay[i].textContent = dayCount;
        dayCount++;
    }
}

function daysInMonth(getDate){
    return (33 - new Date(getDate.getFullYear(), getDate.getMonth(), 33).getDate());
}

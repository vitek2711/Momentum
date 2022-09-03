'use strict'
import playList from './playList.js';

console.log(playList);

// VARIABLES //
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const name = document.querySelector('.name');
const greetingPlaceholder = document.querySelector('.name');
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
let bgNum;
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
let city = document.querySelector('.city');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let isPlay = false;
let playNum = 0;
const playPauseAudioTrack = document.querySelector('.play');
const playNextTrack = document.querySelector('.play-next');
const playPrevTrack = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const player = document.querySelector('.player');

// for checkbox settings //
const checkboxPlayer = document.querySelector('#player');
const checkboxWeather = document.querySelector('#weather');
const checkboxTime = document.querySelector('#time');
const greetingContainer = document.querySelector('.greeting-container');
const checkboxGreeting = document.querySelector('#greeting');
const checkboxDate = document.querySelector('#date');
const quoteField = document.querySelector('.quote-field');
const checkboxQuote = document.querySelector('#quote');
const checkboxCopyright = document.querySelector('#copyright');
const copyr = document.querySelector('.copyright');

// OBJECTS //
let setObj = {
    setRu: settingsToRus(),
    setEng: settingsToEng(),
    language: 'en-US',
    blocks: ['player', 'weather', 'time', 'date', 'greetings', 'quotes', 'todo'],
};

/// TO-DO LIST ///
const toDo = document.querySelector('.todo-title');
const todoIcon = document.querySelector('#todo-icon');
const todoClose = document.querySelector('#todo-close');
const event = document.querySelector('.event');
const doIt = document.querySelector('.do');
const add = document.querySelector('.add');

/// TIME ///
function showTimer() {
    time.textContent = new Date().toLocaleTimeString();
}

setInterval(showTimer, 1000);

/// DATE ///
function showDate() {
    if (setObj.language === 'en-US') {
        date.textContent = new Date().toLocaleDateString('en-EN', options);
    } else if (setObj.language === 'ru-RU') {
        date.textContent = new Date().toLocaleDateString('ru-RU', options);
    }
}

setInterval(showDate, 500);

/// TIME OF DAY ///
// get time of day
function getTimeOfDay() {
    const hours = new Date().getHours();
    if (setObj.language === 'en-US') {
        if (hours <= 6) {
            greeting.innerHTML = 'Good night,';
        } else if (hours > 6 && hours <= 12) {
            greeting.innerHTML = 'Good morning,';
        } else if (hours > 12 && hours <= 18) {
            greeting.innerHTML = 'Good day,';
        } else if (hours > 18) {
            greeting.innerHTML = 'Good evening,';
        }
    }
    if (setObj.language === 'ru-RU') {
        if (hours <= 6) {
            greeting.innerHTML = 'Доброй ночи,';
        } else if (hours > 6 && hours <= 12) {
            greeting.innerHTML = 'Доброе утро,';
        } else if (hours > 12 && hours <= 18) {
            greeting.innerHTML = 'Добрый день,';
        } else if (hours > 18) {
            greeting.innerHTML = 'Добрый вечер,';
        }
    }

}

setInterval(getTimeOfDay, 500);

//change placeholder of greeting //
function addPlaceholder() {
    if (setObj.language === 'en-US') {
        greetingPlaceholder.placeholder = '[Enter your name]';
    }
    if (setObj.language === 'ru-RU') {
        greetingPlaceholder.placeholder = '[Введите свое имя]';
    }
}

/// LOCAL STORAGE ///
/*if (localStorage.getItem('lang')) setObj.language = localStorage.getItem('lang');*/

// add user name to local storage
function setLocalStorage() {
    localStorage.setItem('name', name.value);
   /* if (setObj.language === 'en-US') {
        localStorage.setItem('lang', setObj.language = 'en-US');
    }
    else if (setObj.language === 'ru-RU') {
        localStorage.setItem('lang', setObj.language = 'ru-RU');
    }*/
}

window.addEventListener('beforeunload', setLocalStorage);

//get from local storage
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocalStorage);

/// SET BACKGROUND ///

// to get random num
let randomNum;

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNum(1, 20);

// set background function //
function setBg() {
    const hour = new Date().getHours();
    //get time of day
    let timeOfDay;
    if (hour <= 6) {
        timeOfDay = 'night';
    } else if (hour > 6 && hour <= 12) {
        timeOfDay = 'morning';
    } else if (hour > 12 && hour <= 18) {
        timeOfDay = 'day';
    } else if (hour > 18 && hour < 24) {
        timeOfDay = 'evening';
    }

    // get bg-num

    if (randomNum > 0 && randomNum < 10) randomNum = '0' + randomNum.toString();
    bgNum = randomNum;

    // set background
    if (timeOfDay === 'night') {
        body.style.backgroundImage = `url(./assets/img/night/${bgNum}.jpg)`;
    } else if (timeOfDay === 'morning') {
        body.style.backgroundImage = `url(./assets/img/morning/${bgNum}.jpg)`;
    } else if (timeOfDay === 'day') {
        body.style.backgroundImage = `url(./assets/img/day/${bgNum}.jpg)`;
    } else if (timeOfDay === 'evening') {
        body.style.backgroundImage = `url(./assets/img/evening/${bgNum}.jpg)`;
    }
}
setBg();

/// GET NEXT & PREV SLIDE ///

//event on click: get next slide
nextSlide.addEventListener('click', () => {
    // next slide function
    function getSlideNext() {
        randomNum++;
        if (randomNum > '20') randomNum = '1';
    }

    getSlideNext()
    setBg();
});

//event on click: get prev slide
prevSlide.addEventListener('click', () => {
    // prev slide function
    function getSlidePrev() {
        randomNum--;
        if (randomNum < '1') randomNum = '20';
    }

    getSlidePrev()
    setBg();
});

/// WEATHER ///
const weatherInfo = document.querySelectorAll('.weather-info');

//get default weather data function
async function getWeather() {
    try {
        if (city.value === '' && setObj.language === 'en-US') city.value = 'Minsk';
        else if (city.value === '' && setObj.language === 'ru-RU') city.value = 'Минск';
        let res;
        if (setObj.language === 'en-US') {
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=6a7a4d30f99d918e2254ddc1a283a131`);
        } else if (setObj.language === 'ru-RU') {
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=6a7a4d30f99d918e2254ddc1a283a131`);
        }
        const data = await res.json();
        city.value = data.name;
        weather.style.justifyContent = "space-between";
        weatherError.style.display = "none";
        weatherInfo.forEach((e) => e.style.display = "flex");
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.innerHTML = `${Math.round(data.main.temp - 273)}&deg;C`;
        weatherDescription.textContent = data.weather[0].description;
        if (setObj.language === 'en-US') {
            windSpeed.innerHTML = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
        }
        if (setObj.language === 'ru-RU') {
            windSpeed.innerHTML = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
            humidity.innerHTML = `Влажность: ${data.main.humidity}%`;
        }
    } catch (e) {
        weather.style.justifyContent = 'flex-start';
        weatherError.style.display = 'flex';
        if (setObj.language === 'en-US') {
            weatherError.textContent = 'Error! Enter your city, please.';
        }
        if (setObj.language === 'ru-RU') {
            weatherError.textContent = 'Ошибка! Пожалуйста, введите правильное название города!'
        }
        weatherInfo.forEach((e) => e.style.display = "none");
    }
}

// add city name to local storage
function setCityToLocalStorage() {
    localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setCityToLocalStorage);

//get from local storage
function getCityToLocalStorage() {
    if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
}

getCityToLocalStorage();

//get new city value
city.addEventListener('keypress', (event) => {
    if (event.code === 'Enter') getWeather();
});
document.addEventListener('DOMContentLoaded', getWeather);


/// QUOTE ///
// quote set function
async function getQuotes() {
    let quotes;
    if (setObj.language === 'en-US') {
        quotes = 'data.json';
    }
    if (setObj.language === 'ru-RU') {
        quotes = 'quotes_ru.json';
    }
    const res = await fetch(quotes);
    const data = await res.json();
    const val = 101;
    let c = Math.ceil(Math.random() * val);
    quote.textContent = data[c].quote;
    author.textContent = data[c].author;

    // quote change function
    changeQuote.addEventListener('click', () => {
        const val = 101;
        let b = Math.ceil(Math.random() * val);
        quote.textContent = data[b].quote;
        author.textContent = data[b].author;
    });
}

getQuotes();

/// AUDIO PLAYER ///
const audio = new Audio();

// play //
playPauseAudioTrack.addEventListener('click', () => {
    function playPauseAudio() {
        if (!isPlay) {
            isPlay = true;
            audio.src = playList[playNum].src;
            audio.currentTime = 0;
            audio.play();
            activeTrack();
        } else {
            isPlay = false;
            audio.pause();
        }
    }

    playPauseAudio();
});

// play-pause button toggle //
function toggleButton() {
    playPauseAudioTrack.classList.toggle('pause');
}

playPauseAudioTrack.addEventListener('click', toggleButton);

// play prev tack //
playPrevTrack.addEventListener('click', () => {
    if (playNum > 0) {
        playNum--
    } else {
        playNum = playList.length - 1;
    }
    activeTrack();
    playTrack();
    playPauseAudioTrack.classList.add('pause');
});

// play next tack //
playNextTrack.addEventListener('click', () => {
    if (playNum < playList.length - 1) {
        playNum++
    } else {
        playNum = 0
    }
    activeTrack();
    playTrack();
    playPauseAudioTrack.classList.add('pause');
});

// create play-list //

playList.forEach(el => {
    playListContainer.innerHTML += `
        <li class='track-name '>${el.title}</li>
    `;
});

const trackName = document.querySelectorAll('.track-name');

// active track
function activeTrack() {
    trackName.forEach((el) => {
        el.classList.remove('play-track');
    });
    trackName[playNum].classList.add('play-track');
}

//play track function
function playTrack() {
    if (audio.play()) {
        isPlay = true;
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        playTrack();
        console.log(playNum)
    }
}

/// Copyright ///
let copyright = document.querySelector('.copyright-text');

function addCopyright() {
    if (setObj.language === 'en-US') {
        copyright.innerHTML = `2022 &copy; developed by ViteK2711`;
    }
    if (setObj.language === 'ru-RU') {
        copyright.innerHTML = `2022 &copy; разработал ViteK2711`;
    }
}

/// TO-DO LIST ///

//change placeholder of greeting //
function addToDoPlaceholder() {
    if (setObj.language === 'en-US') {
        event.placeholder = 'Task to be done ...';
        toDo.textContent = 'to do list';
    }
    if (setObj.language === 'ru-RU') {
        event.placeholder = 'Задание для выполенения...';
        toDo.textContent = 'Список дел';
    }
}

function todoToEng(){
    document.querySelector('.add').textContent ='Add';
}

function todoToRus(){
    document.querySelector('.add').textContent ='Доб';
}

todoIcon.addEventListener('click', (e) => {
    todo.classList.toggle('todo-active');
});

todoClose.addEventListener('click', () => {
    todo.classList.toggle('todo-active');
});

// add task //
add.addEventListener('click', () => {
    if (event.value.length === 0) {
        if (setObj.language === 'en-US') {
            alert('Enter your task please!');
        }
        else if (setObj.language === 'ru-RU') {
            alert('Введите пожалуйста ваше задание!');
        }

    } else {
        doIt.innerHTML += `<div class="doit-block">
            <div class='doit'>
            <span class='task-text'>
                        ${event.value}
                    </span>
            </div>
            <i class="fa-solid fa-trash"></i>
    </div>`;
        event.value = '';
    }

    // remove current task //
    const deleteTask = document.querySelectorAll('.fa-trash');
    for (let i = 0; i < deleteTask.length; i++) {
        deleteTask[i].onclick = function () {
            this.parentNode.remove();
        }
    }
});

/// SETTINGS ///

/// settings to english ///

function settingsToEng() {
    document.querySelector('.settings-title').textContent = 'Settings';
    document.querySelector('.language-title').textContent = 'language:';
    document.querySelector('.show').textContent = 'Show blocks';
    document.querySelector('#player-checkbox').textContent = 'Player';
    document.querySelector('#weather-checkbox').textContent = 'Weather';
    document.querySelector('#time-checkbox').textContent = 'Time';
    document.querySelector('#date-checkbox').textContent = 'Date';
    document.querySelector('#g-checkbox').textContent = 'Greeting';
    document.querySelector('#quote-checkbox').textContent = 'Quote';
    document.querySelector('#copyright-checkbox').textContent = 'Copyright';
}

function settingsToRus() {
    document.querySelector('.settings-title').textContent = 'Настройки';
    document.querySelector('.language-title').textContent = 'Язык:';
    document.querySelector('.show').textContent = 'Показать блоки';
    document.querySelector('#player-checkbox').textContent = 'Плеер';
    document.querySelector('#weather-checkbox').textContent = 'Погода';
    document.querySelector('#time-checkbox').textContent = 'Время';
    document.querySelector('#date-checkbox').textContent = 'Дата';
    document.querySelector('#g-checkbox').textContent = 'Приветствие';
    document.querySelector('#quote-checkbox').textContent = 'Цитата';
    document.querySelector('#copyright-checkbox').textContent = 'Копирайт';
}

/// events on click for settings popup ///
const close = document.querySelector('#close');
const settings = document.querySelector('.settings');
const config = document.querySelector('#config');

close.addEventListener('click', (e) => {
    settings.classList.toggle('hidden');
});

config.addEventListener('click', () => {
    settings.classList.toggle('hidden');
});

// language settings check //
const english = document.querySelector('#en');
const russian = document.querySelector('#ru');
const todo = document.querySelector('.todo');
const checkboxToDo = document.querySelector('#todo');

english.addEventListener('click', () => {
    setObj.language = 'en-US';
    if (russian.classList.contains('lang-active')) {
        english.classList.add('lang-active');
        russian.classList.remove('lang-active');
    }
    addPlaceholder();
    getTimeOfDay();
    getWeather();
    getQuotes();
    addCopyright();
    settingsToEng();
    todoToEng();
    addToDoPlaceholder();
    setLocalStorage();
});

russian.addEventListener('click', () => {
    setObj.language = 'ru-RU';
    if (english.classList.contains('lang-active')) {
        russian.classList.add('lang-active');
        english.classList.remove('lang-active');
    }
    addPlaceholder();
    getTimeOfDay();
    getWeather();
    getQuotes();
    addCopyright();
    settingsToRus();
    todoToRus();
    addToDoPlaceholder();
    setLocalStorage();
});

// checkbox settings //
function isCheckedItem(check, item) {
    if (check.checked) {
        item.classList.remove('hide');
    } else {
        item.classList.add('hide');
    }
}

checkboxPlayer.addEventListener('change', () => {
    isCheckedItem(checkboxPlayer, player);
});

checkboxWeather.addEventListener('change', () => {
    isCheckedItem(checkboxWeather, weather);
});

checkboxTime.addEventListener('change', () => {
    isCheckedItem(checkboxTime, time);
});

checkboxDate.addEventListener('change', () => {
    isCheckedItem(checkboxDate, date);
});

checkboxGreeting.addEventListener('change', () => {
    isCheckedItem(checkboxGreeting, greetingContainer);
});

checkboxQuote.addEventListener('change', () => {
    isCheckedItem(checkboxQuote, quoteField);
});

checkboxCopyright.addEventListener('change', () => {
    isCheckedItem(checkboxCopyright, copyr);
});

checkboxToDo.addEventListener('change', () => {
    isCheckedItem(checkboxToDo, todo);
});







let currIndex = 0
let audio = new Audio()
let clock
let musicList = []
audio.autoplay = true

function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    return document.querySelectorAll(selector)
}

getMusicList(function (list) {
    musicList = list
    loadMusic(list[currIndex])
    generateList(list)
})

audio.ontimeupdate = function () {
    $('.musicbox .progress-now').style.width = (this.currentTime / this.duration) * 100 + '%'
}

audio.onplay = function () {
    clock = setInterval(function () {
        let min = Math.floor(audio.currentTime / 60)
        let sec = Math.floor(audio.currentTime) % 60 + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.musicbox .time').innerText = min + ':' + sec
    }
    )
}

audio.onpause = function pauseMusic() {
    clearInterval(clock)
}

audio.onended = nextSong

$('.music .play').onclick = function () {
    if (!audio.paused) {
        audio.pause()
        this.querySelector('.fa').classList.remove('i-pause')
        this.querySelector('.fa').classList.add('i-bofang')
    }
    else{
        audio.play()
        this.querySelector('.fa').classList.add('i-pause')
        this.querySelector('.fa').classList.remove('i-bofang')
    }
}

$('.musicbox .forward').onclick = nextSong


function nextSong() {
    currIndex = ++currIndex%musicList.length
    console.log(currIndex);
    loadMusic(musicList[currIndex])
}


$('.musicbox .back').onclick = function() {
    currIndex = (musicList.length+(--currIndex))%musicList.length
    console.log(currIndex);
    loadMusic(musicList[currIndex])
}

$('.musicbox .bar').onclick=function(e){
    console.log(e);
    let percent = e.offsetX/parseInt(getComputedStyle(this).width)
    console.log(percent);
    audio.currentTime = audio.duration *percent
}

function loadMusic(musicObj) {
    console.log('begin play', musicObj);
    audio.src = musicObj.src
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .auther').innerText = musicObj.auther
    $('.cover').style.backgroundImage = `url(${musicObj.img})`
}


function getMusicList(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/music.json', true)
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            console.log(this.responseText);
            callback(JSON.parse(this.responseText))
        } else {
            console.log('获取数据失败');
        }
    }
    xhr.onerror = function () {
        console.log('网络异常');
    }
    xhr.send()
}

function generateList(){
    let temp = document.createDocumentFragment()
    musicList.forEach(function(musicObj){
        let node = document.createElement('li')
        node.innerHTML = musicObj.auther+'-'+musicObj.title
        console.log(node);
        temp.appendChild(node)
    })
    $('.list').appendChild(temp)
}
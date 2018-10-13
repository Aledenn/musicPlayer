## musicPlayer小项目

### 实现功能
- 音乐播放，加载背景
- 循环歌曲
- 音乐列表切换歌曲

### 音乐相关API
#### 1. audioObj创建
创建和获取audioObj对象,可以有两种方式
方法一：
```
    <audio id="music"></audio>
    <script>
        var audioObject = document.querySelector('#music')
    </script>
```
方法二：
```

    var audioObj = new Audio('http://音乐src')
```

#### 2. audioObj常用API
```
audioObject.play()   //播放音乐
audioObject.pause()  //暂停
audioObject.autoPlay  //ture为自动播放
audioObject.src  // 设置音乐资源
audioObject.volume   //控制音量0～1
audioObject.loop  //设置或者获取循环状态
audioObject.duration  //获取音乐长度，单位为s
audioObject.currentTime  //获取播放的时间
audioObject.ended  // 判断音乐是否播放完毕，只读属性
```
### 事件
#### playing
当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发
```
    audioObject.addEventListener('playing', function(){
    console.log('playing')
    })

```
#### pause
  当音乐暂停时和结束时触发
#### ended
  当音乐结束时触发
#### timeupdate
  当currentTime更新时会触发timeupdate事件
#### volumechange
  当音量改变时触发


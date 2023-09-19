# Slider 短影片效果

[展示效果](https://slidervideoplay.onrender.com)
https://slidervideoplay.onrender.com

## 說明

### `前端環境`: Raact + Typescript

### `實作方向`: 
  - Slider效果使用swiper
  - 播放器使用plyr，播放檔案為m3u8d檔
  - 影像解碼library為hls.js (for 桌機版用)
  - css排版:手刻

## 版本差異
- iPhone手機，可上下滑動，但無自動播放，礙於IOS有些限制，需要開啟靜音才可自動播放，因此先把自動播放的功能關閉
- Android手機，可上下滑動，影片自動播放
- 桌機RWD，可上下滑動，影片自動播放

## 加分題
- 說明: 我在第一個slider的視頻裡，我有加入加分題功能，影片播放5秒後會彈跳出alert訊息，並告知需加入會員才可觀看，而視頻內容則無法讓使用者繼續操作下去
- 作法: 使用plyr的currentTime來確認目前目前已播放時間，並透過css添加一個覆蓋層，讓用戶無法再進行影片操作及觀看

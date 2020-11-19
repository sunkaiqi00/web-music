# web-music

##### 下载依赖
```
npm install
```

##### 运行服务
```
npm run serve
```

##### 打包文件
```
npm run build
```

##### 技术栈

```
vue  vue-router  vuex 
```

##### 插件

```
better-scroll vue-lazyload postcss-px-to-viewport axios web-storage-cache fastclick
```

##### 项目介绍

对于使用记录，使用localStorage缓存到本地，vw单位进行移动端适配   对于长列表滚动使用better-scroll  

###### 1.首页

- 喜欢歌单：保存收藏的歌曲 
- 最近播放歌单： 保存最近播放歌曲
- 我的歌单：显示创建的歌单   可以创建或删除
- 搜索框：快速输入会进行节流控制避免发送太多请求
- 进入歌单内：管理歌单内歌曲
- 效果图：



<img src="image\home.png" style="zoom:50%;" />

<img src="image\plalist_management.png" alt="plalist_management" style="zoom:50%;" />

<img src="image\search_page.png" alt="search_page" style="zoom:50%;" />

<img src="image\search_result.png" alt="search_result" style="zoom:50%;" />



###### 2. mini播放器

- 显示当前播发歌曲名字和歌手
- 在播放按钮上使用svg动态绘制播放进度
- 查看播放歌曲列表
- 点击添加到播放列表
- 效果图：

<img src="image\mini_player.png" style="zoom: 67%;" />



<img src="image\popup_playlist.png" alt="popup_playlist" style="zoom:50%;" />

<img src="image\add_music_to_playlist.png" style="zoom:50%;" />

###### 3.播放器

- 播放模式：顺序，单曲，随机

- 下一首，上一些后，播放暂停，收藏

- 左右滑动，切换cd显示或歌词展示

- 歌词始终滚动：当前播放的歌词始终在中间

- 效果图：

  <img src="image\play_image.png" style="zoom:50%;" />

  <img src="image\play_lyric.png" alt="play_lyric" style="zoom:50%;" />

###### 4. 歌手页面

- 顶部title：显示当前歌手区域首字母，滚动切换动画

- 右侧字母导航：根据显示歌手区域首字母高亮显示，点击滑动歌手列表滚动到对应区域

- 效果图：

  <img src="image\singer.png" style="zoom:50%;" />

###### 5. 歌手歌单

- 选择歌曲添加歌单

- 为列表的滑动添加一些交互

- 效果图：

  <img src="image\addplaylist.png" style="zoom:50%;" />

  <img src="image\singer_playlist.png" alt="singer_playlist" style="zoom:50%;" />
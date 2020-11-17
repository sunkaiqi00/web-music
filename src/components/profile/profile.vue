<template>
  <scroll class="profile-wrapper" ref="profile">
    <div class="profile-user-wrapper">
      <div class="search-wrapper">
        <div class="search-box" @click="goSearchPage">
          <span class="iconfont icon-search"></span>
        </div>
      </div>
      <div class="profile-brief-msg-wrapper">
        <div class="profile-avatar">
          <img src="@/assets/image/useravatar.png" alt />
        </div>
        <div class="profile-userinfo">
          <span class="username">NAME</span>
          <span class="user-level">Lv.1</span>
        </div>
        <div class="go-profile-page">
          <span class="iconfont icon-next"></span>
        </div>
      </div>
      <div class="user-card">
        <div class="my-favorite-music" @click.stop="showMyFavoritePaylist">
          <div class="bg">
            <span class="iconfont icon-favorite"></span>
          </div>
          <div class="favorite-text-wrapper">
            <div class="title">我喜欢的音乐</div>
            <div class="favorite-music-much">{{favoriteSongsLength}}</div>
          </div>
        </div>
        <div class="user-recently-play" @click.stop="showMyRecentlyPaylist">
          <div class="bg">
            <span class="iconfont icon-recentplay"></span>
          </div>
          <div class="recently-play-wrapper">
            <div class="title">最近播放</div>
            <div class="recently-play-much">{{playHistoryLength}}</div>
          </div>
        </div>
      </div>
      <div class="user-created-playlist">
        <div class="user-playlist-title">
          <div class="title">{{my_playlist_much}}</div>
          <div class="created-btn" @click.stop="created_play_list">
            <span class="iconfont icon-add"></span>
            <span class="created-text">创建歌单</span>
          </div>
        </div>
        <div class="no-playlist" v-show="!user_playList.length">暂无创建歌单</div>
        <user-playlist :play_list="user_playList" @remove_playlist="showToast"></user-playlist>
      </div>
    </div>
    <playlist-songs
      @deleteChooseSong="deleteChooseSong"
      ref="userPaylist"
      @onPlay="onPlay"
      :playlist="songs"
      :title="title"
      :showNothing="showNothing"
    ></playlist-songs>
    <dialong ref="dialong">
      <span>删除成功</span>
    </dialong>
    <popup ref="createdPlaylist" @submit_playList="submit_playList"></popup>
    <confirm-toast :title="toastTitle" @confirm="remove_playlist" ref="toast"></confirm-toast>
  </scroll>
</template>
<script>
import PlaylistSongs from './PlaylistSongs'
import UserPlaylist from './UserPlaylist'
import dialong from '@/components/common/dialong/dialong'
import popup from '@/components/common/popup/popup'
import scroll from '@/components/common/scroll/scroll'
import ConfirmToast from '@/components/common/confirmToast/ConfirmToast'
import { musicMixin, userMixin } from '@/utils/mixin'
import Song from '@/api/songs'
import {
  saveFavoriteSongs,
  savePlayHistory,
  saveUserPlayList,
} from '@/utils/localStorage'
export default {
  mixins: [userMixin, musicMixin],
  data() {
    return {
      title: '',
      songs: [], // 要展示的歌单
      EDITPLAYLIST: null,
      showNothing: 0,
      toastTitle: '删除歌单',
    }
  },
  watch: {
    playlist(newSong) {
      console.log(newSong)
    },
    favoriteSongs(newSong) {
      this.songs = newSong
    },
  },
  components: {
    PlaylistSongs,
    UserPlaylist,
    dialong,
    popup,
    scroll,
    ConfirmToast,
  },
  computed: {
    favoriteSongsLength() {
      return this.favoriteSongs.length + '首'
    },
    playHistoryLength() {
      return this.playHistory.length + '首'
    },
    my_playlist_much() {
      return `我的歌单(${this.user_playList.length})`
    },
  },
  methods: {
    showToast(index) {
      this.select_playlist = index
      this.$refs.toast.show()
    },
    // 删除歌单  先弹出确认框
    remove_playlist(index) {
      this.user_playList.splice(this.select_playlist, 1)
      let list = this.user_playList
      this.setUserPlayList(list)
      saveUserPlayList(list)
    },
    // 创建歌单
    submit_playList(key) {
      let flag = this.user_playList.some((item) => {
        item[key] === key
      })
      if (!flag) {
        let data = {
          [key]: [],
        }
        let list = this.user_playList
        list.unshift(data)
        this.setUserPlayList(list)
        saveUserPlayList(list)
      }
    },
    created_play_list() {
      this.$refs.createdPlaylist.show()
    },
    deleteChooseSong() {
      let list = this.songs.filter((item) => item.editMode === false)
      this.songs = list
      switch (this.EDITPLAYLIST) {
        case 0:
          this.setFavoriteSongs(list)
          saveFavoriteSongs(list)
          break
        case 1:
          this.setPlayHistory(list)
          savePlayHistory(list)
          break
        default:
          break
      }
      this.setEditState(false)
      this.$refs.dialong.show()
    },
    onPlay(item, index) {
      this.insertSong(new Song(item))
    },
    showMyFavoritePaylist() {
      this.title = '我喜欢的'
      this.songs = this.favoriteSongs
      this.EDITPLAYLIST = 0
      this.showNothing = 0
      this.showuserPaylist()
    },
    showMyRecentlyPaylist() {
      this.title = '最近播放'
      this.songs = this.playHistory
      this.EDITPLAYLIST = 1
      this.showNothing = 1
      this.showuserPaylist()
    },
    showuserPaylist() {
      this.$refs.userPaylist.show()
    },
    goSearchPage() {
      this.$router.push('/search')
    },
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '80px' : ''
      this.$refs.profile.$el.style.bottom = bottom
    },
  },
}
</script>
<style scoped lang='stylus'>
@import '~assets/style/css/global';

.profile-wrapper {
  position: absolute;
  top: 88px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;

  .profile-user-wrapper {
    padding: 0 20px;

    .search-wrapper {
      width: 100%;
      height: 25px;
      padding: 10px 0;

      .search-box {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        background: #f5f6fa;
        border-radius: 20px;

        .icon-search {
          display: inline-block;
          font-size: 16px;
          width: 40px;
          height: 100%;
          center();
        }
      }
    }

    .profile-brief-msg-wrapper {
      position: relative;
      height: 80px;
      width: 100%;
      display: flex;
      margin-top: 10px;
      align-items: center;
      box-sizing: border-box;
      background: #f5f6fa;
      border-radius: 10px;

      .profile-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 14px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .profile-userinfo {
        flex: 1;
        height: 60px;
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        box-sizing: border-box;
        justify-content: center;

        .username {
          font-weight: bold;
          font-size: $font-size-medium-x;
          margin-bottom: 10px;
        }

        .user-level {
          background: #fff;
          width: 40px;
          text-align: center;
          padding: 2px 0;
          font-size: $font-size-small-s;
          border-radius: 25px;
        }
      }

      .go-profile-page {
        width: 40px;
        height: 100%;
        center();
      }
    }

    .user-card {
      height: 70px;
      width: 100%;
      box-sizing: border-box;
      background: #f5f6fa;
      margin-top: 20px;
      display: flex;
      align-items: center;
      border-radius: 10px;

      .my-favorite-music {
        flex: 1;
        display: flex;
        padding-left: 10px;
        box-sizing: border-box;

        .bg {
          height: 40px;
          width: 40px;
          background: rgba(255, 77, 77, 0.3);
          center();
          border-radius: 6px;

          .icon-favorite {
            color: #ff3838;
            font-size: 20px;
          }
        }

        .favorite-text-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 10px;

          .title {
            font-size: $font-size-medium;
          }

          .favorite-music-much {
            font-size: $font-size-small-s;
            color: $text-gray;
            margin-top: 8px;
          }
        }
      }

      .user-recently-play {
        flex: 1;
        display: flex;
        padding-right: 10px;
        box-sizing: border-box;

        .bg {
          height: 40px;
          width: 40px;
          background: rgba(255, 77, 77, 0.3);
          center();
          border-radius: 6px;

          .icon-recentplay {
            color: #ff3838;
            font-size: 24px;
          }
        }

        .recently-play-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 10px;

          .title {
            font-size: $font-size-medium;
          }

          .recently-play-much {
            font-size: $font-size-small-s;
            color: $text-gray;
            margin-top: 8px;
          }
        }
      }
    }

    .user-created-playlist {
      width: 100%;
      box-sizing: border-box;
      background: #f5f6fa;
      margin-top: 20px;
      align-items: center;
      border-radius: 10px;
      padding: 10px 20px;

      .user-playlist-title {
        width: 100%;
        display: flex;
        height: 30px;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;

        .title {
          font-size: 14px;
        }

        .created-btn {
          padding: 3px 8px;
          background: #fff;
          box-sizing: border-box;
          border-radius: 10px;

          .icon-add {
            font-size: 12px;
          }

          .created-text {
            font-size: 10px;
          }
        }
      }

      .no-playlist {
        text-align: center;
        padding: 30px 0;
        font-size: 12px;
        color: gray;
      }
    }
  }
}
</style>
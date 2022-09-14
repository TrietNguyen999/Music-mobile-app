import { createSelector } from 'reselect'
import { LIST_ID_PLAY_LATER } from '@/config/constant'


// sourceInfo(state, getters, rootState, { sourceNames }) {
//   return { sources: sources.map(item => ({ id: item.id, name: sourceNames[item.id] })), sortList }
// },
// tags: state => state.tags,
// isVisibleListDetail: state => state.isVisibleListDetail,
// selectListInfo: state => state.selectListInfo,
// listData(state) {
//   return state.list
// },
// listDetail(state) {
//   return state.listDetail
// },

export const player = state => state.player

export const playIndex = state => state.player.playIndex

export const status = state => state.player.status

export const isGettingUrl = state => state.player.isGettingUrl

export const statusText = state => state.player.statusText

export const listInfo = state => state.player.listInfo

export const playList = state => state.player.listInfo.list

export const playMusicInfo = state => state.player.playMusicInfo

export const playInfo = createSelector([playMusicInfo, listInfo, playIndex], (playMusicInfo, listInfo, playIndex) => {
  if (playMusicInfo == null) return { listId: null, playIndex: -1, playListId: null, listPlayIndex: -1, isPlayList: false, musicInfo: null }
  const playListId = listInfo.id
  let listId = playMusicInfo.listId
  const isTempPlay = !!playMusicInfo.isTempPlay
  const isPlayList = listId === playListId
  let newPlayIndex = -1
  let listPlayIndex = Math.min(playIndex, listInfo.list.length - 1)

  if (listId != LIST_ID_PLAY_LATER) {
    const currentSongmid = playMusicInfo.musicInfo.songmid || playMusicInfo.musicInfo.musicInfo.songmid
    if (isPlayList) {
      newPlayIndex = listInfo.list.findIndex(m => (m.songmid || m.musicInfo.songmid) == currentSongmid)
      if (!isTempPlay) listPlayIndex = newPlayIndex
    } else if (listId == 'download') {
      playIndex = global.downloadList.findIndex(m => m.musicInfo.songmid == currentSongmid)
    } else {
      let list = global.allList[listId]
      if (list) newPlayIndex = list.list.findIndex(m => m.songmid == currentSongmid)
    }
  }
  if (listPlayIndex > -1) global.prevListPlayIndex = listPlayIndex

  return {
    listId,
    list: listInfo.list,
    playIndex: newPlayIndex,
    playListId,
    listPlayIndex,
    isPlayList,
    isTempPlay,
    musicInfo: playMusicInfo.musicInfo,
  }
})

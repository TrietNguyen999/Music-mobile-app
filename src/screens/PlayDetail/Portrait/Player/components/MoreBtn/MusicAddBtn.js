import React, { useCallback, memo, useMemo, useEffect, useState, useRef } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '@/components/common/Icon'
import { useGetter, useDispatch } from '@/store'
import MusicAddModal from '@/components/MusicAddModal'


export default memo(() => {
  const theme = useGetter('common', 'theme')
  const [visibleMusicAddModal, setVisibleMusicAddModal] = useState(false)
  const playMusicInfo = useGetter('player', 'playMusicInfo')
  const selectedDataRef = useRef()
  const hideMusicAddModal = () => {
    setVisibleMusicAddModal(false)
  }

  const handleShowMusicAddModal = () => {
    selectedDataRef.current = playMusicInfo.musicInfo
    setVisibleMusicAddModal(true)
  }

  return (
    <>
      <TouchableOpacity style={{ ...styles.cotrolBtn }} activeOpacity={0.5} onPress={handleShowMusicAddModal}>
        <Icon name="add-music" style={{ color: theme.normal30 }} size={24} />
      </TouchableOpacity>
      <MusicAddModal
        visible={visibleMusicAddModal}
        hideModal={hideMusicAddModal}
        musicInfo={selectedDataRef.current} />
    </>
  )
})

const styles = StyleSheet.create({
  cotrolBtn: {
    marginLeft: 5,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: '#ccc',
    shadowOpacity: 1,
    textShadowRadius: 1,
  },
})

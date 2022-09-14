import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import List from './List'
import { useGetter, useDispatch } from '@/store'
import PlayerPortrait from './PlayerPortrait'
import { useNavigationComponentDidAppear } from '@/navigation'
import StatusBar from '@/components/common/StatusBar'


export default ({ componentId }) => {
  const selectListInfo = useGetter('songList', 'selectListInfo')
  const getListDetail = useDispatch('songList', 'getListDetail')
  const theme = useGetter('common', 'theme')
  const [animatePlayed, setAnimatPlayed] = useState(false)

  const setComponentId = useDispatch('common', 'setComponentId')

  useEffect(() => {
    setAnimatPlayed(false)
    setComponentId({ name: 'songlistDetail', id: componentId })
    getListDetail({ id: selectListInfo.id, page: 1 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useNavigationComponentDidAppear(componentId, () => {
    setAnimatPlayed(true)
  })

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary, paddingTop: StatusBar.currentHeight }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <List animatePlayed={animatePlayed} />
      </View>
      <PlayerPortrait />
    </View>
  )
}

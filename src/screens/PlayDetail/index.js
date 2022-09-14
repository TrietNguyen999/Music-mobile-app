import React, { useEffect, useState } from 'react'
// import { View, StyleSheet } from 'react-native'
import { useGetter, useDispatch } from '@/store'
import { useDimensions } from '@/utils/hooks'
import { useNavigationComponentDidDisappear, useNavigationComponentDidAppear } from '@/navigation'
import { screenUnkeepAwake } from '@/utils/utils'

import Portrait from './Portrait'
import Landscape from './Landscape'

export default (props) => {
  // const theme = useGetter('common', 'theme')
  const setComponentId = useDispatch('common', 'setComponentId')
  const [animated, setAnimated] = useState(false)
  const { window } = useDimensions()
  useEffect(() => {
    setComponentId({ name: 'playDetail', id: props.componentId })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useNavigationComponentDidDisappear(props.componentId, () => {
    screenUnkeepAwake()
  })
  useNavigationComponentDidAppear(props.componentId, () => {
    setAnimated(true)
  })

  return (
    window.height > window.width
      ? <Portrait componentId={props.componentId} animated={animated} />
      : <Landscape componentId={props.componentId} animated={animated} />
  )
}

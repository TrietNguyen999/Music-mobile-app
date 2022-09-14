import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { StyleSheet, View, ScrollView, Animated, Text } from 'react-native'
// import PropTypes from 'prop-types'
// import { AppColors } from '@/theme'
import { useGetter } from '@/store'
// import InsetShadow from 'react-native-inset-shadow'


export default ({ list, visible, height, hideList, renderItem }) => {
  const translateY = useRef(new Animated.Value(0)).current
  const scaleY = useRef(new Animated.Value(0)).current
  const theme = useGetter('common', 'theme')
  // const isShowRef = useRef(false)
  const [tipListVisible, setTipListVisible] = useState(false)


  const handleShowList = useCallback(() => {
    // console.log('handleShowList', height, visible)
    if (!height) return
    setTipListVisible(true)

    translateY.setValue(-height / 2)
    scaleY.setValue(0)

    Animated.parallel([
      // Animated.timing(fade, {
      //   toValue: 1,
      //   duration: 300,
      //   useNativeDriver: true,
      // }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, scaleY, height])

  const handleHideList = useCallback(() => {
    // Will change fadeAnim value to 0 in 5 seconds
    // console.log('handleHideList')
    Animated.parallel([
      // Animated.timing(fade, {
      //   toValue: 0,
      //   duration: 200,
      //   useNativeDriver: true,
      // }),
      Animated.timing(translateY, {
        toValue: -height / 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start((finished) => {
      // console.log(finished)
      if (!finished) return
      setTipListVisible(false)
      hideList && hideList()
    })
  }, [translateY, scaleY, hideList, height])

  const handleBlankPress = useCallback(() => {
    if (!hideList) return
    handleHideList()
  }, [handleHideList, hideList])

  useEffect(() => {
    if (visible === tipListVisible) return
    visible ? handleShowList() : handleHideList()
  }, [tipListVisible, visible, handleShowList, handleHideList])

  const listComponent = useMemo(() => (
    <Animated.View
      style={{
        ...styles.anima,
        transform: [
          { translateY: translateY },
          { scaleY: scaleY },
        ],
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.secondary40,
        }}>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {list.map((item, index) => renderItem(item, index))}
        </ScrollView>
      </View>
      <View style={styles.blank} onTouchStart={handleBlankPress}></View>
    </Animated.View>
  ), [handleBlankPress, list, renderItem, scaleY, theme.secondary40, translateY])

  return tipListVisible ? listComponent : null
}

const styles = StyleSheet.create({
  anima: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
  container: {
    flexGrow: 0,
  },
  blank: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
})

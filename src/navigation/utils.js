import { Navigation } from 'react-native-navigation'
import { VERSION_MODAL, PACT_MODAL } from './screenNames'

import { getter, getStore } from '@/store'

const store = getStore()
const getStatusBarStyle = () => getter('common', 'isDarkTheme')(store.getState()) ? 'light' : 'dark'

export const dismissOverlay = compId => Navigation.dismissOverlay(compId)

export const pop = compId => Navigation.pop(compId)
export const popToRoot = compId => Navigation.popToRoot(compId)
export const popTo = compId => Navigation.popTo(compId)

export const showPactModal = () => {
  Navigation.showOverlay({
    component: {
      name: PACT_MODAL,
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: true,
        },
        statusBar: {
          drawBehind: true,
          visible: true,
          style: getStatusBarStyle(),
          backgroundColor: 'transparent',
          animate: true,
        },
        // animations: {

        //   showModal: {
        //     enter: {
        //       enabled: true,
        //       alpha: {
        //         from: 0,
        //         to: 1,
        //         duration: 300,
        //       },
        //     },
        //     exit: {
        //       enabled: true,
        //       alpha: {
        //         from: 1,
        //         to: 0,
        //         duration: 300,
        //       },
        //     },
        //   },
        // },
      },
    },
  })
}

export const showVersionModal = () => {
  Navigation.showOverlay({
    component: {
      name: VERSION_MODAL,
      options: {
        layout: {
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: true,
        },
        statusBar: {
          drawBehind: true,
          visible: true,
          style: getStatusBarStyle(),
          backgroundColor: 'transparent',
          animate: true,
        },
        // animations: {

        //   showModal: {
        //     enter: {
        //       enabled: true,
        //       alpha: {
        //         from: 0,
        //         to: 1,
        //         duration: 300,
        //       },
        //     },
        //     exit: {
        //       enabled: true,
        //       alpha: {
        //         from: 1,
        //         to: 0,
        //         duration: 300,
        //       },
        //     },
        //   },
        // },
      },
    },
  })
}

// export const showToast = (text) => {
//   Navigation.showOverlay({
//     component: {
//       name: TOAST_SCREEN,
//     },
//   })
// }

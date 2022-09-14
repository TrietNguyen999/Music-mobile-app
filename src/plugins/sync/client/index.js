import handleAuth from './auth'
import { connect as socketConnect, disconnect as socketDisconnect } from './client'
import { getSyncHost } from '@/utils/tools'
import { action as commonAction } from '@/store/modules/common'
import { getStore } from '@/store'
import { SYNC_CODE } from './config'
import log from '../log'

const handleConnect = async authCode => {
  const hostInfo = await getSyncHost()
  // console.log(hostInfo)
  if (!hostInfo || !hostInfo.host || !hostInfo.port) throw new Error(SYNC_CODE.unknownServiceAddress)
  await disconnect(false)
  const keyInfo = await handleAuth(hostInfo.host, hostInfo.port, authCode)
  await socketConnect(hostInfo.host, hostInfo.port, keyInfo)
}
const handleDisconnect = async() => {
  await socketDisconnect()
}

const connect = authCode => {
  const store = getStore()
  store.dispatch(commonAction.setSyncStatus({
    status: false,
    message: SYNC_CODE.connecting,
  }))
  return handleConnect(authCode).then(() => {
    const store = getStore()
    store.dispatch(commonAction.setSyncStatus({
      status: true,
      message: '',
    }))
  }).catch(err => {
    const store = getStore()
    store.dispatch(commonAction.setSyncStatus({
      status: false,
      message: err.message,
    }))
    switch (err.message) {
      case SYNC_CODE.connectServiceFailed:
      case SYNC_CODE.missingAuthCode:
        break
      default:
        log.r_warn(err.message)
        break
    }

    return Promise.reject(err)
  })
}

const disconnect = (isResetStatus = true) => handleDisconnect().then(() => {
  log.info('disconnect...')
  if (isResetStatus) {
    const store = getStore()
    store.dispatch(commonAction.setSyncStatus({
      status: false,
      message: '',
    }))
  }
}).catch(err => {
  const store = getStore()
  log.error('disconnect error: ' + err.message)
  store.dispatch(commonAction.setSyncStatus({
    message: err.message,
  }))
})

export {
  connect,
  disconnect,
  SYNC_CODE,
}

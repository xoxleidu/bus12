import request from '@/utils/request'

export function getBusLineList() {
  return request({
    url: '/line/findAllLineInfo',
    method: 'post'

  })
}

export function getBusList(data) {
  return request({
    url: '/busInfo/findOnlineBusListInLine',
    method: 'post',
    data:{
      runMethod:data
    }
  })
}

export function getBusGPS(data) {
  return request({
    url: '/line/findLinedetailInfo',
    method: 'post',
    data:{
      runMethod:data
    }
  })
}

export function getBusYujing() {
  return request({
    url: '/busInfo/busYujing',
    method: 'post'
  })
}


export function getBusGuiji(data) {
  return request({
    url: '/busInfo/findBusTrack',
    method: 'post',
    data
  })
}


export function getBusGuijiEdit(data) {
  return request({
    url: '/line/findGpsBus',
    method: 'post',
    data
  })
}


export function getBusGuijiEditline(data) {
  return request({
    url: '/line/findLineHistoryLocus',
    method: 'post',
    data
  })
}

export function updataBusGuijiEditline(data) {
  return request({
    url: '/line/insertBus',
    method: 'post',
    data
  })
}

export function getBusGuijiEditlineGps(data) {
  return request({
    url: '/line/findNewLienAndStation',
    method: 'post',
    data:{
      runMethod:data
    }
  })
}

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function postList(currentPage,pageSize,queryk,queryv) {
  var data = '';
  if(queryk == 0){

    data = {
      currentPage:currentPage,
      pageSize:pageSize,
      employeeId:queryv
    }

  } else if (queryk == 1) {
    data = {
      currentPage:currentPage,
      pageSize:pageSize,
      idcard:queryv
    }
  } else {
    data = {
      currentPage:currentPage,
      pageSize:pageSize
    }
  }

  return request({
    url: '/drivermange/findDriverInfoByPage',
    method: 'post',
    data
  })
}

export function createArticle(data) {
  return request({
    url: '/drivermange/saveDriverInfo',
    method: 'post',
    data//
  })
}

export function updateArticle(data) {
  return request({
    url: '/drivermange/updateDriverInfo',
    method: 'post',
    data
  })
}

export function deleteArticle(data) {
  return request({
    url: '/drivermange/forbideDriverInfos',
    method: 'post',
    data:{
      id:data
    }
  })
}

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

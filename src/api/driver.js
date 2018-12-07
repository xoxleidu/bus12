import request from '@/utils/request'

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

export function deleteAll(data) {
  return request({
    url: '/drivermange/deletebusidlist',
    method: 'post',
    data
  })
}

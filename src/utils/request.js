import axios from 'axios'
import { Message, MessageBox } from 'element-ui'


// 创建axios实例
const service = axios.create({
  baseURL: 'https://gongjiao.cccts.com.cn:453/buscenter', // api 的 base_url
  //baseURL: 'http://localhost:7081/buscenter', // api 的 base_url
  timeout: 50000 // 请求超时时间
})



// request拦截器
service.interceptors.request.use(

  request => {
    console.log(request)
    return request
  },

  error => {

    console.log(error)

  }
)

// response 拦截器
service.interceptors.response.use(

  // response => response,
  /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
  response => {
    console.log(response)

    const res = response.data
    if (res.code !== '000') {
      console.log(response)
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })


      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message + ' 服务器断开链接',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

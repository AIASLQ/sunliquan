import axios from 'axios';
import { Message,MessageBox} from 'element-ui';



// 创建axios实例
const service = axios.create({
  timeout: 60000                  // 请求超时时间
});


// respone拦截器
service.interceptors.response.use(
  response => { 
    const res = response.data;
    // console.log(res)
    if (res.httpCode === 401 || res.httpCode === 405 || res.httpCode === 302 ) {  // 登录超时 
      MessageBox.confirm('由于您常时间未操作，系统为了您帐号的安全已将您退出登录了 , 您可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       //此处应返回重新登录，清除cookie
      })
      return Promise.reject(error)
    }else if(res.httpCode === 403){
      Message({
        message: '您无该权限',
        type: 'error',
        duration: 5 * 1000
      });
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error);
  }
)

export default service;

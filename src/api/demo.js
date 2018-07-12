import fetch from '@/utils/fetch'


/**
 * 下拉选接口
 */
export function  getCurrentUserInfo() {
  return fetch({
    url: 'http://interview-test.ipmapp.cn/api/v1/classify?parent=0',
    method: 'get'
  })
}

/**
 * 列表数据
 */
export function  tableDataList(data) {
	 const params = data[0]
  return fetch({
    url: 'http://interview-test.ipmapp.cn/api/v1/record?classify='+params,
    method: 'get'
  })
}


import request from '@/utils/request'
// 任务接口
export function getTasks(params) {
  return request({
    url: '/tasks',
    method: 'get',
    params
  })
}

export function getTaskDetail(id) {
  return request({
    url: '/tasks/' + id,
    method: 'get'
  })
}

export function flushTask(id) {
  return request({
    url: '/flush_task/' + id,
    method: 'get'
  })
}

export function submitTask(data) {
  return request({
    url: '/tasks',
    method: 'post',
    data
  })
}

// PlayBook参数配置接口
export function createOptions(data) {
  return request({
    url: '/options',
    method: 'post',
    data
  })
}

export function deleteOptions(id) {
  return request({
    url: '/options/' + id,
    method: 'delete'
  })
}

export function updateOptions(id, data) {
  return request({
    url: '/options/' + id,
    method: 'put',
    data
  })
}

export function getOptions(params) {
  return request({
    url: '/options',
    method: 'get',
    params
  })
}

// 环境信息接口
export function getEnvs() {
  return request({
    url: '/envs',
    method: 'get'
  })
}

// task options接口
export function getTaskOptions(params) {
  return request({
    url: '/task_options',
    method: 'get',
    params
  })
}

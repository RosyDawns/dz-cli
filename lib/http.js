/*
 * @Author: crazycattle
 * @Date: 2021-12-20 17:34:45
 * @Description: content
 */

// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})

async function getRepoList() {
  return axios.get('https://api.github.com/users/CrazyCattle/repos')
}

async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/CrazyCattle/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}

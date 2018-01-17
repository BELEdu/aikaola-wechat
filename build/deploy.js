/**
 * 部署静态文件
 *
 * @description 打包后自动部署静态文件到后端项目的对应目录中
 */

const path = require('path');
const fs = require('fs-extra');
const { assetsSubDirectory } = require('../config').build;

// 本地dist路径
const DIST_PATH = path.resolve(__dirname, '../dist')
// 本地laravel项目路径
const LARAVEL_PATH = path.resolve(__dirname, '../../oa.laravel')

// 复制dist中的静态文件到laravel项目中的public文件夹中
const ASSETS_PATH = path.join(DIST_PATH, assetsSubDirectory)
const PUBLIC_PATH = path.join(LARAVEL_PATH, 'public', assetsSubDirectory)

console.log('copying assets...')

 // 复制前先清空laravel中的相关文件夹
fs.emptyDir(PUBLIC_PATH)
  .then(() => {
    fs.copySync(ASSETS_PATH, PUBLIC_PATH)
  })

// 复制dist中的html文件到laravel中的模板文件夹中
const HTML_PATH = path.join(DIST_PATH, 'index.html')
const TEMPLATE_PATH = path.join(LARAVEL_PATH, 'resources/views/vue/wechat.blade.php')

console.log('copying index.html...')

fs.copySync(HTML_PATH, TEMPLATE_PATH)

// 提交变更带到git并推送
const git = require('simple-git')(LARAVEL_PATH)

git
  .exec(() => console.log('pulling updates...'))
  .pull('origin', 'master')
  .add('./*')
  .commit('更新 家校通 前端静态资源')
  .exec(() => console.log('pushing updates...'))
  .push('origin', 'master')
  .exec(() => console.log('deploy successfully!'))

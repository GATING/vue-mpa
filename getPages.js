const glob = require('glob')
const { meta } = require('./src/config')
const { name } = require('./package.json')
function getEntry(globPath) {
  const entries = {}
  // 读取src/pages/*/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function (entry) {
    const tmp = entry.split('/').splice(-3)
    const entryName = tmp[1]
    const {
      title = name,
      keywords = `${name}-keywords`,
      description = `${name}-description`,
    } = meta[entryName] || {}
    entries[entryName] = {
      entry,
      template: './public/index.html',
      filename: entryName + '.html',
      title,
      meta: {
        keywords,
        description,
      },
    }
  })
  return entries
}
const pages = getEntry('./src/pages/*/*')

module.exports = pages

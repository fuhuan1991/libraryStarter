// 默认的外部引用库
const defaultExternalArr = ['react', 'react-dom', 'antd', 'lodash', 'rc-calendar', 'moment', 'rc-notification', 'classnames'];

// 补充外部引用文件
const extraExternalArr = ['antd/lib/style/index.css'];

// 在搜索components目录时需要排除的文件名
const searchExclude = ['__test__', 'index.mdx', '.DS_Store'];

module.exports = {
    defaultExternalArr,
    extraExternalArr,
    searchExclude,
};
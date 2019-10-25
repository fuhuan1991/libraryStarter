# GrowingIO Design System

## Getting Started

```
npm config set registry http://nexus.infra.growingio.com/repository/npm-group/
npm install gio-design --save
// 或者使用 yarn
yarn config set registry http://nexus.infra.growingio.com/repository/npm-group/
yarn add gio-design
```

```
import Button from 'gio-design/lib/button';
...
<Button>GrowingIO Rocks!</Button>
...
```

[Documention](http://growingio.design)

### Theme


目前可在 webpack.config.js 中配置 less 的 modifyVars 进行覆盖，变量名可参考 src/styleSheet 目录下的 less 文件
```
  loader: 'less-loader',
  options: {
    modifyVars: {
      '@color-primary': '#f48267'
    }
  }
```

## Development

### Scripts

- **npm start**
使用 webpack-dev-server 启动本地开发服务器，地址为 localhost:9000
默认展示的组件是 Playground，可以利用这个组件对其他组件进行测试

- **npm run compile_bundle**
使用 rollup 进行打包。
会将所有的代码集中打包为一个 bundle 存放在build目录下，可以生成多种格式的文件，es，cjs 等
样式文件会集中打包为一个 css 文件。

- **npm run compile_lib**
使用 rollup 进行打包。
会将每一个组件分别进行打包，存放在 lib 目录下，生成的文件格式默认为 es
每个组件的样式文件会被打包成 css 文件，分别放在该组件的目录下

- **npm run compile**
依次运行 compile_bundle 和 compile_lib

#### publish


### Specs

#### CSS
#### 版本
参考 [语意化版本](https://semver.org/lang/zh-CN/)

### Doc

```
yarn docz
```

### Todo
- [ ] design token
- [ ] gio-design-theme
- [ ] documention
## 自动压缩
将打包的文件自动压缩成zip包

- 入参为filename，压缩文件名

##### 使用方式

- 在package.jons里面引入
```
"devDependencies": {
  "package-auto-zip": "git+ssh:git@github.com:web-labor/package-auto-zip.git",
```

- vue3.0 config.env.js

var ZipPlugin = require('package-auto-zip');

```
configureWebpack: {
  plugins: (process.env.NODE_ENV === 'production' ? [new ZipPlugin({ filename: outputName })] : []
}
```

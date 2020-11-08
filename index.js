'use strict';

const fs = require('fs');
const yazl = require('yazl');

function ZipPlugin(options) {
	this.options = options || {};
}

ZipPlugin.prototype.apply = function(compiler) {
	const options = this.options;
	const fileName = options.filename + '.zip'
	if (fs.existsSync(fileName)) {
		fs.unlinkSync(fileName)
		console.log('\n======================== 删除压缩文件 ========================')
	}
	compiler.hooks.afterEmit.tapAsync(ZipPlugin.name, function(compilation, callback) {
		console.log('\n======================== 开始生成压缩文件 ========================')
		const zipFile = new yazl.ZipFile();
		for (const nameAndPath in compilation.assets) {
			let source = compilation.assets[nameAndPath].source()
			zipFile.addBuffer(
				Buffer.from(source),
				nameAndPath
			);
		}

		// pipe() can be called any time after the constructor
		zipFile.outputStream.pipe(fs.createWriteStream(fileName)).on("close", function() {
		});
		// call end() after all the files have been added
		zipFile.end()
		console.log('======================== 压缩文件生成成功 ========================')
		callback()
	})
};

module.exports = ZipPlugin;

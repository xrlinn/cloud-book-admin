const mongoose = require('mongoose')

// bookId: "5be2ce07522f254167830e16"
// content: "## 安装Sass和Compass↵↵`sass`基于`Ruby`语言开发而成，因此安装`sass`前需要[安装Ruby](http://rubyinstaller.org/downloads)。（注:mac下自带Ruby无需在安装Ruby!）↵↵window下安装SASS首先需要安装`Ruby`，先从官网[下载Ruby](http://rubyinstaller.org/downloads)并安装。安装过程中请注意勾选`Add Ruby executables to your PATH`添加到系统环境变量。如下图：↵↵![](https://box.kancloud.cn/2015-08-04_55c05d4ed0a05.png)↵↵安装完成后需测试安装有没有成功,运行`CMD`输入以下命令：↵↵~~~↵ruby -v↵//如安装成功会打印↵ruby 2.2.2p95 (2015-04-13 revision 50295) [i386-mingw32]↵~~~↵↵如上已经安装成功。但因为国内网络的问题导致`gem`源间歇性中断因此我们需要更换`gem`源。（使用淘宝的gem源https://ruby.taobao.org/）如下：↵↵~~~↵//1.删除原gem源↵gem sources --remove https://rubygems.org/↵↵//2.添加国内淘宝源↵gem sources -a https://ruby.taobao.org/↵↵//3.打印是否替换成功↵gem sources -l↵↵//4.更换成功后打印如下↵*** CURRENT SOURCES ***↵https://ruby.taobao.org/↵~~~↵↵`Ruby`自带一个叫做`RubyGems`的系统，用来安装基于`Ruby`的软件。我们可以使用这个系统来 轻松地安装`Sass`和`Compass`。要安装最新版本的`Sass`和`Compass`，你需要输入下面的命令：↵↵~~~↵//安装如下(如mac安装遇到权限问题需加 sudo gem install sass)↵gem install sass↵gem install compass↵~~~↵↵在每一个安装过程中，你都会看到如下输出：↵↵~~~↵Fetching: sass-3.x.x.gem (100%)↵Successfully installed sass-3.x.x↵Parsing documentation for sass-3.x.x↵Installing ri documentation for sass-3.x.x↵Done installing documentation for sass after 6 secon↵1 gem installed↵~~~↵↵安装完成之后，你应该通过运行下面的命令来确认应用已经正确地安装到了电脑中：↵↵~~~↵sass -v↵Sass 3.x.x (Selective Steve)↵↵compass -v↵Compass 1.x.x (Polaris)↵Copyright (c) 2008-2015 Chris Eppstein↵Released under the MIT License.↵Compass is charityware.↵Please make a tax deductable donation for a worthy cause: http://umdf.org/compass↵~~~↵↵如下sass常用更新、查看版本、sass命令帮助等命令：↵↵~~~↵//更新sass↵gem update sass↵↵//查看sass版本↵sass -v↵↵//查看sass帮助↵sass -h↵~~~"
// index: 2
// titleId: "5be2ce07522f254167830e19"

const article = new mongoose.Schema({
    content: String,
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    index: {
        type: Number,
        default: 1
    },
    titleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'title'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('article', article)
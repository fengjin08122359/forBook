const phantom = require('phantom');
const program = require('commander');
const iconv = require('iconv-lite');
var path = require('path');
var jqueryRoot = path.join(__dirname, 'jquery.js');
/*
  命令行参数帮助工具
  设置 option b 代表 book ,[book]表示该参数可以通过program访问,这个参数表示书本编号
  命令 eg:
  node book.js -b /dudu-34/158981/  
*/
program
    .version('0.1.0')
    .option('-b, --book [book]', 'book bookUrl')
    .option('-n, --name [name]', 'name bookName')
    .parse(process.argv);

//缺少参数直接退出
if (!program.book) {
    return
}


const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

var url = 'https://www.123du.cc';
var bookUrl = 'https://www.123du.cc';
bookUrl += program.book
url += program.book
try {
    //提供async环境
    (async function() {
        //创建实例
        const instance = await phantom.create()
            //创建页面容器
        const page = await instance.createPage()
            //设置
        page.setting("userAgent", userAgent)
        
        
            //判断是否访问成功
        const status = await page.open(bookUrl),code = 1;
        
        if (status !== 'success') {
            //访问失败修改状态码
            code = -1;
        } else {
            //获取当前时间
          await page.injectJs(jqueryRoot)
            var start = Date.now();
            var result = await page.evaluate(function() {
              var time = ''
              var timeStr = $(".NewTitle").first().next('font').text();
              if (timeStr.indexOf("：")>-1) {
                time = timeStr.split("：")[1].split(")")[0];
              }
              return time?new Date(time.replace(new RegExp(/-/gm) ,"/")).getTime():''
            })
            let data = {
                code: code,
                bookName: program.name || '',
                url: bookUrl,
                time: Date.now() - start,
                lastTime: result,
            }
            console.log(JSON.stringify(data));
        }
        //退出实例
        await instance.exit();
    })()
} catch (e) {
    console.log(e)
}
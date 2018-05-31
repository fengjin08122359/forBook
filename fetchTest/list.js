const phantom = require('phantom');
const program = require('commander');
const iconv = require('iconv-lite');
var path = require('path');
var jqueryRoot = path.join(__dirname, 'jquery.js');
/*
  命令行参数帮助工具
  设置 option b 代表 book ,[book]表示该参数可以通过program访问,这个参数表示书本编号
  命令 eg:
  node list.js -b /dudu-34/158981/  
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

headers = {
'Host': "bj.lianjia.com",
'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
'Accept-Encoding': "gzip, deflate, sdch",
'Accept-Language': "zh-CN,zh;q=0.8",
'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36",
'Connection': "keep-alive",
}

const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

var url = 'https://www.123du.cc';
var bookUrl = 'https://www.123du.cc';
bookUrl += program.book + "/list/"
url += program.book
try {
    //提供async环境
    (async function() {
        //创建实例
        const instance = await phantom.create()
            //创建页面容器
        const page = await instance.createPage()
            //设置
        page.setting("headers", headers)
        page.setting("userAgent", userAgent)
        
            //判断是否访问成功
        const status = await page.open(bookUrl,'POST'),code = 1;
        
        if (status !== 'success') {
            //访问失败修改状态码
            code = -1;
        } else {
            //获取当前时间
          await page.injectJs(jqueryRoot)
            var start = Date.now();
            var result = await page.evaluate(function() {
              return $("#DivTitleList .DivTitleLine .SpanTitle").map(function() {
                var linkUrl = $(this).find('a').attr('href')
                return ({
                  title: $(this).text(),
                  link: linkUrl?linkUrl.substring(2):''
                })
              }).toArray()
            })
            let data = {
                code: code,
                bookName: program.name || '',
                url: bookUrl,
                time: Date.now() - start,
                dataList: result,
                count:result?result.length:0
            }
            console.log(JSON.stringify(data));
        }
        //退出实例
        await instance.exit();
    })()
} catch (e) {
    console.log(e)
}
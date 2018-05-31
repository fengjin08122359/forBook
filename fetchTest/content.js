const phantom = require('phantom');
const program = require('commander');
const iconv = require('iconv-lite');
var path = require('path');
var jqueryRoot = path.join(__dirname, 'jquery.js');
/*
  命令行参数帮助工具
  设置 option b 代表 book ,[book]表示该参数可以通过program访问,这个参数表示书本编号
  命令 eg:
  node content.js -c /dudu-34/158981//12488298.html 
*/
program
    .version('0.1.0')
    .option('-c, --content [content]', 'content bookcontent')
    .option('-p, --page [page]', 'page pageNum')
    .parse(process.argv);

//缺少参数直接退出
if (!program.content) {
    return
}

const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request done! ' + Math.random());
        }, second);
    })
}
var pageNum = program.page || 1
var url = 'https://www.123du.cc';
var contentUrl = 'https://www.123du.cc/';
contentUrl += program.content
var pageIndex = contentUrl.indexOf(".html");
contentUrl = contentUrl.substring(0,pageIndex) + '-'+ pageNum + contentUrl.substring(pageIndex)
    
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
        const status = await page.open(contentUrl,'POST'),
            code = 1;
            
        
        if (status !== 'success') {
            //访问失败修改状态码
            code = -1;
        } else {
            //获取当前时间
          await page.injectJs(jqueryRoot)
          await sleep(3000)
            var start = Date.now();
            var result = await page.evaluate(function() {
                return {
                  title:document.title,
                  content:document.querySelector("#PageSet").nextElementSibling.innerText,
                  pageSize:document.querySelector("#PageSet").childNodes.length-2
                }
            })
            let data = {
                code: code,
                url: contentUrl,
                time: Date.now() - start,
                title:result.title,
                content: result.content,
                pageSize: result.pageSize,
                currentPage:pageNum
            }
            console.log(JSON.stringify(data));
        }
        //退出实例
        await instance.exit();
    })()
} catch (e) {
    console.log(e)
}
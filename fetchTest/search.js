const phantom = require('phantom');
const program = require('commander');
const iconv = require('iconv-lite');
var path = require('path');
var jqueryRoot = path.join(__dirname, 'jquery.js');
/*
  命令行参数帮助工具
  设置 option b 代表 book ,[book]表示该参数可以通过program访问,这个参数表示书本编号
  命令 eg:
  node search.js -s 美国  
*/
program
    .version('0.1.0')
    .option('-s, --search [search]', 'search book')
    .parse(process.argv);

//缺少参数直接退出
if (!program.search) {
    return
}


const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`

var url = 'https://www.123du.cc';
var searchUrl = 'https://www.123du.cc/Search/';

var gbkSearch = iconv.encode(program.search,'gbk');
var gbkSearchStr = gbkSearch.toString('hex')
var gbkSearchMake = ''
for (var i=0,len = gbkSearchStr.length;i<len;i=i+1) {
  if (i%2 == 0){
    gbkSearchMake+="%";
  }
  gbkSearchMake += gbkSearchStr[i]
}
var settings = {
  operation: "POST",
  data: JSON.stringify({
    q: gbkSearchMake,
    st: 0,
    x: 22,
    y: 8
  })
};
//searchUrl += "?q="+gbkSearchMake+"&st=0&x=22&y=8"

var postBody =  "q="+gbkSearchMake+"&st=0&x=22&y=8"
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
        const status = await page.open(searchUrl,'POST',postBody),
            code = 1;
            
        
        if (status !== 'success') {
            //访问失败修改状态码
            code = -1;
        } else {
            //获取当前时间
          await page.injectJs(jqueryRoot)
            var start = Date.now();
            var result = await page.evaluate(function() {
              var count = 0;
                return $(".DivMain .DivMargin .Title").map(function() {
                  return ({
                      index: count++,
                      title: $(this).text(),
                      link: 'https://www.123du.cc' + $(this).attr('href'),
                      linkNum: $(this).attr('href')
                  })
                }).toArray()
            })
            let data = {
                code: code,
                search: program.search,
                url: searchUrl,
                time: Date.now() - start,
                dataList: result
            }
            console.log(JSON.stringify(data));
        }
        //退出实例
        await instance.exit();
    })()
} catch (e) {
    console.log(e)
}
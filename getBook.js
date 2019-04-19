const rq = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

rq.get("https://www.kancloud.cn/sophie_u/escript2015/534736",(err,data) => {
  if(err){
    console.log(err);
    return
  }
  const $ = cheerio.load(data.body);
  const content = $('.content').text() 
  fs.writeFile("index.html",content,(err) => {
    if (err) {
      console.log(err);
    }
  })
  console.log(data);
});
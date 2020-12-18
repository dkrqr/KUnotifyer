/**
 * tweetを投稿
 *
 * @param {string} content tweetしたい文字列
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/update.jsonをfetchした結果
 */
function postTweet(content) {
  content = modifyContent_(content)[0];
  var service  = twitter.getService();
  Logger.log("log");
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json',
    {
    method: 'post',
    payload: {
      status: content
    },
    muteHttpExceptions:true
  });
  Logger.log("postTweet:%s",response["id_str"]);
  return response;
}

/**
 * リプライを投稿
 *
 * @param {string} content tweetしたい文字列
 * @param {HTTPResponse} status リプしたいtweetのHTTPResponse
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/update.jsonをfetchした結果
 */
function postReply(content, status) {
  var inReplyToStatusId;
  if(typeof(status) == "object"){
    status = JSON.parse(status);
    inReplyToStatusId = JSON.stringify(status["id_str"]);
  }
  if(typeof(inReplyToStatusId) == "string"){
    inReplyToStatusId = inReplyToStatusId.substr(1,inReplyToStatusId.length-2);
    //Logger.log(inReplyToStatusId);
  }
  
  content = modifyContent_(content)[0];
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json',
    {
    method: 'post',
    payload: {
      in_reply_to_status_id: inReplyToStatusId,
      auto_populate_reply_metadata: "true",
      status: content
    },
    muteHttpExceptions:true
  });
  Logger.log("postreply:%s to %s",response["id_str"],inReplyToStatusId);
  return response;
}

/**
 * 一続きのtweetを投稿
 *
 * @param {string} originalContent tweetしたい文字列
 * @param {HTTPResponse} status リプしたいtweetのHTTPResponse
 * @return {HTTPResponse} 最後のhttps://api.twitter.com/1.1/statuses/update.jsonをfetchした結果
 */
function postLongTweet(originalContent, status) {
  var content = originalContent;
  var tweet;
  while(content != ""){
    var temp = modifyContent_(content);
    tweet = temp[0];
    content = temp[1];
    status = postReply(tweet,status);
    if(status.getResponseCode() != 200){
      Logger.log("postLongTweet failed");
      return status;
    }
  }
  Logger.log("postLongTweet(last):%s", status["id_str"]);
  return status;
}

/**
 * tweetを削除
 *
 * @param {string} id 削除したいtweetのid
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/destroy.jsonをfetchした結果
 */
function deleteTweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/destroy/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  Logger.log("deleted:\n%s",response);
  return response;
}

function modifyContent_(content){
  //contentを修正
  var regExp = new RegExp("((https?|ftp):\/\/)?[-_a-zA-Z0-9]+\.[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+","g");
  var urlString = regExp.exec(content);
  var tweetLength = 140;
  while(urlString != null){
    if(urlString.index <= tweetLength - 12){
      tweetLength += urlString[0].length - 12;
      urlString = regExp.exec(content);
    }
    else if(urlString.index < tweetLength){
      tweetLength = urlString.index;
      break;
    }
  }
  content = content.replace(/[死殺]/g,"○");
  content = content.replace(/fuck/gi,"f**k");
  var tweet = [content.substr(0,tweetLength), content.substr(tweetLength)];
  return tweet;
}

function test_(){
  postTweet("test");
  return 0;
}
function retweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/retweet/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

function undoRetweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/unretweet/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

// ツイートを投稿
function postTweet(content) {
  content = modifyContent(content)[0];
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
  Logger.log(response);
  return response;
}

// リプライを投稿
function postReply(content, status) {
  var inReplyToStatusId;
  if(typeof(status) == "object"){
    status = JSON.parse(status);
    inReplyToStatusId = JSON.stringify(status["id_str"]);
  }
  if(typeof(inReplyToStatusId) == "string"){
    inReplyToStatusId = inReplyToStatusId.substr(1,inReplyToStatusId.length-2);
    Logger.log(inReplyToStatusId);
  }
  
  content = modifyContent(content)[0];
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
  Logger.log(response);
  return response;
}

// 一続きのtweetを投稿
function postLongTweet(originalContent, status) {
  var content = originalContent;
  var tweet;
  while(content != ""){
    var temp = modifyContent(content);
    tweet = temp[0];
    content = temp[1];
    status = postReply(tweet,status);
    if(status.getResponseCode() != 200){
      return status;
    }
  }
  Logger.log(status);
  return status;
}

//tweetを削除
function deleteTweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/destroy/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  Logger.log(response);
  return response;
}

function modifyContent(content){
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

function test(){
  postTweet("test");
  return 0;
}
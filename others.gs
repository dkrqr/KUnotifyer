// タイムラインを取得
function getUserTimeline(screenName) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json'
                               + '?screen_name=' + screenName
                               + '&trim_user=true'  
  );
  response = JSON.parse(response);
//  Logger.log(response);
  return response;
}

// あるtweet以降のタイムラインを取得
function getUserTimelineSinceId(screenName, sinceId) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json'
                               + '?screen_name=' + screenName
                               + '&trim_user=true'
                               + '&since_id=' + sinceId
  );
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

//検索
//searchTweet("hoge", "fuga", 2000-01-01)でfugaの2000-01-01以前のhogeを含むtweetを返す
function searchTweet(searchWords, from, until){
  searchWords = encodeURI(searchWords);
  if(from){
    searchWords = "from%3A" + from + "%20" + searchWords
  }
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/search/tweets.json'
                               + '?q=' + searchWords
                               + '&result_type=recent'
                               + '&count=100'
                               + (until ? ('&until=' + until) : ('') )
  );
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}


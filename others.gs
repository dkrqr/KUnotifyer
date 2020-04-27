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
//searchTweet("hoge", "fuga", 2000-01-01)で@fugaの2000-01-01以前のhogeを含むtweetを返す
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

//ユーザー情報を取得．.nameで名前が取れたりする
function getUserInfo() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/account/verify_credentials.json');
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

//ユーザー情報を変更
function setUserInfo(name, url, location, description) {
  var service  = twitter.getService();
  var fetchUrl = 'https://api.twitter.com/1.1/account/update_profile.json?'
  if(name)        fetchUrl += '&name='        + name;
  if(url)         fetchUrl += '&url='         + url;
  if(location)    fetchUrl += '&location='    + location;
  if(description) fetchUrl += '&description=' + description;
  fetchUrl = fetchUrl.replace(/\?\&/,'?');
  Logger.log(fetchUrl);
  var response = service.fetch(fetchUrl,
    {
    method: 'post',
    muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

//フォロー
function follow(screenName, follow){
  var service  = twitter.getService();
  var fetchUrl = 'https://api.twitter.com/1.1/friendships/create.json?'
  if(screenName) fetchUrl += '&screen_name=' + screenName;
  if(follow)     fetchUrl += '&follow='      + follow;
  fetchUrl = fetchUrl.replace(/\?\&/,'?');
  var response = service.fetch(fetchUrl,
    {
    method: 'post',
    muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

//フォロー解除
function unfollow(screenName){
  var service  = twitter.getService();
  var fetchUrl = 'https://api.twitter.com/1.1/friendships/destroy.json?'
  if(screenName) fetchUrl += '&screen_name=' + screenName;
  fetchUrl = fetchUrl.replace(/\?\&/,'?');
  var response = service.fetch(fetchUrl,
    {
    method: 'post',
    muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}
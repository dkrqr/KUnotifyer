/**
 * 自分の情報を取得
 * 
 * @return {HTTPResponse} https://api.twitter.com/1.1/account/verify_credentials.json をfetchした結果
 */
function getUserInfo() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/account/verify_credentials.json');
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * 自分の情報を変更
 * 
 * @param {string} name 自分の名前(optional)
 * @param {string} url profileに表示されるurl(optional)
 * @param {string} location 位置情報(optional)
 * @param {string} description bio(optional)
 * @return {HTTPResponse} https://api.twitter.com/1.1/account/update_profile.json をfetchした結果
 */
function setUserInfo(name, url, location, description) {
  var service  = twitter.getService();
  var fetchUrl = 'https://api.twitter.com/1.1/account/update_profile.json?'
  if(name)        fetchUrl += '&name='        + name;
  if(url)         fetchUrl += '&url='         + url;
  if(location)    fetchUrl += '&location='    + location;
  if(description) fetchUrl += '&description=' + description;
  fetchUrl = fetchUrl.replace(/\?\&/,'?');
  //Logger.log(fetchUrl);
  var response = service.fetch(fetchUrl,
    {
    method: 'post',
    muteHttpExceptions:true
  });
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * ユーザをフォロー
 * 
 * @param {string} screenName フォローしたいユーザのscreenName
 * @param {bool} follow Enable notifications for the target user. (optional)
 * @return {HTTPResponse} https://api.twitter.com/1.1/friendships/create.json をfetchした結果
 */
function follow(screenName, follow){
  //follow:Enable notifications for the target user. default:true
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
  //Logger.log(response);
  return response;
}

/**
 * ユーザのフォローを解除
 * 
 * @param {string} screenName フォローを解除したいユーザのscreenName
 * @return {HTTPResponse} https://api.twitter.com/1.1/friendships/destroy.json をfetchした結果
 */
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
  //Logger.log(response);
  return response;
}
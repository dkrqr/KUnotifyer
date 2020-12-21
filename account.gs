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

/**
 * ユーザのフォロワーを200件取得
 * 
 * @param {string} screenName フォロワーを取得したいユーザのscreenName(optional)
 * @param {string} cursor returnの"next_cursor_str"を入れると次の200件が取得できる(optional)
 * @param {Boolean} skipStatus trueにするとuser objectsにstatusが含まれなくなる(optional)
 * @return {HTTPResponse} https://api.twitter.com/1.1/followers/list.json をfetchした結果
 */
function getFollower(screenName,cursor,skipStatus) {
  let service  = twitter.getService();
  let response = service.fetch('https://api.twitter.com/1.1/followers/list.json'
                               + '?count=200'
                               + (screenName? ('&screen_name=' + screenName) : ('') )
                               + (cursor? ('&cursor=' + cursor) : ('') )
                               + '&skip_status=' + (skipStatus? ('true') : ('false'))
  );
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * ユーザのフォロワーを全件取得
 * 
 * @param {string} screenName フォロワーを取得したいユーザのscreenName。省略した場合は自分自身(optional)
 * @param {Boolean} skipStatus trueにするとuser objectsにstatusが含まれなくなる(optional)
 * @return {JSON} {count: フォロワー数, users: [{screen_name: , id_str: , name: }]}
 */
function getFollowerAll(screenName, skipStatus) {
  let cursor = "-1";
  let response;
  let screenNameList = {count: 0,users: []};
  do{
    response = getFollower(screenName, cursor, skipStatus);
    cursor = response.next_cursor_str;
    for(i in response.users){
      screenNameList.users.push({screen_name: response.users[i].screen_name, id_str: response.users[i].id_str, name: response.users[i].name});
      screenNameList.count ++;
    }
  }while(cursor != "0");
  //Logger.log(screenNameList);
  return screenNameList;
}
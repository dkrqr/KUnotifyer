/**
 * ユーザーのタイムラインを取得
 *
 * @param {string} screenName タイムラインを取得したいuserのscreenname
 * @param {string} sinceId このidのtweet以降のTLを取得(optional)
 * @param {string} maxId このid以前のTLを取得(optional)
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/user_timeline.jsonをfetchした結果
 */
function getUserTimeline(screenName, sinceId) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json'
                               + '?screen_name=' + screenName
                               + '&trim_user=true'  
                               + (sinceId? ('&since_id=' + sinceId) : ('') )
                               + (maxId? ('&max_id=' + maxId) : (''))
  );
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * あるtweet以降のユーザのタイムラインを取得
 * (非推奨，getUserTimelineを推奨)
 *
 * @param {string} screenName タイムラインを取得したいuserのscreenname
 * @param {string} sinceId このidのtweet以降のTLを取得
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/user_timeline.jsonをfetchした結果
 */
function getUserTimelineSinceId(screenName, sinceId) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json'
                               + '?screen_name=' + screenName
                               + '&trim_user=true'
                               + '&since_id=' + sinceId
  );
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * タイムラインを200件取得
 * 
 * @param {string} sinceId このid以降のTLを取得(optional)
 * @param {string} maxId このid以前のTLを取得(optional)
 * @param {bool} excludeReplies trueにするとリプライが含まれなくなる(optional)(default:false)
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/home_timeline.json をfetchした結果
 */
function getHomeTimeline(sinceId, maxId, excludeReplies) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/home_timeline.json'
                               + '?count=200'
                               + (sinceId ? ('&since_id=' + sinceId) : ('') )
                               + '&trim_user=true'
                               + (maxId ? ('&max_id=' + maxId) : ('') )
                               + (excludeReplies ? ('&exclude_replies=' + excludeReplies) : ('') )
  );
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * tweetを検索
 * 
 * @param {string} searchWords 検索のクエリ
 * @param {string} from ユーザのscreen name(from:hoge)(optional)
 * @param {string} until この日までのtweetを検索。7日前まで。(optional)(YYYY-MM－DD)
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/home_timeline.json をfetchした結果
 */
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
  //Logger.log(response);
  return response;
}
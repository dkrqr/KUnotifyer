/**
 * tweetをretweet
 *
 * @param {string} id RTしたいtweetのid
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/retweet.jsonをfetchした結果
 */
function retweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/retweet/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log("retweet:%s",response["id_str"]);
  return response;
}

/**
 * tweetのretweetをやめる
 *
 * @param {string} id RTをやめたいtweetのid
 * @return {HTTPResponse} https://api.twitter.com/1.1/statuses/unretweet.jsonをfetchした結果
 */
function undoRetweet(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/unretweet/'
                               + id + '.json'
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  Logger.log("undoRetweet:%s",response["id_str"]);
  return response;
}

/**
 * tweetをfavorite
 *
 * @param {string} id favoriteしたいtweetのid
 * @return {HTTPResponse} https://api.twitter.com/1.1/favorites/create.jsonをfetchした結果
 */
function favorite(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/favorites/create.json?id='
                               + id
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * tweetのfavoriteをやめる
 *
 * @param {string} id favoriteをやめたいtweetのid
 * @return {HTTPResponse} https://api.twitter.com/1.1/favorites/destroy.jsonをfetchした結果
 */
function undoFavorite(id){
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/favorites/destroy.json?id='
                               + id
                               ,{
                                 method: 'post',
                                 muteHttpExceptions:true
  });
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}
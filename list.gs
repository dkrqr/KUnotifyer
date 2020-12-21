/**
 * ユーザの所有するリストの一覧を取得
 *
 * @param {string} screenName タイムラインを取得したいuserのscreenname
 * @return {HTTPResponse} https://api.twitter.com/1.1/lists/ownerships.json をfetchした結果
 */
function getUserLists(screenName) {
  let service  = twitter.getService();
  let response = service.fetch('https://api.twitter.com/1.1/lists/ownerships.json'
                               + '?count=1000'
                               + (screenName? ('&screen_name=' + screenName) : ('') )
  );
  response = JSON.parse(response);
  Logger.log(response);
  return response;
}

/**
 * リストのツイートを取得
 *
 * @param {string} listId 取得したいリストのid
 * @param {string} sinceId このidのtweet以降のTLを取得(optional)
 * @param {string} maxId このid以前のTLを取得(optional)
 * @param {boolean} includeRts falseにするとRTを含まない(optional)
 * @return {HTTPResponse} https://api.twitter.com/1.1/lists/statuses.json をfetchした結果
 */
function getTweetsInLists(listId, sinceId, maxId, includeRts) {
  let service  = twitter.getService();
  let response = service.fetch('https://api.twitter.com/1.1/lists/statuses.json'
                               + '?list_id=' + listId
                               + (sinceId? ('&since_id=' + sinceId) : ('') )
                               + (maxId? ('&max_id=' + maxId) : ('') )
                               + (includeRts? ('&inclue_rts=' + includeRts) : ('') )
  );
  response = JSON.parse(response);
  //Logger.log(response);
  return response;
}

/**
 * リストのメンバーを複数追加
 *
 * @param {string} listId 取得したいリストのid
 * @param {string[]} screenNames メンバーに追加したいユーザのscreenname
 * @return {HTTPResponse} https://api.twitter.com/1.1/lists/members/create_all.json をfetchした結果
 */
function addListMember(listId,screenNames) {
  let screenNameList = '';
  for(i in screenNames){
    screenNameList += screenNames[i] + ',';
  }
  screenNameList = screenNameList.substring(0, screenNameList.length - 1);
  let service  = twitter.getService();
  let response = service.fetch('https://api.twitter.com/1.1/lists/members/create_all.json',
    {
    method: 'post',
    payload: {
      list_id: listId,
      screen_name: screenNameList
    },
    muteHttpExceptions:true
  });
  Logger.log("addListMember:%s",screenNameList);
  return response;
}

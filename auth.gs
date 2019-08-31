var properties = PropertiesService.getScriptProperties();
var twitter = TwitterWebService.getInstance(
  properties.getProperty('consumerKey'),     // 作成したアプリケーションのConsumer Key
  properties.getProperty('consumerSecret')   // 作成したアプリケーションのConsumer Secret
);

// 認証
function authorize() {
  twitter.authorize();
}

// 認証解除
function reset() {
  twitter.reset();
}

// 認証後のコールバック
function authCallback(request) {
  return twitter.authCallback(request);
}
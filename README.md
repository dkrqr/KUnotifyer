# KUnotifyer
dkrqr's twitter client

~~ライブラリはTwitterWebServiceを使用  
プロジェクトキーは1rgo8rXsxi1DxI_5Xgo_t3irTw1Y5cxl2mGSkbozKsSXf2E_KBBPC3xTF~~

2020/04/27追記  
ランタイムをV8に変えると上記のライブラリでauth()が実行できないっぽいので，
1. https://script.google.com/d/1rgo8rXsxi1DxI_5Xgo_t3irTw1Y5cxl2mGSkbozKsSXf2E_KBBPC3xTF/edit のコピーを作成。
1. コピーのプロジェクトの名前をTwitterWebServiceに変え，ライブラリのバージョンを18にする。
1. コピーのプロジェクトをKUnotifyerのライブラリに追加。

もしくは
1. 1KZkNP_iRfp6ySN4g6SteEPd1p5BFBw3apafXN7TgaohoBjDs0LkxyVhzをライブラリに追加
追記終了

初めて使うときには，

twitterアプリケーションのcallbackURLに以下のURLを設定
https://script.google.com/macros/d/[スクリプトID]/usercallback

プロジェクトプロパティを開き，  
'consumerKey'にコンシューマーキーを  
'consumerSecret'にコンシューマーシークレットを  
登録

authorization()を実行し，ログに記録されるurlにアクセスして認証。

参考：  
https://qiita.com/akkey2475/items/ad190a507b4a7b7dc17c  
https://qiita.com/kawarayu/items/d5792c2c70f532c01b9a

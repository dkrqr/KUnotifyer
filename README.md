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

プロジェクトプロパティのキー
'consumerKey'にコンシューマーキーを
'consumerSecret'にコンシューマーシークレットを
登録

初めて使うときにauth()を実行する

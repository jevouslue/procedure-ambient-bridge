# Procedure用関数補完
Procedure.define で登録された関数をjsDocをもとに型定義ファイルを生成し補完を実現

## 使用方法
1. Procedure.defineの対象関数にjsDocを書く
2. 型定義ファイルの更新

### jsDocについて
`/**`から`*/`のコメント内で特定のフォーマットで関数の説明を書く  
これによりエディタでの入力補完や、引数の不一致検知、定義へのジャンプ、呼び出し元一覧表示などが実現され、開発体験が向上  
jsDocをもとにドキュメントの自動生成も可能  

### 書式
1. 関数の直前に`/**`から`*/`でブロックコメントを追加
2. 関数の説明を記述
3. 引数がある場合は`@param {変数の型} 変数名 説明`の書式で記述(説明は任意)
4. 戻り値の型を`@returns 戻り値の型`の書式で記述

### 記述例
```js
function getUserInfo(userId, includeDetail) {
  // 実装
  return { name: "sample", age: 20 };
}
```
↓ 
↓ 関数定義の直前の行で`/**`を入力し、エンターでテンプレートが自動生成される  
↓ 
```js
/**
 * 
 * @param {*} userId 
 * @param {*} includeDetail 
 * @returns 
 */
function getUserInfo(userId, includeDetail) {
  // 実装
  return { name: "sample", age: 20 };
}
```
↓ 
↓ 関数の説明、引数、戻り値を記述
↓ 
```js
/**
 * ユーザー情報を取得する。
 *
 * @param {string} userId ユーザーID
 * @param {boolean} [includeDetail=false] 詳細情報を含めるかどうか
 * @returns {{name: string, age: number}} ユーザー情報
 */
function getUserInfo(userId, includeDetail) {
  // 実装
  return { name: "sample", age: 20 };
}
```

## VSCode設定
### 定義にジャンプ
右クリックで`ソース定義へ移動`を選択

### ctrl + クリックでジャンプ
プロパティの宣言と関数の実体の両方が定義として認識される 
この様に複数提議がみつかった場合に候補表示をさせずに先頭ものにジャンプ 
※ `.d.ts`か`.js`になるかは制御できない  
settings.jsonに下記を追加
```
"editor.gotoLocation.multipleDefinitions": "goto"
```

### 型定義ファイルの自動生成
通常の関数呼び出しであればjsDocのみで問題ないが、intra-martの場合`Procedure.define(関数名)`で関数をProcedureに登録し`Procedure.関数名()`で呼び出すことができる  
この場合でも補完ができるようにするために型定義ファイルの作成が必要  
しかし、関数定義の更新時にjsDocと型定義ファイルどちらも修正が必要になるため、jsDocから型定義ファイルを自動生成する  
#### jsDocから型定義ファイルを自動生成コマンド
```bash
npm run gen:procedure
```  
#### ウォッチモード
ファイルの変更時に自動でjsDocから型定義ファイルを自動生成したい場合はファイル変更監視(ウォッチ)モードを起動  
```bash
npm run watch:procedure
```
※事前に`npm install`の実行が必要  

#### VSCodeを開いたら自動でwatchが起動 
`.vscode/tasks.json`に下記追加
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "watch:procedure",
      "type": "npm",
      "script": "watch:procedure",
      "isBackground": true,
      "problemMatcher": [],
      "runOptions": {
        "runOn": "folderOpen"
      }
    }
  ]
}
```
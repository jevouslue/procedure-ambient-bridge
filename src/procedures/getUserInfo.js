Procedure.define('getUserInfo', getUserInfo);
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

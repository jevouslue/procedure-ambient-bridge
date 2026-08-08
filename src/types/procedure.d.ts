/** Procedure.define で登録された関数群がここにマージされていく */
interface ProcedureRegistry {}

/**
 * Procedure オブジェクト
 */
declare const Procedure: {
  /**
   * 関数をProcedureに登録する
   * @param name 登録名
   * @param fn 実装
   */
  define<T extends (...args: any[]) => any>(name: string, fn: T): void;
} & ProcedureRegistry;
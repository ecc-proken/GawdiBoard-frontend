// バックエンド班がLaravelのデフォルト機能をそのまま使ってるので
// 実際のレスポンスには現状の要件には合致しないプロパティも含まれています。
// 要件外のプロパティを型定義するのも変なので必要なものだけを定義しています。
type PaginatedResponse<T extends Record<string, any> & { meta?: never }> = {
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
} & {
  [Key in keyof T]: T[Key];
};

export type { PaginatedResponse };

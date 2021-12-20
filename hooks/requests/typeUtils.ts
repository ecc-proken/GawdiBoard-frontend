// バックエンド班がLaravelのデフォルト機能をそのまま使ってることで
// 要件に特に合致しないものも色々入ってるのでいるものだけを定義してる。
// 今後使うプロパティが増えたら適宜追加してください。
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

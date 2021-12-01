function buildURLSeachParams(params: Record<string, string | string[]>) {
  // クエリパラメタが配列の時だけ処理を分ける
  const stringParams: Record<string, string> = {};
  const arrayParams: Record<string, string[]> = {};

  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      arrayParams[key] = params[key] as string[];
    } else {
      stringParams[key] = params[key] as string;
    }
  });

  const query = new URLSearchParams(stringParams);

  // {a: ["1", "2", "3"]} を 'a[]=1&a[]=2&a[]=3'にする
  Object.keys(arrayParams).forEach((key) => {
    arrayParams[key].forEach((param) => {
      query.append(key + '[]', param);
    });
  });

  return query;
}

type jsonClientData = {
  // クエリパラメタ (stringのみ https://github.com/microsoft/TypeScript/issues/32951)
  params?: Record<string, string | string[]>;
  //リクエストボディ
  body?: any;
  method?: string;
};

// HACK: Exceptionの取り扱いや配列パラメターの扱いとかややこしいのでaxiosとかに移行した方がいいかも?
async function jsonClient(
  endpoint: string,
  { params, body, method }: jsonClientData = {},
  init?: RequestInit
) {
  let url = endpoint;

  if (params) {
    const divider = ~endpoint.indexOf('?') ? '&' : '?';
    const query = buildURLSeachParams(params);
    url += divider + query;
  }

  const headers: HeadersInit = {
    Accept: 'application/json',
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  //initにもmethodやbodyがあったら上書きする
  const response = await fetch(url, {
    method: method ?? 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers,
    credentials: 'include',
    ...init,
  }).catch((error) => {
    //ネットワークエラー
    throw new Error(error.message);
  });

  const data = await response.json().catch(() => {
    //JSONじゃないレスポンスが返ってきても何も何もしない
  });

  if (!response.ok) {
    // 200番台以外のレスポンス
    throw new Error(data?.message ?? 'エラーの詳細が提供されませんでした。');
  }

  return data;
}

export { jsonClient };

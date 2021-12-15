function getPaginationInfo(url: URL, { totalPage = 3, perPage = 3 } = {}) {
  const currentPage = +(url.searchParams.get('page') || 1);
  return {
    // バックエンド班がLaravelをカスタマイズするのが面倒なだけの理由で
    // 使わないプロパティが色々入ってるので要件的に合致するものだけを定義してる。
    // 今後使うプロパティが増えたら適宜追加してください。
    meta: {
      current_page: currentPage,
      last_page: totalPage,
      total: perPage * totalPage,
    },
  };
}

export { getPaginationInfo };

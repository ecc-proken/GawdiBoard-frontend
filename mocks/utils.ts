function getPaginationInfo(url: URL, { totalPage = 3, perPage = 3 } = {}) {
  const currentPage = +(url.searchParams.get('page') || 1);
  return {
    // 実際のAPIのレスポンスにはもっと色々なプロパティがついています。
    // 今後使うプロパティが増えたら適宜追加してください。
    meta: {
      current_page: currentPage,
      last_page: totalPage,
      total: perPage * totalPage,
    },
  };
}

export { getPaginationInfo };

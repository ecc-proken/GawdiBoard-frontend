import { renderHook } from '@testing-library/react-hooks';
import { createWrapper } from '../../../contexts/testUtils';
import { useInfiniteOffers } from '../offers';

// パラメタがちゃんとつくかとかはフックを呼び出すコンポーネント側で十分にテストできると思うのでここには書かない。
describe('useInfiniteOffers', () => {
  it('pageを渡さないと1から始まる', async () => {
    const { result, waitFor } = renderHook(() => useInfiniteOffers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    const data = result.current.data?.pages[0].meta.current_page;
    expect(data).toBe(1);
  });

  it('pageを渡すとその数字から始まる', async () => {
    const { result, waitFor } = renderHook(
      () => useInfiniteOffers({ page: '2' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => result.current.isSuccess);

    const data = result.current.data?.pages[0].meta.current_page;
    expect(data).toBe(2);
  });

  it('fetchNextPageでpageが1進む', async () => {
    const { result, waitFor } = renderHook(
      () => useInfiniteOffers({ page: '1' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => result.current.isSuccess);
    expect(result.current.hasNextPage).toBe(true);

    result.current.fetchNextPage();
    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);
    expect(result.current.data?.pages[1].meta.current_page).toBe(2);
  });

  it('最後のページになったらhasNextPageがfalseになる', async () => {
    const { result, waitFor } = renderHook(
      () => useInfiniteOffers({ page: '3' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.hasNextPage).toBe(false);
  });
});

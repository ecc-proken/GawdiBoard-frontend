import { useQuery } from 'react-query';
import { jsonClient } from '../../utils/httpClient';

type Tag = {
  id: number;
  name: string;
  genre_id: number;
  genre_name: string;
  target_id?: number;
  target_name?: string;
};

type GetTagsRequest = {
  tag_genre_id: string;
};
type GetTagsResponse = {
  tags: Tag[];
};

function useTags({ tag_genre_id }: GetTagsRequest) {
  return useQuery<GetTagsResponse>(
    ['tags', { tag_genre_id }],
    () =>
      jsonClient('/tag-list', {
        params: {
          tag_genre_id,
        },
      }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}

export { useTags };
export type { Tag };

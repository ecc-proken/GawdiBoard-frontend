import { useInfiniteQuery, useQuery } from 'react-query';
import { jsonClient } from '../../utils/httpClient';
import type { Tag } from './tags';
import type { PaginatedResponse } from './typeUtils';

type Offer = {
  id: number;
  title: string;
  target?: string;
  job?: string;
  note?: string;
  picture?: string;
  link?: string;
  user_class?: string;
  post_date: string;
  end_date: string;
  student_number: number;
  user_name: string;
  tags: Tag[];
};

type GetOffersRequest = {
  offer_tag_ids?: string[];
  page?: string;
};
type GetOffersResponse = PaginatedResponse<{ offers: Offer[] }>;

type GetOfferRequest = string;
type GetOfferResponse = {
  offer: Offer;
};

function useInfiniteOffers(options?: GetOffersRequest) {
  return useInfiniteQuery<GetOffersResponse, Error>(
    'offers',
    ({ pageParam }) => {
      pageParam || (pageParam = options?.page || 1);
      return jsonClient('/offer/list', {
        params: { ...options, page: pageParam },
      });
    },
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.meta.current_page + 1;
        return lastPage.meta.last_page >= nextPage ? nextPage : false;
      },
    }
  );
}

function useOffer(offer_id: GetOfferRequest, enabled = true) {
  return useQuery<GetOfferResponse>(
    ['offer', offer_id],
    () =>
      jsonClient('/offer/single', {
        params: { offer_id },
      }),
    {
      enabled,
    }
  );
}

export type { Offer };
export { useInfiniteOffers, useOffer };

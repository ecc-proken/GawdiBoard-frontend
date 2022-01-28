import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
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
  offer_tag_ids?: number[];
  page?: string;
};
type GetOffersResponse = PaginatedResponse<{ offers: Offer[] }>;

type GetOfferRequest = { offer_id: number };
type GetOfferResponse = {
  offer: Offer;
};

type AddOfferRequest = {
  title: string;
  target: string;
  job: string;
  note?: string;
  picture?: string;
  link?: string;
  end_date: string;
  user_class: string;
  offer_tag_ids?: number[];
};
type AddOfferResponse = {
  offer: Offer;
};

type EditOfferRequest = {
  offer_id: number;
} & Partial<AddOfferRequest>;
type EditOfferResponse = {
  offer: Offer;
};

type GetUserOffersRequest = { student_number: string };
type GetUserOffersResponse = {
  offers: Offer[];
};

function useInfiniteOffers(
  { page = '1', offer_tag_ids = [] }: GetOffersRequest = {},
  enabled = true
) {
  const queryClient = useQueryClient();
  return useInfiniteQuery<GetOffersResponse, Error>(
    ['offers', offer_tag_ids],
    ({ pageParam }) => {
      pageParam || (pageParam = page);
      return jsonClient('/offer/list', {
        params: { offer_tag_ids, page: pageParam },
      });
    },
    {
      enabled,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.meta.current_page + 1;
        return lastPage.meta.last_page >= nextPage ? nextPage : false;
      },
      onSuccess: (data) => {
        data.pages[data.pages.length - 1].offers.forEach((offer) => {
          queryClient.setQueryData(['offer', offer.id], { offer });
        });
        // 募集の一件取得APIを叩いたときに再利用できるようにそれぞれキャッシュする
        // offer_tag_idsなどのパラメタがあるのでgetQueryDataではどのクエリキャッシュから取ればいいかわからない
        // この方法だとキーが個々のofferのcacheTimeはデフォルトで固定になるっぽいのと
        // その他のクエリのオプションも設定できないけど、今のところ困らなさそうなのでこの方法を採用してる
        // https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydata
        // 問題が出てきたらキャッシュを諦めるか、直近の募集一覧APIコールのパラメタをどこかに覚えさせて対応してください
      },
    }
  );
}

function useOffer({ offer_id }: GetOfferRequest, enabled = true) {
  return useQuery<GetOfferResponse>(
    ['offer', offer_id],
    () =>
      jsonClient('/offer/single', {
        params: { offer_id: offer_id.toString() },
      }),
    {
      enabled,
    }
  );
}

function useAddOffer() {
  const queryClient = useQueryClient();
  return useMutation<AddOfferResponse, Error, AddOfferRequest>(
    (newOffer) => {
      return jsonClient('/mock/offer/post', {
        method: 'POST',
        body: { ...newOffer },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('offers');
        alert('successfully posted offer!');
      },
    }
  );
}

function useEditOffer() {
  const queryClient = useQueryClient();
  return useMutation<EditOfferResponse, Error, EditOfferRequest>(
    (newOffer) => {
      return jsonClient('/mock/offer/edit', {
        method: 'POST',
        body: { ...newOffer },
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('offers');
        queryClient.setQueryData(['offer', data.offer.id], data);
        alert('successfully edited offer!');
      },
    }
  );
}

function useUserOffers(
  { student_number }: GetUserOffersRequest,
  enabled = true
) {
  const queryClient = useQueryClient();
  return useQuery<GetUserOffersResponse>(
    ['offers', 'user', student_number],
    () =>
      jsonClient('/user/offer-list', {
        params: {
          student_number,
        },
      }),
    {
      enabled,
      onSuccess: (data) => {
        data.offers.forEach((offer) => {
          queryClient.setQueryData(['offer', offer.id], { offer });
        });
      },
    }
  );
}

export type { Offer };
export {
  useAddOffer,
  useEditOffer,
  useInfiniteOffers,
  useOffer,
  useUserOffers,
};

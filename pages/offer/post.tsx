import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import type { NestedValue, Resolver } from 'react-hook-form';
import * as yup from 'yup';
import Layout from '../../components/layouts/Layout';
import { useAddOffer } from '../../hooks/requests/offers';

type FormValue = {
  title: string;
  target: string;
  job: string;
  note: string;
  picture: string;
  link: string;
  end_date: string;
  user_class: string;
  offer_tag_ids: NestedValue<number[]>;
};

const schema = yup.object({
  title: yup.string().required('タイトルは入力が必須です'),
  target: yup.string(),
  job: yup.string(),
  note: yup.string(),
  picture: yup.string(), //TODO: stringじゃない気がする
  link: yup.string().url('リンクは有効なURLでなければいけません'),
  end_date: yup
    .date()
    .required('掲載終了日は選択が必須です')
    .nullable()
    .transform((current, original) => (original === '' ? null : current)),
  user_class: yup.string().required('募集主のクラスは入力が必須です'),
  offer_tag_ids: yup
    .array(yup.number())
    .min(1, 'タグは1つ以上選ぶ必要があります')
    .transform((value) => value.filter(Boolean)),
});

function PostOfferPage() {
  const { mutate, error, isLoading } = useAddOffer();

  const { register, handleSubmit, formState } = useForm<FormValue>({
    resolver: yupResolver(schema) as Resolver<FormValue>,
  });
  const onSubmit = handleSubmit((newOfferAttributes) => {
    mutate(newOfferAttributes);
  });
  const formErrors = formState.errors;

  const router = useRouter();

  return (
    <div>
      <h1>募集投稿</h1>
      <form onSubmit={onSubmit}>
        <p>募集主: 2180372 ECC太郎</p>
        <div>
          <label htmlFor="title">募集のタイトル</label>
          <input id="title" type="input" {...register('title')} />
          {formErrors.title && <span>{formErrors.title.message}</span>}
        </div>
        <div className="tags">
          タグ
          <br />
          <label htmlFor="tag1">フロントエンジニア募集</label>
          <input
            id="tag1"
            type="checkbox"
            value={1}
            {...register('offer_tag_ids.1')}
          />
          <br />
          <label htmlFor="tag2">バックエンドエンジニア募集</label>
          <input
            id="tag2"
            type="checkbox"
            value={2}
            {...register('offer_tag_ids.2')}
          />
          <br />
          <label htmlFor="tag3">デザインナー募集</label>
          <input
            id="tag3"
            type="checkbox"
            value={3}
            {...register('offer_tag_ids.3')}
          />
          {formErrors.offer_tag_ids && (
            <span>{formErrors.offer_tag_ids.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="end-date">掲載終了日</label>
          <input id="end-date" type="date" {...register('end_date')} />
          {formErrors.end_date && <span>{formErrors.end_date.message}</span>}
        </div>
        <div>
          <label htmlFor="target">役職ごとの募集人数</label>
          <textarea id="target" {...register('target')} />
          {formErrors.target && <span>{formErrors.target.message}</span>}
        </div>
        <div>
          <label htmlFor="note">備考</label>
          <textarea id="note" {...register('note')} />
          {formErrors.note && <span>{formErrors.note.message}</span>}
        </div>
        <div>
          <label htmlFor="picture">参考画像</label>
          <input id="picture" type="file" {...register('picture')} />
          {formErrors.picture && <span>{formErrors.picture.message}</span>}
        </div>
        <div>
          <label htmlFor="user_class">募集主のクラス</label>
          <input id="user-class" type="text" {...register('user_class')} />
          {formErrors.user_class && (
            <span>{formErrors.user_class.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="link">参考リンク</label>
          <input id="link" type="text" {...register('link')} />
          {formErrors.link && <span>{formErrors.link.message}</span>}
        </div>
        <button disabled={isLoading}>投稿</button>
        <button
          type="button"
          onClick={() => {
            if (confirm('入力内容を破棄しますか?')) {
              router.push('/board/offers/');
            }
          }}
          disabled={isLoading}
        >
          キャンセル
        </button>
        {error && (
          <p role="alert">
            投稿中にエラーが発生しました。詳細: {error.message}
          </p>
        )}
      </form>
      <style jsx>
        {`
          div:not(first-child) {
            margin: 16px;
          }
          label {
            vertical-align: top;
            margin-right: 8px;
          }
        `}
      </style>
    </div>
  );
}

PostOfferPage.getLayout = (page: ReactElement) => {
  return <Layout title="新しい募集を投稿する">{page}</Layout>;
};

export default PostOfferPage;

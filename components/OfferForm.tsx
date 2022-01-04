import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import type {
  DefaultValues,
  NestedValue,
  Resolver,
  SubmitHandler,
} from 'react-hook-form';
import Modal from 'react-modal';
import * as yup from 'yup';
import { useTags } from '../hooks/requests/tags';

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

type DefaultFormValues = DefaultValues<FormValue>;

type Props = {
  onSubmit: SubmitHandler<FormValue>;
  defaultFormValues?: DefaultFormValues;
  submitButton: (utils: { submit: () => void }) => ReactNode; // TODO: デフォルトのボタンを追加する
  cancelButton: (utils: { handleCancel: () => void }) => ReactNode;
};

const schema = yup.object({
  title: yup.string().required('タイトルは入力が必須です'),
  target: yup.string(),
  job: yup.string(),
  note: yup.string(),
  picture: yup.string(), //TODO: stringじゃない気がする
  link: yup.string().url('リンクは有効なURLでなければいけません'),
  // 投稿内容の入力中に日付を跨いだ場合を考慮してバリデーションのたびに現在日付を取得する
  end_date: yup.lazy(() => {
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const dayInMs = 1000 * 60 * 60 * 24;
    const min = new Date(today + dayInMs * 1);
    const max = new Date(today + dayInMs * 90);

    return yup
      .date()
      .required('掲載終了日は選択が必須です')
      .min(min, '掲載終了日は明日以降でなければいけません')
      .max(max, '掲載終了日は今から90日以内でなければいけません')
      .nullable()
      .transform((current, original) => (original === '' ? null : current));
  }),
  user_class: yup.string().required('募集主のクラスは入力が必須です'),
  offer_tag_ids: yup
    .array(yup.number())
    .min(1, 'タグは1つ以上選ぶ必要があります')
    .transform((value) => value.filter(Boolean)),
});

function OfferForm({
  onSubmit,
  defaultFormValues = {},
  submitButton,
  cancelButton,
}: Props) {
  const [showTagSelector, setShowTagSelector] = useState(false);
  const router = useRouter();

  const { data: tags } = useTags({ tag_genre_id: 1 });

  const { register, handleSubmit, formState, watch } = useForm<FormValue>({
    resolver: yupResolver(schema) as Resolver<FormValue>,
    defaultValues: Object.assign<DefaultFormValues, DefaultFormValues>(
      { offer_tag_ids: [] },
      defaultFormValues
    ),
  });
  const formErrors = formState.errors;
  const selectedTags = watch('offer_tag_ids')
    .filter(Boolean)
    .map((id) => +id);

  const submit = () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => {
    if (confirm('入力内容を破棄しますか?')) {
      router.push('/board/offers/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>募集主: 2180372 ECC太郎</p>
      <div>
        <label htmlFor="title">募集のタイトル</label>
        <input id="title" type="input" {...register('title')} />
        {formErrors.title && <span>{formErrors.title.message}</span>}
      </div>
      <div className="tags">
        タグ
        <Modal
          isOpen={showTagSelector}
          onRequestClose={() => setShowTagSelector(false)}
        >
          <button onClick={() => setShowTagSelector(false)}>x</button>
          {tags &&
            tags.tags.map((tag, i) => (
              <Fragment key={tag.id}>
                <label htmlFor={`tag${i}`}>{tag.name}</label>
                <input
                  id={`tag${i}`}
                  type="checkbox"
                  value={tag.id}
                  {...register(`offer_tag_ids.${i}`)}
                />
                <br />
              </Fragment>
            ))}
        </Modal>
        <button onClick={() => setShowTagSelector(true)}>タグ一覧</button>
        {tags && (
          <div>
            {tags.tags
              .filter(({ id }) => selectedTags.includes(id))
              .map((tag) => (
                <span key={tag.id} className="tag">
                  #{tag.name}
                </span>
              ))}
          </div>
        )}
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
        {formErrors.user_class && <span>{formErrors.user_class.message}</span>}
      </div>
      <div>
        <label htmlFor="link">参考リンク</label>
        <input id="link" type="text" {...register('link')} />
        {formErrors.link && <span>{formErrors.link.message}</span>}
      </div>
      {submitButton({ submit })}
      {cancelButton({ handleCancel })}
      <style jsx>
        {`
          div:not(first-child) {
            margin: 16px;
          }
          label {
            vertical-align: top;
            margin-right: 8px;
          }
          .tag {
            margin: 4px;
            padding: 4px;
            background-color: lightgray;
            white-space: nowrap;
          }
        `}
      </style>
    </form>
  );
}

export default OfferForm;

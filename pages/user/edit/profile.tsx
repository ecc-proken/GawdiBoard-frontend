import Router from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';
import { useProfileForm } from '../../../hooks/forms/useProfileForm';
import { user } from '../../../mocks/handlers/auth';

function EditProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useProfileForm(user);

  const onSubmit = handleSubmit((data) => {
    console.log('submitting with', data);
  });

  const handleCancel = () => {
    if (confirm('入力内容を破棄しますか?')) {
      Router.push(`/user/${user.student_number}`);
    }
  };

  return (
    <div>
      <h1>ユーザー情報変更</h1>
      {user && (
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="user-name">ユーザーネーム</label>
              <input id="user-name" type="text" {...register('user_name')} />
              {errors.user_name && <span>{errors.user_name.message}</span>}
            </div>
            <div>
              <label htmlFor="link">自分のWebサイト</label>
              <input id="link" type="text" {...register('link')} />
              {errors.link && <span>{errors.link.message}</span>}
            </div>
            <div>
              <label htmlFor="self-introduction">自己紹介</label>
              <textarea
                id="self-introduction"
                {...register('self_introduction')}
              />
              {errors.self_introduction && (
                <span>{errors.self_introduction.message}</span>
              )}
            </div>
            <button>変更</button>
            <button type="button" onClick={handleCancel}>
              キャンセル
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

EditProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザー情報を変更する">{page}</Layout>;
};

export default EditProfilePage;

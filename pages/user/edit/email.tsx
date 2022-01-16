import Router from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';
import { useEmailForm } from '../../../hooks/forms/useEmailForm';
import { user } from '../../../mocks/handlers/auth';

function EditEmailPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEmailForm();

  const onSubmit = handleSubmit((data) => {
    console.log('submitting with ', data);
  });
  const handleCancel = () => {
    if (confirm('入力内容を破棄しますか?')) {
      Router.push(`/user/${user.student_number}`);
    }
  };

  return (
    <div>
      <h1>メールアドレス変更</h1>
      {user && (
        <>
          <form onSubmit={onSubmit}>
            <p>現在のメールアドレス: {user.email}</p>
            <div>
              <label htmlFor="email">新しいメールアドレス</label>
              <input id="email" type="text" {...register('email')} />
              {errors.email && <span role="alert">{errors.email.message}</span>}
            </div>
            <button>変更</button>
            <button type="button" onClick={handleCancel}>
              キャンセル
            </button>
          </form>
        </>
      )}
      <style jsx>{`
        form {
          margin: 8px;
        }
        div,
        p {
          margin-bottom: 16px;
        }
        label {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}

EditEmailPage.getLayout = (page: ReactElement) => {
  return <Layout title="メールアドレスを変更する">{page}</Layout>;
};

export default EditEmailPage;

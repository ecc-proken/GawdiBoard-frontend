import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';
import Modal from 'react-modal';
import Layout from '../../../components/layouts/Layout';
import { useEmailForm } from '../../../hooks/forms/useEmailForm';
import { useEditEmail } from '../../../hooks/requests/profile';
import { user } from '../../../mocks/handlers/auth';

function EditEmailPage() {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useEmailForm();

  const { mutate, error, isLoading } = useEditEmail();

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        setShowModal(true);
      },
    });
  });
  const handleCancel = () => {
    if (confirm('入力内容を破棄しますか?')) {
      router.push(`/user/${user.student_number}`);
    }
  };
  const handleDone = () => {
    router.push(`/user/${user.student_number}`);
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
            <button disabled={isLoading}>変更</button>
            <button type="button" onClick={handleCancel} disabled={isLoading}>
              キャンセル
            </button>
          </form>
          {error && (
            <p role="alert">
              編集中にエラーが発生しました。詳細: {error.message}
            </p>
          )}
        </>
      )}
      <Modal isOpen={showModal}>
        <h3>新しいメールアドレスの認証が必要です</h3>
        <p className="modal-message">
          <span className="new-email">{getValues('email')}</span>
          に認証メールを送りました。送られたメールに従ってメールアドレスを認証してください。
        </p>
        <button onClick={handleDone}>閉じる</button>
      </Modal>
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
        .modal-message {
          margin: 8px;
        }
        .new-email {
          font-size: 1.2rem;
          padding-inline: 4px;
          color: tomato;
        }
      `}</style>
    </div>
  );
}

EditEmailPage.getLayout = (page: ReactElement) => {
  return <Layout title="メールアドレスを変更する">{page}</Layout>;
};

export default EditEmailPage;

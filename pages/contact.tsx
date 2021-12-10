import type { ReactElement } from 'react';
import Layout from '../components/layouts/Layout';

function ContactPage() {
  return (
    <div>
      <h1>お問い合わせ</h1>
    </div>
  );
}

ContactPage.getLayout = (page: ReactElement) => {
  return <Layout title="お問い合わせ">{page}</Layout>;
};

export default ContactPage;

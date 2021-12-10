import Head from 'next/head';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title} | Gawdi Board</title>
        <meta name="description" content="ECCコン専用の掲示板" />
      </Head>
      <main>{children}</main>
    </>
  );
}

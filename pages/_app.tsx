import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>
        {`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          html,
          body {
            height: 100%;
          }

          body,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          figure,
          blockquote,
          ul,
          ol,
          dl,
          dt,
          dd {
            margin: 0;
          }

          ul,
          ol {
            padding: 0;
          }

          body {
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;

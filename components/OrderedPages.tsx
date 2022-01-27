import { Children, createContext, Fragment, useContext, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';

type WrapperProps = {
  children: ReactElement | ReactElement[];
};

type OrderedPageContextType = {
  activeIndex: number;
  pageCount: number;
  pageForward: () => void;
  pageBack: () => void;
};
const OrderedPageContext = createContext<OrderedPageContextType>(
  {} as OrderedPageContextType
);
OrderedPageContext.displayName = 'OrderedPageContext';

function useOrderedPages() {
  return useContext(OrderedPageContext);
}

function OrderedPages({ children }: WrapperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Page以外のコンポーネントを使いたくなるユースケースが考えにくいのと
  // Pageしかないと仮定することでロジックを考えるのがかなり楽になるのでPage以外が直下にあったらエラーを吐く
  Children.forEach(children, (child) => {
    if (child.type !== Page) {
      throw new Error(
        '<OrderedPages />直下の子要素には<Page />以外は使用できません。'
      );
    }
  });

  const pageCount = Children.count(children);

  const pageForward = () => {
    setActiveIndex((i) => Math.min(i + 1, pageCount - 1));
  };

  const pageBack = () => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  };

  const activePage = Children.map(children, (child, index) => {
    if (activeIndex === index) {
      return child;
    }

    return null;
  });

  return (
    <OrderedPageContext.Provider
      value={{ activeIndex, pageCount, pageForward, pageBack }}
    >
      {activePage}
    </OrderedPageContext.Provider>
  );
}

type PageProps = {
  children: ReactNode;
};

function Page({ children }: PageProps) {
  return <>{children}</>;
}

function ForwardButton({ children }: { children: ReactNode }) {
  const { pageForward } = useOrderedPages();
  return <button onClick={pageForward}>{children}</button>;
}

function BackButton({ children }: { children: ReactNode }) {
  const { pageBack } = useOrderedPages();
  return <button onClick={pageBack}>{children}</button>;
}

function Indicator() {
  const { pageCount, activeIndex } = useOrderedPages();

  const pageIndices = Array.from(Array(pageCount).keys());
  const indices = pageIndices.map((index) => (
    <Fragment key={index}>
      <span>・</span>
      <style jsx>{`
        span {
          font-size: 1.6rem;
          color: ${index === activeIndex ? 'tomato' : 'black'};
        }
      `}</style>
    </Fragment>
  ));

  return <>{indices}</>;
}

export {
  OrderedPages,
  Page,
  ForwardButton,
  BackButton,
  useOrderedPages,
  Indicator,
};

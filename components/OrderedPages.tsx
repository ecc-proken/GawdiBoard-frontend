// react-tabsの実装をみた感じ<TabList />内の<Tab />の数と
// <TabPanel />の数は別々に数えてるので、<TabList />を使わずに
// <TabPanel />だけ使えば同じことをもっと簡単に達成できそう。
// なのだけど、<TabPanel />と<Tab />の数が合わないと警告が出るので正規の使い方じゃなさげ。

import React, {
  Children,
  cloneElement,
  createContext,
  Fragment,
  useContext,
  useState,
} from 'react';
import type {
  ComponentProps,
  MouseEvent,
  ReactNode,
  ReactElement,
} from 'react';

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

function recursiveMap(
  children: ReactNode,
  callback: (child: ReactElement) => ReactNode
): ReactNode {
  return Children.map(children, (child) => {
    if (child === null || typeof child !== 'object') {
      return child;
    }

    if ('type' in child && child.type === Page) {
      return callback(child);
    }

    if (
      'props' in child &&
      'children' in child.props &&
      typeof child.props.children === 'object'
    ) {
      return cloneElement(child, {
        ...child.props,
        children: recursiveMap(child.props.children, callback),
      });
    }

    return child;
  });
}

function OrderedPages({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  let pageCount = 0;
  const childrenCopy = recursiveMap(children, (child) => {
    pageCount++;
    return cloneElement(child, {
      ...child.props,
      selected: activeIndex === pageCount - 1,
    });
  });

  const pageForward = () => {
    setActiveIndex((i) => Math.min(i + 1, pageCount - 1));
  };

  const pageBack = () => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <OrderedPageContext.Provider
      value={{ activeIndex, pageCount, pageForward, pageBack }}
    >
      {childrenCopy}
    </OrderedPageContext.Provider>
  );
}

function Page({
  children,
  selected,
}: {
  children: ReactNode;
  selected?: boolean;
}) {
  return selected ? <>{children}</> : null;
}

function ForwardButton({ children, ...props }: ComponentProps<'button'>) {
  const { pageForward } = useOrderedPages();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
    pageForward();
  };
  return (
    <>
      <button type="button" onClick={onClick} {...props}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            background-color: var(--accent-color);
            padding: 12px 48px;
            border-radius: 4px;
            border: 0;
            color: #ffffff;
            font-weight: 700;
          }
          button:disabled {
            background-color: #b1d9f0;
            cursor: not-allowed;
          }
        `}
      </style>
    </>
  );
}

function BackButton({ children, ...props }: ComponentProps<'button'>) {
  const { pageBack } = useOrderedPages();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
    pageBack();
  };
  return (
    <>
      <button onClick={onClick} {...props}>
        {children}
      </button>
      <style jsx>{`
        button {
          border: 1px solid var(--accent-color);
          padding: 12px 48px;
          border-radius: 4px;
          color: var(--accent-color);
          background-color: #ffffff;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}

export { OrderedPages, Page, ForwardButton, BackButton, useOrderedPages };

import { Fragment } from 'react';
import { useOrderedPages } from '../OrderedPages';

function Indicator() {
  const { pageCount, activeIndex } = useOrderedPages();

  // 完了モーダルはIndicatorの数に含めない
  const indicatorCount = pageCount - 1;
  const indicators = Array.from(Array(indicatorCount).keys());

  const activeIndicator = Math.min(activeIndex, indicatorCount - 1);
  console.log(activeIndicator);

  const indices = indicators.map((index) => (
    <Fragment key={index}>
      <svg height="8" width="8">
        <circle cx="4" cy="4" r="4" />
      </svg>
      <style jsx>{`
        svg {
          fill: ${index === activeIndicator
            ? 'var(--accent-color)'
            : '#cdcdcd'};
          margin-right: 16px;
        }
      `}</style>
    </Fragment>
  ));

  return <>{indices}</>;
}

export default Indicator;

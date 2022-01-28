import type { ReactNode, MouseEvent } from 'react';

type Props = {
  isOpen: boolean;
  onRequestClose?: (event: MouseEvent) => void;
  className?: string;
  children: ReactNode;
};

export default function PopupMenu({
  isOpen,
  onRequestClose,
  className,
  children,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onRequestClose} />
      <div className={className || ''}>{children}</div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
    </>
  );
}

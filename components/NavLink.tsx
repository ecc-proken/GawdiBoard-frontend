import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { Children, cloneElement } from 'react';
import type { ReactElement } from 'react';

type Props = LinkProps & {
  children: ReactElement;
  activeClassName?: string;
};
export default function NavLink({
  children,
  activeClassName = 'active',
  href,
  ...props
}: Props) {
  const router = useRouter();

  const child = Children.only(children);
  let className = child.props.className || '';
  if (router.pathname === href) {
    className = `${className} ${activeClassName}`;
  }

  return (
    <Link href={href} {...props}>
      {cloneElement(child, { className })}
    </Link>
  );
}

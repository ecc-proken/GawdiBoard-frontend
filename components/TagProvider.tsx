import type { ReactNode } from 'react';
import { useTags } from '../hooks/requests/tags';

type Props = {
  tag_genre_id: number;
  children: (queryResult: ReturnType<typeof useTags>) => ReactNode;
};

export default function TagProvider({ tag_genre_id, children }: Props) {
  const data = useTags({ tag_genre_id });

  return <>{children(data)}</>;
}

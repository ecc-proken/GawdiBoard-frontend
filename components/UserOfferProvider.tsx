import type { ReactNode } from 'react';
import { useUserOffers } from '../hooks/requests/offers';

type Props = {
  studentNumber: string;
  children: (queryResult: ReturnType<typeof useUserOffers>) => ReactNode;
};

export default function UserOfferProvider({ studentNumber, children }: Props) {
  const data = useUserOffers(
    { student_number: studentNumber },
    studentNumber !== undefined
  );

  return <>{children(data)}</>;
}

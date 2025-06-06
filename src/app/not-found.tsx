'use client';

import { Button } from '@/components/atom/button';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #1f2937; /* Tailwind's text-gray-900 */
  text-align: center;
  margin: 0;
  padding: 0;
`;

const Text = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: #6b7280; /* Tailwind's text-muted-foreground */
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <Container>
      <div className='space-y-2 text-center'>
        <Title>404</Title>
        <Text>페이지를 찾을 수 없습니다</Text>
        <Text>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</Text>
      </div>
      <Button
        variant={'primary'}
        onClick={() => router.push('/')}
      >
        메인으로 돌아가기
      </Button>
    </Container>
  );
}

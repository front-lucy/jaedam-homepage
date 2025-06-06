'use client';

import NextError from 'next/error';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.log ('GlobalError:', error);

  return (
    <html>
      <body>
        <NextError statusCode={400} />
      </body>
    </html>
  );
}

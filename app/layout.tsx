// app/layout.tsx
import './globals.css';
import { getAccessToken } from '@/lib/getQuranToken';
import Link from 'next/link';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = await getAccessToken();

  const res = await fetch(`${process.env.API_END_POINT}/chapters`, {
    headers: {
      Accept: 'application/json',
      'x-auth-token': token,
      'x-client-id': process.env.CLIENT_ID!,
    },
    next: { revalidate: 86400 * 7 }, // revalidate weekly
  });

  const data = await res.json();
  const { chapters } = data;
  console.log(chapters);

  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          <aside style={{ width: '250px', padding: '1rem', borderRight: '1px solid #ddd' }}>
            <h2>Surahs</h2>
            <hr />
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {chapters.map((chapter: any) => (
                <li key={chapter.id}>
                  <Link href={`/surah-${chapter.slug}`}> <span className='font-bold'>{chapter.name_arabic}</span> <br /> {chapter.id} - {chapter.name_simple} <br /> <span className='font-light'>({chapter.translated_name.name})</span></Link>
                  <hr className='font' />
                </li>
              ))}
            </ul>
          </aside>
          <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
        </div>
      </body>
    </html>
  );

}

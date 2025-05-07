import './globals.css';
import { getAccessToken } from '@/lib';
import { SidebarLayout } from '@/components';

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

  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <SidebarLayout chapters={chapters}>{children}</SidebarLayout>
      </body>
    </html>
  );
}
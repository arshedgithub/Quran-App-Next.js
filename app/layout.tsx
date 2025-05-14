import './globals.css';
import { Layout } from '@/components';
import { apiFetch } from '@/lib';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const chaptersData = await apiFetch<{ chapters: Chapter[] }>(`/chapters`, { revalidate: 86400 * 7 });

  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Layout chapters={chaptersData.chapters}>{children}</Layout>
      </body>
    </html>
  );
}
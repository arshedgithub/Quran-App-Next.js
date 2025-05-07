import './globals.css';
import { SidebarLayout } from '@/components';
import { apiFetch } from '@/lib';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const chaptersData = await apiFetch<{ chapters: Chapter[] }>(`/chapters`, { revalidate: 86400 * 7 });

  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <SidebarLayout chapters={chaptersData.chapters}>{children}</SidebarLayout>
      </body>
    </html>
  );
}
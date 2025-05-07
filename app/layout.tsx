// app/layout.tsx
import './globals.css';
import { getAccessToken } from '@/lib/getQuranToken';
import Link from 'next/link';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = await getAccessToken();
  console.log(token);
  
  
}

import './globals.css';

export const metadata = {
  title: 'Legends — Website Prototype',
  description: 'AI-powered private network for decision-makers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

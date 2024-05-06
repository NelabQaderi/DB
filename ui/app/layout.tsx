// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Sidebar } from '@/components/Molecules/Sidebar/Sidebar';
import { Notifications } from '@mantine/notifications';


export const metadata = {
  title: 'TtT DB',
  description: 'Top in Town Technology Database',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position='top-right' />
          <Sidebar>
            {children}
          </Sidebar>
        </MantineProvider>
      </body>
    </html>
  );
}
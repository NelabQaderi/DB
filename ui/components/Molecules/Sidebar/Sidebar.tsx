'use client';

import ThemeButton from '@/components/Atoms/ThemeButton/ThemeButton';
import { AppShell, Avatar, Box, Burger, Button, Grid, Group, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';


export function Sidebar({ children } : { children: any }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Avatar src="/logo.png" alt="it's me" /> 
          <Title size={15}>Top in Town Technology Database</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Grid>
          <Grid.Col span={10}>
            <Text mb={20}>Sections</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <ThemeButton />
          </Grid.Col>
        </Grid>
        <Button component={Link} href='/instructors' mb={5} fullWidth color='green'>Instructors</Button>
        <Button component={Link} href='/classes' mb={5} fullWidth color='green'>Classes</Button>
        <Button component={Link} href='/students' mb={5} fullWidth color='green'>Students</Button>
        <Button component={Link} href='/report' mb={5} fullWidth color='green'>Report</Button>
        <Button component={Link} href='/logout' mb={5} fullWidth color='green'>Log Out</Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
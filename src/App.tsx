import React from 'react';
import { Layout } from '@/src/components/layout';
import { AppRoutes } from '@/src/routes';

export default function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

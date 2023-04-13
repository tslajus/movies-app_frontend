import { ReactNode } from 'react';

import { Header, Footer } from '../';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;

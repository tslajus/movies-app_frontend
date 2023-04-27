import { Layout } from 'layouts';
import MainRouter from 'navigation/MainRouter';
import { ProfileProvider } from 'providers/ProfileProvider';

function App(): JSX.Element {
  return (
    <div>
      <ProfileProvider>
        <Layout>
          <MainRouter />
        </Layout>
      </ProfileProvider>
    </div>
  );
}

export default App;

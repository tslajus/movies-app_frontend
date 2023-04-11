import { Layout } from 'layouts';
import MainRouter from 'navigation/MainRouter';

function App(): JSX.Element {
  return (
    <div>
      <Layout>
        <MainRouter />
      </Layout>
    </div>
  );
}

export default App;

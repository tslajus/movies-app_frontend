import { Route, Routes } from 'react-router-dom';
import { MoviesListContainer } from 'layouts';

import { ROUTES } from './routes';

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MoviesListContainer />} path={ROUTES.INDEX} />
      <Route element={<MoviesListContainer />} path={ROUTES.MOVIES} />
    </Routes>
  );
};

export default MainRouter;

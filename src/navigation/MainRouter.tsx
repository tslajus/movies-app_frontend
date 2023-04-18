import { Route, Routes } from 'react-router-dom';
import { MoviesList, MovieInfo } from 'pages';

import { ROUTES } from './routes';

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MoviesList />} path={ROUTES.INDEX} />
      <Route element={<MoviesList />} path={ROUTES.MOVIES} />
      <Route element={<MovieInfo />} path={ROUTES.MOVIE} />
    </Routes>
  );
};

export default MainRouter;

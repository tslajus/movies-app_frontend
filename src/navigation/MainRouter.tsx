import { Route, Routes } from 'react-router-dom';
import { MoviesList, MovieInfo, MyMovies } from 'pages';

import PrivateRoute from './PrivateRoute';
import { ROUTES } from './routes';

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MoviesList />} path={ROUTES.INDEX} />
      <Route element={<MoviesList />} path={ROUTES.MOVIES} />
      <Route element={<MovieInfo />} path={ROUTES.MOVIE} />
      <Route element={<PrivateRoute redirectTo={ROUTES.INDEX} routeTo={<MyMovies />} />} path={ROUTES.MY_MOVIES} />
    </Routes>
  );
};

export default MainRouter;

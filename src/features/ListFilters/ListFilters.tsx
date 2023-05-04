import { useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import { Button, InputController } from 'components';
import { fetchGenres, fetchSortOptions } from 'api/moviesFilters';
import { useSearchParams } from 'react-router-dom';

import styles from './ListFilters.module.css';

function ListFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: genreData } = useQuery(['genres'], () => fetchGenres(), {
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  const { data: sortOptionsData } = useQuery(
    ['sort-options'],
    () => fetchSortOptions(),

    {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  );

  const initialValues = {
    title: searchParams.get('title') || '',
    genres: searchParams.get('genres')?.split(',') || [],
    sort: searchParams.get('sort') || '',
  };

  const genreOptions = genreData?.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  const sortOptions = sortOptionsData?.map((sortOption) => ({
    value: sortOption.code.toString(),
    label: sortOption.name,
  }));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const params = new URLSearchParams();
        params.set('title', values.title);
        params.set('sort', values.sort);
        if (values.genres.length > 0) {
          params.set('genres', values.genres.join(','));
        }
        setSearchParams(params);
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <InputController control="textInput" name="title" placeholder="Enter movie title" type="text" />
          <InputController control="select" name="genres" options={genreOptions} placeholder="Select genre" isMulti />
          <InputController control="select" name="sort" options={sortOptions} placeholder="Select sorting" />

          <div className={styles.buttons}>
            <Button text="Submit" type="submit" />
            <Button
              text="Reset"
              onClick={(e) => {
                e.preventDefault();
                setSearchParams('');
                setFieldValue('title', '');
                setFieldValue('genres', '');
                setFieldValue('sort', '');
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ListFilters;

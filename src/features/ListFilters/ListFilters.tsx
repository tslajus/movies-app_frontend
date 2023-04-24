import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import { Button, InputController } from 'components';
import { fetchGenres, fetchSortOptions } from 'api/moviesFilters';
import { useSearchParams } from 'react-router-dom';

import styles from './ListFilters.module.css';

function ListFilters() {
  const { data: genreData } = useQuery(['genres'], () => fetchGenres());
  const { data: sortOptionsData } = useQuery(['sort-options'], () => fetchSortOptions());

  const initialValues = {
    title: '',
    genres: '',
    sort: '',
  };

  const genreOptions = genreData?.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  const sortOptions = sortOptionsData?.map((sortOption) => ({
    value: sortOption.code.toString(),
    label: sortOption.name,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = (params: URLSearchParams): URLSearchParams => {
    const filteredParams = new URLSearchParams();
    params.forEach((value, key) => {
      if (value) {
        filteredParams.set(key, value);
      }
    });
    return filteredParams;
  };

  useEffect(() => {
    const initialParams = {
      title: searchParams.get('title') || '',
      genres: searchParams.get('genres') || '',
      sort: searchParams.get('sort') || '',
    };
    initialValues.title = initialParams.title;
    initialValues.genres = initialParams.genres;
    initialValues.sort = initialParams.sort;
  }, [searchParams]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        setSearchParams(filterParams(new URLSearchParams(values)));
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

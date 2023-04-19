import { TextInputField, SelectField, Button } from 'components';
import { genreOptions, sortOptions } from 'api/shared/tempData';

import styles from './ListFilters.module.css';

function ListFilters() {
  return (
    <form className={styles.form}>
      <TextInputField placeholder="Enter movie title" />
      <SelectField options={genreOptions} placeholder="Select genre" isMulti />
      <SelectField options={sortOptions} placeholder="Select sorting" />
      <div className={styles.buttons}>
        <Button text="Submit" type="submit" />
        <Button text="Reset" type="reset" />
      </div>
    </form>
  );
}

export default ListFilters;

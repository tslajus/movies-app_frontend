import { StatLine, DescriptionBox, Tag } from 'components';

import styles from './InfoBox.module.css';

function InfoBox({ data }: { data: MovieDetails }) {
  const formattedBudget = `$${data.budget.toLocaleString()}`;
  const formattedRevenue = `$${data.revenue.toLocaleString()}`;
  const formattedRuntime = `${data.runtime} min`;
  const formattedCompanies = data.productionCompanies.map((company: Company) => company.name).join(', ');
  const formattedVoteAverage = Math.round(data.voteAverage * 10) / 10;
  const genreTags = data.genres.map((genre: Genre) => {
    return <Tag genre={genre.name} key={genre.id} />;
  });

  return (
    <div>
      <h2 className={styles.title}>
        {data.title} <span>({data.releaseDate})</span>
      </h2>
      <h3 className={styles.tagline}>{data.tagline}</h3>
      <div className={styles.tags}>{genreTags}</div>

      <dl className={styles.statistics}>
        <StatLine name="Duration" value={formattedRuntime} />
        <StatLine name="Vote average" value={formattedVoteAverage} />
        <StatLine name="Vote count" value={data.voteCount} />
        <StatLine name="Budget" value={formattedBudget} />
        <StatLine name="Revenue" value={formattedRevenue} />
      </dl>
      <DescriptionBox description={data.overview} title="Overview" />
      <DescriptionBox description={formattedCompanies} title="Production Companies" />
    </div>
  );
}

export default InfoBox;

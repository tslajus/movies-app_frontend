import styles from './Loader.module.css';

export type LoaderProps = {
  backgroundSize?: 'fullScreen' | 'cover' | 'small' | 'flexible';
  isFast?: boolean;
  isGray?: boolean;
  isSmall?: boolean;
  isNoBackground?: boolean;
  isNoLoader?: boolean;
};

function Loader({ isFast = false, isGray = false, isSmall = false, isNoBackground = false, isNoLoader = false, backgroundSize = 'fullScreen' }: LoaderProps) {
  const backgroundSizeClasses = {
    fullScreen: styles.containerFullScreen,
    cover: styles.containerCover,
    small: styles.containerSmall,
    flexible: styles.containerFlexible,
  };

  const containerClassName = `${styles.container} ${backgroundSizeClasses[backgroundSize]} ${
    isNoBackground ? styles.containerTransparent : styles.containerBlur
  } `;

  const loaderClassName = ` ${
    isNoLoader
      ? styles.loaderHidden
      : `${styles.loader} ${isSmall ? styles.loaderSmall : styles.loaderNormal} ${isFast ? styles.loaderFast : styles.loaderNormal}`
  }`;
  const divClassName = `${styles.div} ${isGray ? styles.divGrey : styles.divColored}`;

  return (
    <div className={containerClassName}>
      <div className={loaderClassName}>
        <div className={divClassName}></div>
        <div className={divClassName}></div>
        <div className={divClassName}></div>
        <div className={divClassName}></div>
      </div>
    </div>
  );
}

export default Loader;

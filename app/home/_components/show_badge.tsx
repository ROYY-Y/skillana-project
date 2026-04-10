import styles from './show_badge.module.css';
import Link from 'next/link';

export function Show_badge() {
  return (
    <div className={styles.badgeSection}>
        <h1 className={styles.mainText}>
            Your achievements, all in one place
        </h1>
            
        <div className={styles.subText}>
            See all the badges you’ve earned and keep track of your growing skill set.
        </div>

        <Link href='' className={styles.btn}>See My Badges</Link>

        <div className={styles.collection}>

            <div className={styles.base}></div>
        </div>
    </div>
  );
};
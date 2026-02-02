import Logout from '../../features/auth/logout/Logout';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/public/course_logo.svg" alt="Logo" />
      </div>
      <nav className={styles.nav}>
        <div className={styles.author}>Harry Potter</div>
        <Logout />
      </nav>
    </header>
  );
}

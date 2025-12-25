import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Button from '../Button/Button';
import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Button href="/" variant="primary" size="large">
              Home
            </Button>
          </li>{' '}
          <li className={css.navigationItem}>
            <Button href="/notes/filter/all" size="large" variant="primary">
              Notes
            </Button>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

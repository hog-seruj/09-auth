'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import buttonCss from '../Button/Button.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';
import Button from '../Button/Button';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearIsAuthenticated();
      router.push('/sign-in');
    }
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Profile
        </Link>
      </li>
      <li className={css.logoutItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <Button onClick={handleLogout} variant="cancel" size="large">
          Logout
        </Button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}

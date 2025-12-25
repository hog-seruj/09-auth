import { getServerMe } from '@/lib/api/serverApi';
import css from './Profile.module.css';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile page',
  description: 'User profile page with account details and settings.',
  openGraph: {
    title: 'Profile page',
    description:
      'Page for viewing and editing your user profile, including account information and avatar.',
    url: 'https://09-auth-delta-sepia.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile page',
      },
    ],
    type: 'website',
  },
};

export default async function Profile() {
  const user = await getServerMe();
  console.log(user.avatar);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Button href={'/profile/edit'} variant="primary">
            Edit Profile
          </Button>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            loading="eager"
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

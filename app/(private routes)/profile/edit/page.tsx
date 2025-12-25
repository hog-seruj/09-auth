'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfile.module.css';
import Button from '@/components/Button/Button';

export default function EditProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('/default-avatar.png');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUsername(user.username ?? '');
          setEmail(user.email ?? '');
          setAvatar(user.avatar ?? '/default-avatar.png');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { username, email };
      const updatedUser = await updateMe(payload);

      setUser(updatedUser);

      router.push('/profile');
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  const handleCancel = () => router.push('/profile');

  if (loading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar ? (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>No Image</div>
        )}

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <Button type="submit" variant="submit">
              Save
            </Button>
            <Button type="button" variant="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

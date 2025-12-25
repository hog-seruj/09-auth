'use client';

import css from './SignUp.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/components/Button/Button';
import { AxiosError } from 'axios';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setError(axiosError.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <Button type="submit" variant="submit">
            Register
          </Button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}

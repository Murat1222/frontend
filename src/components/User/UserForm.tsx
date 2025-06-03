import { useState, type FormEvent } from 'react';

import styles from './styles.module.scss';
import { useCreateUser, useUpdateUser } from '../../hooks/useUsers';
import type { IUser } from '../../types/types';

interface UserFormProps {
  user?: IUser | null;
}

export function UserForm({ user = null }: UserFormProps) {
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [bio, setBio] = useState(user?.bio || '');

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userData = {
      first_name: firstName,
      last_name: lastName,
      bio: bio
    };

    if (user) {
      updateUser.mutate({ ...userData, id: user.id });
    } else {
      createUser.mutate(userData);
      setFirstName('')
      setLastName('')
      setBio('')
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className={styles.form__input}
        required
      />

      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className={styles.form__input}
        required
      />

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        className={styles.form__input}
        required
      />

      <button 
        type="submit" 
        className={styles.form__button}
        disabled={createUser.isPending || updateUser.isPending}
      >
        {user ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
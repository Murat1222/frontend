import { useUsers } from '../../hooks/useUsers';
import type { IUser } from '../../types/types';
import styles from './styles.module.scss'

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.grid}>
      {users?.map((user : IUser) => (
        <div key={user.id} className={styles.user}>
          <img
              className={styles.user__avatar}
              src="https://cdn-icons-png.flaticon.com/512/1/1247.png"
              alt="avatar"
            />
          <h3 className={styles.user__first_name}>{user.first_name} {user.last_name}</h3>
          <p className={styles.user__bio}>{user.bio || 'No bio yet'}</p>
          <button className={styles.user__delete}>&times;</button>
        </div>
      ))}
    </div>
  );
};
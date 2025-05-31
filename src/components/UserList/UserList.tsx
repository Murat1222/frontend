import { useUsers } from '../../hooks/useUsers';
import type { IUser } from '../../types/types';

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-list">
      {users?.map((user : IUser) => (
        <div key={user.id}>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.bio || 'No bio yet'}</p>
        </div>
      ))}
    </div>
  );
};
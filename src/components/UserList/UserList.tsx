import { useUsers } from "../../hooks/useUsers";
import Loader from "../../shared/Loader/Loader";
import type { IUser } from "../../types/types";
import styles from './styles.module.scss';
import { UserForm } from "./UserForm";

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  
  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <UserForm />
      <div className={styles.grid}>
        {users?.map((user: IUser) => (
          <div key={user.id} className={styles.user}>
            <img
              className={styles.user__avatar}
              src="https://cdn-icons-png.flaticon.com/512/1/1247.png"
              alt="avatar"
            />
            <h3 className={styles.user__first_name}>
              {user.first_name} {user.last_name}
            </h3>
            <p className={styles.user__bio}>{user.bio}</p>
            <UserForm user={user} />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
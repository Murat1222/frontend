import { Outlet, Link } from "react-router-dom"
import styles from './styles.module.scss'

function Header() {
  return (
    <>
    <nav className={styles.menu}>
      <Link className={styles.menu__link} to={"/"}>Home</Link>
      <Link className={styles.menu__link} to={"/users"}>Users</Link>
      <Link className={styles.menu__link} to={"/labels"}>Labels</Link>
      <Link className={styles.menu__link} to={"/tasks"}>Tasks</Link>
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  )
}

export default Header
import { NavLink } from 'react-router-dom'

import s from './navBar.module.scss'


const NavBar = () => {
    return (
    <nav className={s.Header}>
            <NavLink
                activeClassName={s.ActiveLink}
                className={s.Link}
                to="/" exact>
                Home
            </NavLink>
            <NavLink
                activeClassName={s.ActiveLink}
                className={s.Link}
                to="/movies">
                Movies
            </NavLink>
    </nav>
    )
}

export default NavBar;
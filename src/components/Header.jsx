/* eslint-disable react/prop-types */
import classes from '../styles/header.module.css';
export default function Header({ clearFilters }) {
    return (
        <nav className={`${classes.product_navbar}`}>
            <button onClick={clearFilters} className={`${classes.clear_btn}`}>Clear Filters</button>
            {/* <div className={`${classes.heading}`}>Products Filter</div> */}
        </nav>
    )
}

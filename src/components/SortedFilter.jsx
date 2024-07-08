/* eslint-disable react/prop-types */
import classes from '../styles/sidebar.module.css'

export default function SortedFilter({ sortOption, setSortOption }) {
    return (
        <main className={`${classes.filters_div}`}>
            <label htmlFor="sortOption" className={`${classes.filters_label}`}>Sort By:</label>
            <select
                id="sortOption"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`${classes.filters_input}`}
            >
                <option value="">Popularity</option>
                <option value="price-asc">Lowest price</option>
                <option value="price-desc"> Highest price</option>
                <option value="name-asc">A to Z</option>
                <option value="name-desc">Z to A</option>
            </select>
        </main>
    )
}

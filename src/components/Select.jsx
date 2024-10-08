/* eslint-disable react/prop-types */
import classes from '../styles/sidebar.module.css'
export default function Select({ selectedFilter, setSelectedFilter, filterProduct, filterType }) {
    return (
        <main className={`${classes.filters_div}`}>
            <label className={`${classes.filters_label}`} htmlFor="category">{filterType} :</label>
            <select
                id="category"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`${classes.filters_select} ${classes.filters_input_select}`}>
                <option value="">All</option>
                {filterProduct.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </main>
    )
}

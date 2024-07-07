/* eslint-disable react/prop-types */
import classes from '../styles/sidebar.module.css'
export default function Select({ selectedFilter, setSelectedFilter, filterProduct }) {
    return (
        <>
            <div className={`${classes.filters_div}`}>
                <label className={`${classes.filters_label}`} htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className={`${classes.filters_input}`}>
                    <option value="">All</option>
                    {filterProduct.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

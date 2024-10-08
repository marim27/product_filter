/* eslint-disable react/prop-types */
import classes from '../styles/sidebar.module.css'
export default function Input({ price, setPrice, filterType }) {
    return (
        <main className={`${classes.filters_div}`}>
            <label className={`${classes.filters_label}`} htmlFor="minPrice">{filterType} :</label>
            <input
                type="number"
                id="minPrice"
                className={`${classes.filters_input} ${classes.filters_input_select}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
        </main>
    )
}

/* eslint-disable react/prop-types */
import classes from '../styles/sidebar.module.css'
export default function SideBar({
    categories,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    setMaxPrice,
    maxPrice,
    brands,
    selectedBrands,
    setSelectedBrands
}) {

    return (
        <div className={`${classes.parent}`}>
            <h2 className={`${classes.heading}`}>Filters</h2>
            <div className={`${classes.filters}`}>
                <div className={`${classes.filters_div}`}>
                    <label className={`${classes.filters_label}`} htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`${classes.filters_input}`}>
                        <option value="">All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className={`${classes.filters_div}`}>
                    <label className={`${classes.filters_label}`} htmlFor="brand">Brand:</label>
                    <select
                        id="brand"
                        value={selectedBrands}
                        onChange={(e) => setSelectedBrands(e.target.value)}
                        className={`${classes.filters_input}`}>
                        <option value="">All</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
                <h3 className={`${classes.filters_label}`} htmlFor="minPrice">Price:</h3>
                <div className={`${classes.filters_div}`}>
                    <label className={`${classes.filters_label}`} htmlFor="minPrice">Min</label>
                    <input
                        type="number"
                        id="minPrice"
                        className={`${classes.filters_input}`}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div className={`${classes.filters_div}`}>
                    <label className={`${classes.filters_label}`} htmlFor="maxPrice">Max</label>
                    <input
                        type="number"
                        id="maxPrice"
                        className={`${classes.filters_input}`}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

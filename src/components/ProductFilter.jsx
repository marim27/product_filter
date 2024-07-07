import classes from '../styles/ProductFilter.module.css';
import { useState, useEffect } from 'react';
import SideBar from './SideBar';

const ProductFilter = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                // setFilteredProducts(data);
                setBrands([...new Set(data.map(product => product.brand))]);
                setCategories([...new Set(data.map(product => product.category))]);
            })
            .catch(error => console.error('Error fetching products :', error));
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            const min = parseFloat(minPrice) || 0;
            const max = parseFloat(maxPrice) || Infinity;
            const filtered = products.filter(product => {
                const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
                const matchesPrice = product.price >= min && product.price <= max;
                return matchesCategory && matchesPrice && matchesBrand;
            });
            setFilteredProducts(filtered);
        };
        filterProducts();
    }, [selectedCategory, minPrice, maxPrice, products, selectedBrands]);

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrands([]);
        setMinPrice('');
        setMaxPrice('');
        // setSortOption('');
        setFilteredProducts(products);
      };
    return (
        <div className={`${classes.parent}`}>
            <SideBar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                maxPrice={maxPrice}
                brands={brands}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
            />
            <div className={`${classes.product_side}`}>
                <div className={`${classes.product_side_top}`}>
            <button onClick={clearFilters} className={`${classes.clear_btn}`}>Clear Filters</button>
            <div className={`${classes.heading}`}>Filter Products</div>
                </div>
            <div className={`${classes.product_list}`}>
                {filteredProducts.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} className={`${classes.product}`}>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Category: {product.category}</p>
                            <p>Brand: {product.brand}</p>
                        </div>
                    ))
                )}
            </div>
            </div>
        </div>
    );
};

export default ProductFilter;

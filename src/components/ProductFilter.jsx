import classes from '../styles/ProductFilter.module.css';
import { useState, useEffect } from 'react';
import Select from './Select';
import Input from './Input';
import Header from './Header';
import SortedFilter from './SortedFilter';

const ProductFilter = () => {
    const [products, setProducts] = useState([]); //store all products
    const [filteredProducts, setFilteredProducts] = useState([]); //store filtered products based on filters
    const [categories, setCategories] = useState([]); //store unique categories for the filter
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); //store selected category for filtering
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetch('./data.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                 //Extract brands & categories from the products data
                setBrands([...new Set(data.map(product => product.brand))]);
                setCategories([...new Set(data.map(product => product.category))]);
            })
            .catch((error) =>
                console.error(`Error fetching products data :`, error)
            );
    }, []);

    useEffect(() => {
        //filters and sorting whenever relevant state changes
        const filterProducts = () => {
            // Convert price inputs to numbers, default to 0 and Infinity if not provided
            const min = parseFloat(minPrice) || 0;
            const max = parseFloat(maxPrice) || Infinity;
            // Filter products
            let filtered = products.filter(product => {
                const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
                const matchesPrice = product.price >= min && product.price <= max;
                return matchesCategory && matchesPrice && matchesBrand;
            });
            if (sortOption === 'price-asc') {
                filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'price-desc') {
                filtered = filtered.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'name-asc') {
                filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name-desc') {
                filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
            }
            // Update state with filtered products
            setFilteredProducts(filtered);
        };
        filterProducts();
    }, [selectedCategory, minPrice, maxPrice, products, selectedBrands, sortOption]);
    //reset the filters to initial state and show all products
    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrands([]);
        setMinPrice('');
        setMaxPrice('');
        setSortOption('');
        setFilteredProducts(products);
    };
    return (
        <main>
            <Header clearFilters={clearFilters} />
            <div className={`${classes.parent}`}>
                <aside className={`${classes.parent_sidebar}`}>
                    <h2>Filters</h2>
                    <div className={`${classes.filters}`}>
                        <SortedFilter
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />
                        <Select selectedFilter={selectedCategory}
                            setSelectedFilter={setSelectedCategory}
                            filterProduct={categories}
                            filterType={`categories`}
                        />
                        <Select selectedFilter={selectedBrands}
                            setSelectedFilter={setSelectedBrands}
                            filterProduct={brands}
                            filterType={`brands`}
                        />
                        <Input price={minPrice}
                            setPrice={setMinPrice}
                            filterType={`Min price `}
                        />
                        <Input price={maxPrice}
                            setPrice={setMaxPrice}
                            filterType={`Max price `}
                        />
                    </div>
                </aside>
                <div className={`${classes.product_side}`}>
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
        </main>
    );
};

export default ProductFilter;

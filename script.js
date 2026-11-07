const products = [
  {
    id: 1,
    name: 'Trail Runner Pro',
    category: 'Footwear',
    description: 'Weather-ready trainers with responsive cushioning for daily miles.',
    SuggestedRetailPrice: 149.99,
    FinalPrice: 119.99,
    image: '👟',
    inStock: true,
  },
  {
    id: 2,
    name: 'Metro Carry Pack',
    category: 'Accessories',
    description: 'Minimal commuter backpack designed for smooth daily organization.',
    SuggestedRetailPrice: 129.0,
    FinalPrice: 129.0,
    image: '🎒',
    inStock: true,
  },
  {
    id: 3,
    name: 'Summit Bottle',
    category: 'Lifestyle',
    description: 'Vacuum insulated bottle that keeps drinks cold all day.',
    SuggestedRetailPrice: 44.5,
    FinalPrice: 31.95,
    image: '🧴',
    inStock: false,
  },
  {
    id: 4,
    name: 'Cloud Knit Set',
    category: 'Apparel',
    description: 'Soft everyday layers built for comfort and effortless styling.',
    SuggestedRetailPrice: 99.0,
    FinalPrice: 79.2,
    image: '🧥',
    inStock: true,
  },
];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const productGrid = document.querySelector('#productGrid');

const formatPrice = (value) => currencyFormatter.format(value);

const renderProducts = () => {
  productGrid.innerHTML = products
    .map((product) => {
      // FinalPrice < SuggestedRetailPrice indicates a product is discounted.
      const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
      const discountAmount = isDiscounted
        ? product.SuggestedRetailPrice - product.FinalPrice
        : 0;
      const discountPercent = isDiscounted
        ? Math.round((discountAmount / product.SuggestedRetailPrice) * 100)
        : 0;

      return `
        <article class="product-card" aria-label="${product.name}">
          <div class="product-image" role="img" aria-label="${product.name} image">
            ${isDiscounted ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
            <span>${product.image}</span>
          </div>

          <div class="product-body">
            <div class="product-meta">
              <p class="category">${product.category}</p>
              ${product.inStock ? '<span class="stock">In stock</span>' : '<span class="stock" style="background:#fff1eb;color:#b94a2c;">Sold out</span>'}
            </div>

            <h2 class="product-name">${product.name}</h2>
            <p class="product-desc">${product.description}</p>

            <div class="product-pricing">
              <span class="final-price">${formatPrice(product.FinalPrice)}</span>
              ${isDiscounted ? `<span class="retail-price">${formatPrice(product.SuggestedRetailPrice)}</span>` : ''}
            </div>

            <div class="product-footer">
              <span class="save-amount">${isDiscounted ? `Save ${formatPrice(discountAmount)}` : 'Regular price'}</span>
              <button class="cta-button" type="button">Add to cart</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
};

renderProducts();

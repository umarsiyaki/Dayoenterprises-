

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const variantContainer = document.getElementById('variant-container');
    const addVariantButton = document.getElementById('add-variant');

    let variantCount = 0;

    // Add a new variant
    addVariantButton.addEventListener('click', () => {
        variantCount++;
        const variantDiv = document.createElement('div');
        variantDiv.classList.add('variant');
        variantDiv.innerHTML = `
            <label>Variant ${variantCount}:</label>
            <input type="text" name="variant-name-${variantCount}" placeholder="Variant Name (e.g., Color)" required>
            <input type="text" name="variant-value-${variantCount}" placeholder="Variant Value (e.g., Red)" required>
            <input type="number" name="variant-price-${variantCount}" placeholder="Price" required>
            <input type="text" name="variant-sku-${variantCount}" placeholder="SKU">
            <input type="number" name="variant-stock-${variantCount}" placeholder="Stock Level">
            <button type="button" class="remove-variant" onclick="this.parentNode.remove()">Remove</button>
        `;
        variantContainer.appendChild(variantDiv);
    });

    // Handle form submission
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const productData = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            promoType: document.getElementById('promo-type').value,
            promoDiscount: parseFloat(document.getElementById('promo-discount').value) || 0,
            promoStart: document.getElementById('promo-start').value,
            promoEnd: document.getElementById('promo-end').value,
            labels: Array.from(document.getElementById('product-labels').selectedOptions).map(opt => opt.value),
            availabilityStart: document.getElementById('availability-start').value,
            availabilityEnd: document.getElementById('availability-end').value,
            stockThreshold: parseInt(document.getElementById('stock-threshold').value) || 0,
            variants: []
        };

        // Collect variant data
        document.querySelectorAll('.variant').forEach(variant => {
            const variantName = variant.querySelector('input[name^="variant-name"]').value;
            const variantValue = variant.querySelector('input[name^="variant-value"]').value;
            const variantPrice = parseFloat(variant.querySelector('input[name^="variant-price"]').value);
            const variantSKU = variant.querySelector('input[name^="variant-sku"]').value || '';
            const variantStock = parseInt(variant.querySelector('input[name^="variant-stock"]').value) || 0;
            productData.variants.push({ variantName, variantValue, variantPrice, variantSKU, variantStock });
        });

        // Calculate final price after discount if percentage
        if (productData.promoType === 'percentage') {
            productData.finalPrice = productData.price * (1 - productData.promoDiscount / 100);
        } else if (productData.promoType === 'fixed') {
            productData.finalPrice = productData.price - productData.promoDiscount;
        } else {
            productData.finalPrice = productData.price; // Default for BOGO
        }

        // Save to local storage or send to server
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(productData);
        localStorage.setItem('inventory', JSON.stringify(inventory));

        alert('Product added successfully!');
        addProductForm.reset();
        variantContainer.innerHTML = ''; // Clear variants
    });
});

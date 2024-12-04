document.addEventListener('DOMContentLoaded', () => {
    // Select required elements
    const addProductForm = document.getElementById('add-product-form');
    const discountContainer = document.getElementById('discount-container');
    const addDiscountButton = document.getElementById('add-discount');
    const variantContainer = document.getElementById('variant-container');
    const addVariantButton = document.getElementById('add-variant');
    const productGrid = document.getElementById('product-grid');
    const messageContainer = document.getElementById('message-container');
    const modal = document.getElementById('product-modal');
    const modalDetails = document.getElementById('modal-details');
    const modalClose = document.getElementById('modal-close');

    // Data arrays
    let discounts = [];
    let variants = [];
    let products = [];
    let variantCount = 0;

    // Predefined vendors
    const vendorCategories = {
        big: 'Big Products',
        bigi: 'Bigi Products',
        'coca-cola': 'Coca-Cola Products',
        climax: 'Climax Energy Drinks',
        maltina: 'Maltina Beverages',
        pepsi: 'Pepsi Products',
        slim: 'Slim Drinks',
        smoov: 'Smoov Drinks',
        lucozade: 'Lucozade Energy',
    };

    // Function to generate unique IDs
    function generateId(prefix) {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }

    // Display success or error messages
    function showMessage(type, text) {
        const alert = document.createElement('div');
        alert.classList.add('alert', type);
        alert.innerHTML = `${text} <span class="close-btn">&times;</span>`;
        alert.querySelector('.close-btn').addEventListener('click', () => alert.remove());
        messageContainer.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    // Add a discount dynamically
    function addDiscount() {
        const discountId = generateId('discount');
        const discountHTML = `
            <div class="discount" data-id="${discountId}">
                <label>Discount Type:</label>
                <select name="discount-type">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="bogo">BOGO</option>
                </select>
                <label>Discount Value:</label>
                <input type="number" name="discount-value" placeholder="Value" required>
                <label>Start Date:</label>
                <input type="date" name="discount-start-date" required>
                <label>End Date:</label>
                <input type="date" name="discount-end-date" required>
                <button type="button" class="remove-discount">Remove</button>
            </div>`;
        
        discountContainer.insertAdjacentHTML('beforeend', discountHTML);

        const newDiscount = { id: discountId, type: '', value: '', startDate: '', endDate: '' };
        discounts.push(newDiscount);

        const discountElement = discountContainer.querySelector(`[data-id="${discountId}"]`);
        discountElement.querySelector('.remove-discount').addEventListener('click', () => {
            removeItem(discounts, discountId);
            discountElement.remove();
        });

        discountElement.querySelector('[name="discount-type"]').addEventListener('change', (e) => {
            newDiscount.type = e.target.value;
        });
        discountElement.querySelector('[name="discount-value"]').addEventListener('input', (e) => {
            newDiscount.value = e.target.value;
        });
        discountElement.querySelector('[name="discount-start-date"]').addEventListener('input', (e) => {
            newDiscount.startDate = e.target.value;
        });
        discountElement.querySelector('[name="discount-end-date"]').addEventListener('input', (e) => {
            newDiscount.endDate = e.target.value;
        });
    }

    // Add a variant dynamically
    addVariantButton.addEventListener('click', () => {
        variantCount++;
        const variantId = generateId('variant');
        const variantHTML = `
            <div class="variant" data-id="${variantId}">
                <label>Variant ${variantCount}:</label>
                <input type="text" name="variant-name-${variantCount}" placeholder="Variant Name" required>
                <input type="text" name="variant-value-${variantCount}" placeholder="Variant Value" required>
                <input type="number" name="variant-price-${variantCount}" placeholder="Price" required>
                <input type="text" name="variant-sku-${variantCount}" placeholder="SKU">
                <input type="number" name="variant-stock-${variantCount}" placeholder="Stock Level">
                <button type="button" class="remove-variant" onclick="this.parentNode.remove()">Remove</button>
            </div>`;
        
        variantContainer.insertAdjacentHTML('beforeend', variantHTML);
        variants.push({
            id: variantId,
            name: '',
            value: '',
            price: '',
            sku: '',
            stock: '',
        });
    });

    // Create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="details-btn">Details</button>
        `;
        card.querySelector('.details-btn').addEventListener('click', () => showProductDetails(product));
        productGrid.appendChild(card);
    }

    // Show product details in a modal
    function showProductDetails(product) {
        modalDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" />
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Category: ${product.category}</p>
            <p>Description: ${product.description}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Vendor: ${product.vendor}</p>
            <p>Supplier: ${product.supplier}</p>
            <p>Discounts: ${discounts.map(d => `${d.type} - ${d.value}`).join(', ')}</p>
            <p>Variants: ${variants.map(v => `${v.name}: ${v.value}`).join(', ')}</p>
        `;
        modal.style.display = 'block';
    }

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Form submission
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = {
            name: addProductForm['product-name'].value,
            category: addProductForm['product-category'].value,
            price: parseFloat(addProductForm['product-price'].value),
            image: URL.createObjectURL(addProductForm['product-image'].files[0]),
            description: addProductForm['product-description'].value,
            quantity: parseInt(addProductForm['product-quantity'].value),
            vendor: addProductForm['product-vendor'].value.toLowerCase(),
            supplier: addProductForm['product-supplier'].value,
            discounts,
            variants,
        };

        if (!vendorCategories[product.vendor]) {
            showMessage('error', `Vendor "${product.vendor}" is not supported.`);
            return;
        }

        products.push(product);
        createProductCard(product);
        showMessage('success', `Product "${product.name}" added successfully!`);
        addProductForm.reset();
        discountContainer.innerHTML = '';
        variantContainer.innerHTML = '';
    });

    // Add discount button event
    addDiscountButton.addEventListener('click', addDiscount);
});

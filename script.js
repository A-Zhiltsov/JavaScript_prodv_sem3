function addReview() {
    const productName = document.getElementById('product-name').value;
    const reviewText = document.getElementById('review-text').value;

    if (productName && reviewText) {
        let reviews = JSON.parse(localStorage.getItem(productName)) || [];
        reviews.push(reviewText);
        localStorage.setItem(productName, JSON.stringify(reviews));

        document.getElementById('product-name').value = '';
        document.getElementById('review-text').value = '';
        alert('Отзыв добавлен!');
        loadProductList();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

function loadProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const productName = localStorage.key(i);
        const li = document.createElement('li');
        li.textContent = productName;
        li.onclick = () => loadReviews(productName);
        productList.appendChild(li);
    }
}

function loadReviews(productName) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = '<h3>Отзывы для: ' + productName + '</h3>';

    const reviews = JSON.parse(localStorage.getItem(productName)) || [];
    reviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.textContent = review;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteReview(productName, index);

        reviewItem.appendChild(deleteButton);
        reviewsContainer.appendChild(reviewItem);
    });
}

function deleteReview(productName, index) {
    let reviews = JSON.parse(localStorage.getItem(productName)) || [];
    reviews.splice(index, 1);
    localStorage.setItem(productName, JSON.stringify(reviews));
    loadReviews(productName);
}

window.onload = loadProductList;
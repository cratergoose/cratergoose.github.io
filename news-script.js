document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryFilter = document.getElementById('categoryFilter');
    const newsGrid = document.getElementById('newsGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    
    // State
    let visibleCards = 3; // Initial number of visible cards
    const increment = 3; // Number of cards to load each time
    let currentCategory = 'all';
    
    // Filter articles by category
    function filterArticles(category) {
        const articles = newsGrid.getElementsByClassName('news-card');
        
        Array.from(articles).forEach(article => {
            if (category === 'all' || article.dataset.category === category) {
                article.classList.remove('hidden');
            } else {
                article.classList.add('hidden');
            }
        });
        
        // Reset visible cards count when changing categories
        visibleCards = increment;
        updateVisibility();
        checkLoadMoreVisibility();
    }
    
    // Update visibility of articles based on current count
    function updateVisibility() {
        const articles = Array.from(newsGrid.getElementsByClassName('news-card'))
            .filter(article => !article.classList.contains('hidden'));
        
        articles.forEach((article, index) => {
            if (index < visibleCards) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    }
    
    // Check if Load More button should be visible
    function checkLoadMoreVisibility() {
        const visibleArticles = Array.from(newsGrid.getElementsByClassName('news-card'))
            .filter(article => !article.classList.contains('hidden'));
        
        loadMoreBtn.style.display = visibleArticles.length > visibleCards ? '' : 'none';
    }
    
    // Event Listeners
    categoryFilter.addEventListener('change', function(e) {
        currentCategory = e.target.value;
        filterArticles(currentCategory);
    });
    
    loadMoreBtn.addEventListener('click', function() {
        visibleCards += increment;
        updateVisibility();
        checkLoadMoreVisibility();
    });
    
    // Initialize
    updateVisibility();
    checkLoadMoreVisibility();
});

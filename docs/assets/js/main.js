// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.querySelector('.search-input').value;
            
            // Perform search
            performSearch(query);
        });
    }
    
    function performSearch(query) {
        // Get the search results element
        const searchResults = document.querySelector('.search-results');
        
        if (!searchResults) return;
        
        // Clear previous results
        searchResults.innerHTML = '<h2>Search Results</h2>';
        
        // Convert query to lowercase for case-insensitive matching
        const lowerQuery = query.toLowerCase();
        
        // In a real implementation, you would fetch search data from an API or JSON file
        // For this example, we'll use a dummy dataset
        const posts = [
            {
                title: "Getting Started with Docker: A Comprehensive Guide",
                url: "/2025/05/15/getting-started-with-docker.html",
                content: "Docker is a platform that enables developers to build, ship, and run applications in containers."
            },
            {
                title: "Kubernetes vs Docker Swarm: Choosing the Right Container Orchestration Platform",
                url: "/2025/05/10/kubernetes-vs-docker-swarm.html",
                content: "As containerized applications grow in complexity and scale, managing them manually becomes impractical."
            }
        ];
        
        // Filter posts based on the query
        const matchedPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(lowerQuery) || 
                   post.content.toLowerCase().includes(lowerQuery);
        });
        
        // Display results
        if (matchedPosts.length > 0) {
            const resultsList = document.createElement('ul');
            resultsList.className = 'post-list';
            
            matchedPosts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>
                        <a class="post-link" href="${post.url}">${post.title}</a>
                    </h3>
                    <p class="post-excerpt">${post.content}</p>
                `;
                resultsList.appendChild(listItem);
            });
            
            searchResults.appendChild(resultsList);
        } else {
            searchResults.innerHTML += '<p>No results found. Try a different search term.</p>';
        }
    }
});
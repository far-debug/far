document.addEventListener('DOMContentLoaded', function() {
  // Create the HTML for the search bar
  const searchBarHTML = `
    <div id="search-container" style="display: none;">
      <input type="text" id="search-input" placeholder="Search...">
      <button id="search-button">Search</button>
    </div>
  `;

  // Append the search bar HTML to the body
  document.body.innerHTML += searchBarHTML;

  // Add CSS styles for the search bar
  const searchStyles = `
    #search-container {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }

    #search-input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-right: 5px;
    }

    #search-button {
      padding: 5px 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .highlighted {
      background-color: yellow;
      font-weight: bold;
    }
  `;

  // Create a style element and append the search styles to it
  const styleElement = document.createElement('style');
  styleElement.textContent = searchStyles;
  document.head.appendChild(styleElement);

  // Add event listener for the search span
  const searchSpan = document.getElementById('search');
  searchSpan.addEventListener('click', function() {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
      searchContainer.style.display = 'block';
    } else {
      searchContainer.style.display = 'none';
    }
  });

  // Add event listener for the search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value;
    performSearch(searchTerm);
  });

  // Function to perform the search operation
  function performSearch(searchTerm) {
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (textNodes.nextNode()) {
      const node = textNodes.currentNode;
      const nodeText = node.nodeValue;
      if (nodeText && nodeText.toLowerCase().includes(searchTerm.toLowerCase())) {
        const parts = nodeText.split(new RegExp(`(${searchTerm})`, 'gi'));
        const highlightedText = document.createDocumentFragment();
        parts.forEach(part => {
          const span = document.createElement('span');
          if (part.toLowerCase() === searchTerm.toLowerCase()) {
            span.className = 'highlighted';
            span.setAttribute('data-original-text', part);
          }
          span.textContent = part;
          highlightedText.appendChild(span);
        });
        node.parentNode.replaceChild(highlightedText, node);
      }
    }
  }
});

const $form = document.querySelector('.search');
const $searchPrompt = document.querySelector('.search-prompt');
const $searchResults = document.querySelector('.search-results');

$form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  fetchJsonp(`https://itunes.apple.com/search?term=${$form.elements[0].value}&media=music&entity=album&attribute=artistTerm&limit=200`)
    .then(response => response.json())
    .then(data => {
      const resultCount = data.resultCount;
      const results = data.results;
      $searchPrompt.textContent = `${resultCount} results for "${$form.elements[0].value}"`;
      $form.reset();
      $searchResults.innerHTML = '';
      for (let i = 0; i < results.length; i++) {
        const card = createCard(results[i]);
        $searchResults.appendChild(card);
      }
    })
    .catch(err => console.log(err));
}

function createCard(data) {
  const card = document.createElement('div');
  card.className = 'column card';

  const image = document.createElement('img');
  image.className = 'card-image'
  image.setAttribute('src', data.artworkUrl100);
  card.appendChild(image);

  const title = document.createElement('div');
  title.className = 'row card-title justify-center';
  card.appendChild(title);

  const text = document.createElement('p');
  text.className = 'card-title-text';
  text.textContent = data.collectionName;
  title.appendChild(text);

  return card;
}

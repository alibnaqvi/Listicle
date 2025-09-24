async function loadCards() {
  const grid = document.getElementById('cards');
  try {
    const res = await fetch('/api/items');
    const items = await res.json();
    grid.innerHTML = items
      .map((item) => {
        return `
        <article class="card">
          <a href="/bosses/${item.id}" aria-label="View details for ${item.name}">
            <img src="${item.image}" alt="${item.name}" />
            <div class="card-body">
              <h3>${item.name}</h3>
              <p class="muted">${item.category} • ${item.difficulty}</p>
              <p>${item.description}</p>
              <p class="muted">${item.location}</p>
            </div>
          </a>
        </article>
        `;
      })
      .join('');
  } catch (err) {
    grid.innerHTML = '<p>Failed to load items.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadCards);



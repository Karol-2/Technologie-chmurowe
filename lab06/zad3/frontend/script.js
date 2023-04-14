const usersElement = document.getElementById("Drinks");

fetch("http://localhost:3000/api/users")
  .then(response => response.json())
  .then(data => {
    const drinks = data.map(drink => `
      <div>
        <h1>${drink.name}</h1>
        <h3>${drink.description}</h3>
      </div>
    `).join("");
    usersElement.innerHTML = drinks;
  })
  .catch(error => {
    console.error("Failed to fetch users:", error);
  });
const apiEndpoint = "https://randomuser.me/api/?results=20";
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
let usersData = [];

/**
 * Fetches data from an API endpoint and displays users.
 */
function fetchData() {
  $.ajax({
    url: apiEndpoint,
    dataType: "json",
    success: function (data) {
      usersData = data.results;
      displayUsers(usersData);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
      displayError();
    }
  });
}

/**
 * Display users on the page as a list of cards
 * @param {Array} users - The list of user objects to display
 * @returns {void}
 */
function displayUsers(users) {
  cardsContainer.innerHTML = "";
  users.forEach((user) => {
    const card = createCard(user);
    cardsContainer.appendChild(card);
  });
}

/**
 * Creates a user card element.
 * @param {Object} user - The user object.
 * @return {Element} - The user card element.
 */
function createCard(user) {
  const card = document.createElement("div");
  card.className = "col-md-6 col-lg-4 col-xl-3";

  const cardBody = document.createElement("div");
  cardBody.className = "card";

  const image = document.createElement("img");
  image.className = "user-image";
  image.src = user.picture.large;
  image.alt = "User Picture";

  const userInfo = document.createElement("div");
  userInfo.className = "user-info";

  const name = document.createElement("p");
  name.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${user.gender}`;

  const address = document.createElement("p");
  address.textContent = `Address: ${user.location.street.name}, ${user.location.city}, ${user.location.state}`;

  const dob = document.createElement("p");
  const dobDate = new Date(user.dob.date);
  dob.textContent = `DOB: ${dobDate.getMonth() + 1}-${dobDate.getDate()}-${dobDate.getFullYear()}`;

  userInfo.appendChild(name);
  userInfo.appendChild(gender);
  userInfo.appendChild(address);
  userInfo.appendChild(dob);

  cardBody.appendChild(image);
  cardBody.appendChild(userInfo);
  card.appendChild(cardBody);

  return card;
}

/**
 * Display an error message in the cards container
 */
function displayError() {
  cardsContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
}

/**
 * Filters the users based on the search text and displays them.
 */
function filterUsers() {
  const searchText = searchInput.value.toLowerCase();
  const filteredUsers = usersData.filter((user) => {
    const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
    const address = `${user.location.street.name}, ${user.location.city}, ${user.location.state}`.toLowerCase();
    return fullName.includes(searchText) || address.includes(searchText);
  });

  if (filteredUsers.length > 0) {
    displayUsers(filteredUsers);
  } else {
    displayNoDataFound();
  }
}

/**
 * Displays a message indicating that no data was found.
 *
 * @returns {void}
 */
function displayNoDataFound() {
  cardsContainer.innerHTML = "<p>No data found.</p>";
}

// Event listeners
searchButton.addEventListener("click", filterUsers);

// Fetch data on page load
fetchData();

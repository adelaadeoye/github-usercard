/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cardContainer = document.querySelector('.cards');
axios
    .get("https://api.github.com/users/adelaadeoye")
    .then(response => {
        const dataCollection = response.data;
        cardContainer.appendChild(createCard(dataCollection));
    })
    .catch(error => {
        console.log("The data was not returned", error);
    });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let eachFollower = [];
axios
    .get("https://api.github.com/users/adelaadeoye/followers")
    .then(response => {
        let otherData = response.data;
        otherData.forEach(element => {
            return eachFollower.push(element.login)
        });
    })
    .then(() => {
        followersDataRequest(eachFollower)
    })
    .catch(error => {
        console.log("The data was not returned", error);
    });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

//Create Elements
function createCard(githubInfo) {
    const
        cardDiv = document.createElement('div'),
        userImg = document.createElement('img'),
        cardInfoDiv = document.createElement('div'),
        Name = document.createElement('h3'),
        userName = document.createElement('p'),
        userLocation = document.createElement('p'),
        profileParagraph = document.createElement('p'),
        profileParagraphLink = document.createElement('a'),
        followersParagraph = document.createElement('p'),
        followingParagraph = document.createElement('p'),
        bioParagraph = document.createElement('p'),
        graphButton = document.createElement('button'),
        graphDiv = document.createElement('div');

    //Add ClassList
    cardDiv.classList.add('card');
    cardInfoDiv.classList.add('card-info');
    Name.classList.add('name');
    userName.classList.add('username');
    graphButton.classList.add('button');
    graphDiv.classList.add('calendar')

    // Textcontent
    userImg.src = githubInfo.avatar_url;
    Name.textContent = githubInfo.name;
    userName.textContent = githubInfo.login;
    userLocation.textContent = `Location: ${githubInfo.location}`;
    profileParagraphLink.textContent = `Profile: ${githubInfo.html_url}`;
    followersParagraph.textContent = `Followers: ${githubInfo.followers}`;
    followingParagraph.textContent = `Following: ${githubInfo.following}`
    bioParagraph.textContent = `Bio: ${githubInfo.bio}`;
    graphButton.textContent = "SEE GRAPH";
    graphDiv.textContent = "I am a div for the grahp";

    // graphDiv.style.display = "none";
    //Append child
    profileParagraph.appendChild(profileParagraphLink);
    cardInfoDiv.appendChild(Name);
    cardInfoDiv.appendChild(userName);
    cardInfoDiv.appendChild(userLocation);
    cardInfoDiv.appendChild(profileParagraph);
    cardInfoDiv.appendChild(followersParagraph);
    cardInfoDiv.appendChild(followingParagraph);
    cardInfoDiv.appendChild(bioParagraph);
    cardInfoDiv.appendChild(graphButton);
    cardInfoDiv.appendChild(graphDiv);
    cardDiv.appendChild(userImg);
    cardDiv.appendChild(cardInfoDiv);

    graphButton.addEventListener('click', (e) => {
        graphDiv.classList.toggle('toggling');
    })
    setTimeout(() => {
        new GitHubCalendar(`${".calendar"}, ${"adelaadeoye"}`);
        // GitHubCalendar(`${".calendar"}, ${githubInfo.login}`);
    }, 3000)
    return cardDiv;
}


//Followers create function

function followersDataRequest(loginID) {
    const urlHandler = "https://api.github.com/users/"
    loginID.forEach(item => {
        const newUrl = urlHandler + item;
        axios
            .get(newUrl)
            .then(response => {
                const otherData = response.data;
                cardContainer.appendChild(createCard(otherData));
            })
            .catch(error => {
                console.log("The data was not returned", error);
            });

    })
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
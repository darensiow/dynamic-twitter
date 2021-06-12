var user1 = {
  userName: "@elonmusk",
  displayName: "Elon Musk",
  joinedDate: "June 2009",
  followingCount: 103,
  followerCount: 47900000,
  avatarURL: "assets/elonmusk.jpg",
  coverPhotoURL: "assets/elonmusk-cover.jpeg",
  tweets: [
    {
      text: "I admit to judging books by their cover",
      timestamp: "2/10/2021 00:01:20",
    },
    {
      text: "Starship to the moon",
      timestamp: "2/09/2021 18:37:12",
    },
    {
      text: "Out on launch pad, engine swap underway",
      timestamp: "2/09/2021 12:11:51",
    },
  ],
};

var user2 = {
  userName: "@BillGates",
  displayName: "Bill Gates",
  joinedDate: "June 2009",
  followingCount: 274,
  followerCount: 53800000,
  avatarURL: "assets/billgates.jpg",
  coverPhotoURL: "assets/billgates-cover.jpeg",
  tweets: [
    {
      text: "Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/",
      timestamp: "2/10/2021 00:01:20",
    },
    {
      text: "Should I start tweeting memes? Let me know in a comment.",
      timestamp: "2/09/2021 18:37:12",
    },
    {
      text: "In 2020, I read a book every hour.",
      timestamp: "2/09/2021 12:11:51",
    },
  ],
};

var users = [user1, user2];
var urlParams = new URLSearchParams(window.location.search);
var userInt = 0;

// display Bill by default, Elon if user=user1
if (urlParams.toString() == "user=user1") {
  userInt = 0;
} else {
  userInt = 1;
}

// Function that converts large numbers to smaller numbers post-fixed with 'K' or 'M'
function rounding(num) {
  if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}

// Creating our element objects
var mainContainer = document.getElementById("container-main");
var headerContainer = document.getElementById("container-header");
var photoContainer = document.getElementById("container-photo");
var profileContainer = document.getElementById("container-profile");
var tweetsContainer = document.getElementById("container-tweets");

headerContainer.innerHTML = `
  <div class="left-arrow">
    <a href="#"><img src="assets/arrow-left.png" /></a>
  </div>
  <div class="name-tweetno">
    <div class="name">
      <h3>${users[userInt].displayName}</h3>
      <img src="assets/twitter-verified.jpg" alt="verified" />
    </div>
    
    <div class="tweetno">
      <span>
        ${rounding(users[userInt].tweets.length)} 
        ${users[userInt].tweets.length > 1 ? "tweets" : "tweet"}
      </span>
    </div>
  </div>
`;

photoContainer.innerHTML = `
  <img src=${users[userInt].coverPhotoURL} />
`;

profileContainer.innerHTML = `
  <div class="profile-wrapper">
    <div class="profile-pic">
      <img src=${users[userInt].avatarURL} />
    </div>
    <div id="tweeple">
      <button id="elon">Elon</button>
      <button id="bill">Bill</button>
    </div>
  </div>
  <div class="name">
      <h3>${users[userInt].displayName}</h3>
      <img src="assets/twitter-verified.jpg" />
  </div>
  <div class="username">
    ${users[userInt].userName}
  </div>
  <div class="joined-date">
    <i class="fa fa-calendar" aria-hidden="true"></i>
    Joined ${users[userInt].joinedDate}
  </div>
  <div class="connections">
    <div class="following">
      <span>${rounding(users[userInt].followingCount)}</span> Following
    </div>
    <div class="followers">
      <span>${rounding(users[userInt].followerCount)}</span> Followers
    </div>
  </div>
`;

// Click event listeners for Elon and Bill buttons
var switchElon = document.getElementById("elon");
switchElon.addEventListener("click", userElon);

var switchBill = document.getElementById("bill");
switchBill.addEventListener("click", userBill);

// function to change URL to user 1
function userElon() {
  var urlParams = new URLSearchParams();
  urlParams.set("user", "user1");
  window.location.href = "http://127.0.0.1:5500/?" + urlParams.toString();
}

// function to change URL to user 2
function userBill() {
  var urlParams = new URLSearchParams();
  urlParams.set("user", "user2");
  window.location.href = "http://127.0.0.1:5500/?" + urlParams.toString();
}

tweetsContainer.innerHTML = `
  <div id="tab-section">
    <div class="tweet-tab active">
      Tweets
    </div>
    <div class="tweet-tab">
      Tweets & Replies
    </div>
    <div class="tweet-tab">
      Media 
    </div>
    <div class="tweet-tab">
      Likes
    </div>
  </div>
`;

// event listener - select between tabs
var tabContainer = document.getElementById("tab-section");
var tabs = tabContainer.getElementsByClassName("tweet-tab");

for (var tab of tabs) {
  tab.addEventListener("click", function (e) {
    var active = document.getElementsByClassName("active");
    active[0].classList.remove("active");
    e.target.classList.add("active");
  });
}

// Extract tweets from user and display them
users[userInt].tweets.forEach(function (tweet) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Converts the month from a number to three-letter month name
  var month = months[parseInt(tweet.timestamp.split("/")[1], 10) - 1];

  var day = tweet.timestamp.split("/")[0];

  var tweetDiv = document.createElement("div");
  tweetDiv.classList.add("tweet-div");

  tweetDiv.innerHTML = `
    <div class="profile-pic">
      <img src=${users[userInt].avatarURL} />
    </div>
    <div class="tweet-data">
      <div class="name-username-date">
        <div class="name">
          <h3>${users[userInt].displayName}</h3>
          <img src="assets/twitter-verified.jpg" alt="verified" />
        </div>
        <div class="username">
          ${users[userInt].userName}
        </div>
        <div class="date">
          ${day} ${month}
        </div>
      </div>

      <div class="tweet-text">
        ${tweet.text}
      </div>

      <div class="user-action-icons">
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart-o" aria-hidden="true"></i>
        <i class="fa fa-upload" aria-hidden="true"></i>
      </div>
    </div>
  `;
  tweetsContainer.append(tweetDiv);
});

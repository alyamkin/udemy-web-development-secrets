/**
 * XMLHttpRequest
 * */

const httpRequest = function (url, method) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    console.log(`readyState: ${xhr.readyState}, status: ${xhr.status}`);

    if (xhr.readyState == 4 && xhr.status == 200) {
      const rawData = this.responseText;
      const data = JSON.parse(rawData);

      for (let entity of data) {
        console.log(entity);
      }
    }
  };

  xhr.open(method, url);
  xhr.send();
};

//httpRequest("https://jsonplaceholder.typicode.com/posts", "GET");

const getData = (url, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(null, xhr.response);
    } else {
      callback(xhr.status);
    }
  };

  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.send();
};

// getData("http://time.jsontest.com", (error, data) => {
//   if (error != null) {
//     console.log(`Ooops ${error}`);
//   } else {
//     const h1Element = document.getElementsByTagName("h1")[0];
//     h1Element.append(data.time);
//   }
// });

/**
 * Example getting data
 */
const createUserElement = function (user) {
  const { fname, lname, src } = user;
  const ul = document.querySelector("#user");

  const li = document.createElement("li");
  const p = document.createElement("p");
  const img = document.createElement("img");

  img.src = src;
  p.innerText = `${fname} ${lname}`;

  ul.appendChild(li);
  li.appendChild(img);
  li.appendChild(p);
};

const getRandomUserListener = function () {
  console.log("this is what our request looks like AFTER", this);

  let data = JSON.parse(this.responseText);

  const user = data.results[0];
  const fname = user.name.first;
  const lname = user.name.last;
  const src = user.picture.large;

  createUserElement({ fname, lname, src });
};

const randomUserErrorHandler = function () {
  console.log("Oops, something went wrong: " + this.status);
};

const getRandomUser = (url, method) => {
  const xhr = new XMLHttpRequest();

  console.log("this is what our request looks like initially", xhr);

  xhr.onload = getRandomUserListener;

  xhr.onerror = randomUserErrorHandler;

  xhr.open(method, url, true);

  xhr.send();
};

// getRandomUser("https://randomuser.me/api", "GET");

/**
 * Fetch API
 */

const fetchData = function (url) {
  fetch(url)
    .then((data) => data.json())
    .then((newData) => console.log(newData));
};

// fetchData("https://jsonplaceholder.typicode.com/todos");
const customPosts = {
  usrID: 1,
  title: "Hello World",
  body: "This is my story ...",
};

const customHeader = {
  "Content-Type": "application/json; charset=UTF-8",
};

const postData = function (url, customPost, customerHeader) {
  fetch(url, {
    method: "POST",
    headers: customerHeader,
    body: JSON.stringify(customPost),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
};

// postData(
//   "https://jsonplaceholder.typicode.com/posts",
//   customPosts,
//   customHeader
// );

/**
 * Rewrite get user data with fetch
 */

const responseHandler = (data) => {
  const user = data.results[0];
  const fname = user.name.first;
  const lname = user.name.last;
  const src = user.picture.large;

  createUserElement({ fname, lname, src });
};

const errorHandler = (error) => {
  console.log("Something wrong:" + error);
};

const getRandomUserFetch = (url, responseCallback, errorHandler) => {
  fetch(url)
    .then((response) => response.json())
    .then(responseCallback)
    .catch(errorHandler);
};

getRandomUserFetch("https://randomuser.me/api", responseHandler, errorHandler);

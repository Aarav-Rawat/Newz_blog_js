API_KEY = "7ba271f05d3248b695a045889d4a8a35";
const cardContainer = document.querySelector(".cardContainer");
const userInput = document.querySelector(".navbar input");

async function fetchNews(api_url) {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

const showData = async () => {
  try {
    const data = await sendData();
    if(data.error){
      return data.error;
    }
    cardContainer.innerHTML = "";
    data.articles.forEach((article) => {
      let card = document.createElement("div");
      card.classList.add("card");
      cardContainer.appendChild(card);

      let img = document.createElement("img");
      img.src = article.urlToImage || "";
      img.alt = "loading...";
      card.appendChild(img);

      let content = document.createElement("div");
      content.classList.add("content");
      card.appendChild(content);

      let title = document.createElement("div");
      title.innerText =
        article.title.length > 40
          ? article.title.substring(0, 40) + "..."
          : article.title;
      title.classList.add("title");
      content.appendChild(title);

      let p = document.createElement("p");
      p.innerText =
        article.description.length > 200
          ? article.description.substring(0, 200) + "..."
          : article.description;
      content.appendChild(p);

      card.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const sendData = async () => {
  try {
    const api_url = userInput.value
      ? `https://newsapi.org/v2/everything?q=${userInput.value}&apiKey=${API_KEY}`
      : `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
    return await fetchNews(api_url);
  } catch (err) {
    return err;
  }
};

userInput.addEventListener("input", showData);

showData();

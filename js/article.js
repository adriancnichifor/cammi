const urlParams = new URLSearchParams(window.location.search);
const articleKey = urlParams.get("id");

function getdata() {
  firebase
    .database()
    .ref(`blogs/${articleKey}`)
    .once("value")
    .then(function (snapshot) {
      const articleTitle = document.getElementById("post_title");
      const articleDate = document.getElementById("post_date");
      const articleContent = document.getElementById("post_content");

      const { post_title, post_content, post_date } = snapshot.val();
      // console.log(post_title);
      articleTitle.innerText = post_title;
      articleContent.innerText = post_content;
      articleDate.innerText = post_date;
    });
}

window.addEventListener("load", function () {
  getdata();
});

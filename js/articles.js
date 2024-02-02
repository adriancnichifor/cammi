const blogsDB = firebase.database().ref("blogs");

function upload() {
  const post_image = document.getElementById("post_image").files[0];
  const post_title = document.getElementById("post_title").value;
  const post_tag = document.getElementById("post_tag").value;
  const post_date = document.getElementById("post_date").value;
  const post_content = document.getElementById("post_content").value;
  const imageName = post_image.name;

  const imagePath = firebase.storage().ref("images/" + imageName);

  const uploadTask = imagePath.put(post_image);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + " done");
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        blogsDB
          .push({
            post_tag: post_tag,
            post_title: post_title,
            post_date: post_date,
            imagePath: downloadURL,
            post_content: post_content,
          })
          .then(function () {
            alert("Postarea a fost încărcată cu succes!");
            document.getElementById("post-form").reset();
            getdata();
          })
          .catch(function (error) {
            alert("Eroare la încărcare!");
            console.error("Eroarea:", error);
          });
      });
    }
  );
}

window.addEventListener("load", function () {
  getdata();
});

function delete_post(key) {
  firebase
    .database()
    .ref("blogs/" + key)
    .remove();
  getdata();
  location.reload();
}

function getdata() {
  blogsDB.once("value").then(function (snapshot) {
    const posts_div = document.getElementById("posts");
    posts_div.innerHTML = "";

    const data = snapshot.val();
    // console.log(data);

    for (let [key, value] of Object.entries(data)) {
      const articleLink = "<a href='article.html?id=" + key + "'>";
      const articleContent =
        "<div class='col-md-6 py-4'>" +
        "<article class='blog-post h-100'>" +
        "<img class='card-image-top' src='" +
        value.imagePath +
        "' />" +
        "<p class='tag'> " +
        value.post_tag +
        "</p>" +
        articleLink +
        "<div class='content'>" +
        "<small>" +
        value.post_date +
        "</small>" +
        "<h5>" +
        value.post_title +
        "</h5>" +
        "</div>" +
        "</article>" +
        "</a>" +
        "<div class='is-hidden'>" +
        "<button class='btn btn-danger my-6 btn-sm' id='" +
        key +
        "' onclick='delete_post(this.id)'>Delete</button>" +
        "</div>" +
        "</div>";
      posts_div.innerHTML += articleContent;
    }
  });
}

// Administrator loggin
function adminArticle() {
  const password = document.getElementById("password").value;
  localStorage.setItem("isAdmin", "admin");
  if (password === localStorage.getItem("isAdmin")) {
    let unHideElement = document.querySelectorAll(".is-hidden");
    let hideElement = document.getElementById("loggin");
    unHideElement.forEach(function (element) {
      element.classList.remove("is-hidden");
      hideElement.classList.add("is-hidden");
    });
  } else {
    alert("Parola este incorectă, te rog să încerci din nou!");
  }
}

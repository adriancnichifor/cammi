const blogsDB = firebase.database().ref("blogs");

function upload() {
  // get data
  const post_image = document.getElementById("post_image").files[0];
  const post_title = document.getElementById("post_title").value;
  const post_tag = document.getElementById("post_tag").value;
  const post_date = document.getElementById("post_date").value;
  const post_content = document.getElementById("post_content").value;
  const imageName = post_image.name;

  const imagePath = firebase.storage().ref("images/" + imageName);

  //incarca imaginea
  const uploadTask = imagePath.put(post_image);
  //to get the state of image uploading....
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
        //push in baza de date
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
    //get your posts div
    const posts_div = document.getElementById("posts");
    //remove all remaining data in that div
    posts_div.innerHTML = "";
    //get data from firebase
    const data = snapshot.val();
    console.log(data);
    //now pass this data to our posts div
    //we have to pass our data to for loop to get one by one
    //we are passing the key of that post to delete it from database
    for (let [key, value] of Object.entries(data)) {
      // Create an anchor tag with the href pointing to the article page (replace 'article.html' with your actual page URL)
      const articleLink = "<a href='article.html?id=" + key + "'>";

      // Append the article content inside the anchor tag
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
        // "<p>" +
        // value.post_content +
        // "</p>" +
        "</div>" +
        "</article>" +
        "</a>" +
        "<button class='btn btn-danger my-6 btn-sm' id='" +
        key +
        "' onclick='delete_post(this.id)'>Delete</button>" +
        "</div>";

      // Append the entire article to the posts_div
      posts_div.innerHTML += articleContent;
    }
  });
}

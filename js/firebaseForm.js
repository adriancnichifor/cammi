const firebaseConfig = {
  apiKey: "AIzaSyARhwk2qjyOR68ZFeReJQVxYUgnCL5eAsE",
  authDomain: "cammidb.firebaseapp.com",
  databaseURL: "https://cammidb-default-rtdb.firebaseio.com",
  projectId: "cammidb",
  storageBucket: "cammidb.appspot.com",
  messagingSenderId: "820698276874",
  appId: "1:820698276874:web:c2ac6cfc03fcd5aa94ebf3",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
const contactFormDB = firebase.database().ref("contactForm");
// let contactFormDBM = firebase.database().ref("contactFormModal");

document.getElementById("contactForm").addEventListener("submit", submitForm);
document
  .getElementById("contactFormModal")
  .addEventListener("submit", submitFormM);

//contact form
function submitForm(e) {
  e.preventDefault();

  const userFirstName = getElementVal("userFirstName");
  const userSecondName = getElementVal("userSecondName");
  const userPhone = getElementVal("userPhone");
  const userEmail = getElementVal("userEmail");
  const userMessage = getElementVal("userMessage");

  saveMessages(
    userFirstName,
    userSecondName,
    userPhone,
    userEmail,
    userMessage
  );

  //   enable alert
  //   document.querySelector(".alert").style.display = "block";

  //   remove the alert
  //   setTimeout(() => {
  //     document.querySelector(".alert").style.display = "none";
  //   }, 3000);

  // reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (
  userfirstName,
  userSecondName,
  userPhone,
  userEmail,
  userMessage
) => {
  let newContactForm = contactFormDB.push();

  newContactForm.set({
    firstName: userfirstName,
    secondName: userSecondName,
    userPhone: userPhone,
    userEmail: userEmail,
    userMessage: userMessage,
    // messageDataM: serverTimestamp(),
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

//contact form modal//
function submitFormM(e) {
  e.preventDefault();

  const userFirstNameM = getElementValM("userFirstNameM");
  const userSecondNameM = getElementValM("userSecondNameM");
  const userPhoneM = getElementValM("userPhoneM");
  const userEmailM = getElementValM("userEmailM");
  const userMessageM = getElementValM("userMessageM");

  saveMessagesM(
    userFirstNameM,
    userSecondNameM,
    userPhoneM,
    userEmailM,
    userMessageM
  );

  //   enable alert
  //   document.querySelector(".alert").style.display = "block";

  //   remove the alert
  //   setTimeout(() => {
  //     document.querySelector(".alert").style.display = "none";
  //   }, 3000);

  // reset the form
  document.getElementById("contactFormModal").reset();
}

const saveMessagesM = (
  userFirstNameM,
  userSecondNameM,
  userPhoneM,
  userEmailM,
  userMessageM
) => {
  let newContactFormM = contactFormDB.push();

  newContactFormM.set({
    userFirstName: userFirstNameM,
    secondName: userSecondNameM,
    userPhone: userPhoneM,
    userEmail: userEmailM,
    userMessage: userMessageM,
    // messageDataM: serverTimestamp(),
  });
};

const getElementValM = (id) => {
  return document.getElementById(id).value;
};

// ----------end contact form FB update -------//

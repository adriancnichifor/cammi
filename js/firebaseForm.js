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

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", submitForm);
}

const contactFormModal = document.getElementById("contactFormModal");
if (contactFormModal) {
  contactFormModal.addEventListener("submit", submitFormM);
}

//main contact form
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
  // reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (
  userFirstName,
  userSecondName,
  userPhone,
  userEmail,
  userMessage
) => {
  let newContactForm = contactFormDB.push();

  newContactForm.set({
    userFirstName: userFirstName,
    userSecondName: userSecondName,
    userPhone: userPhone,
    userEmail: userEmail,
    userMessage: userMessage,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Modal contact form //
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
    userSecondName: userSecondNameM,
    userPhone: userPhoneM,
    userEmail: userEmailM,
    userMessage: userMessageM,
  });
};

const getElementValM = (id) => {
  return document.getElementById(id).value;
};

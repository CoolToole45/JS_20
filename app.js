// Selecting elements
const mainModal = document.getElementById('userFormModal');
const openModalBtn = document.getElementById('modalBtn');
const closeModalBtn = document.getElementById('closeBtn');
const modalForm = document.querySelector('form');
const firstName = document.querySelector('firstName');
const lastName = document.querySelector('lastName');
const mobileNumber = document.querySelector('mobileNumber');
const personalNumber = document.querySelector('personalNumber');
const zipCode = document.querySelector('zipCode');
const email = document.querySelector('email');

function renderUsers(users){
  const userTableContainer = document.querySelector(".tableContainer");
  const userTableBody = userTableContainer.querySelector("tbody");
  const userItems = users.map(users => {
        return `<tr>
                  <td>${users.id}</td>
                  <td>${users.email}</td>
                  <td>${users.first_name}</td>
                  <td>${users.last_name}</td>
                  <td>${users.gender}</td>
                  <td>${users.mobile}</td>
                  <td>${users.pn}</td>
                  <td>${users.zip}</td>
                  <td>${users.status}</td>
                 <td><button class = "removeUser">Delete</button></td>
                 <td><button class = "editUser">Edit</button></td>
                </tr>
    `})
  console.log(userItems);
  userTableBody.innerHTML = userItems.join('');
  userActions();
}

// Get User Data From Server
async function getUsers(){
  try {
    const response = await fetch('http://api.kesho.me/v1/user-test/index');
    const users = await response.json();
    renderUsers(users);
  } catch (e){
    console.log('ERROR!', e);
  }
}
getUsers();


// Delete User Data Row


function userActions(){
  // ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
  // იქნება 2 ღილაკი რედაქტირება და წაშლა
  // id შეინახეთ data-user-id ატრიბუტად ღილაკებზე
  // წაშლა ღილაკზე უნდა გაიგზავნოს წაშლის მოთხოვნა და გადაეცეს id
  // ედიტის ღილაკზე უნდა გაიხსნას მოდალ სადაც ფორმი იქნება
  // ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)
  // ეს დატა უნდა შეივსოს ფორმში formManager აქვს ახალი შესაძლებლობა formManager.setFields(userObject)
  // ეს ფუნქცია გამოიძახე და გადაეცი user-ის დატა
}


async function createUser(userData){
  try {
    const response = await fetch('http://api.kesho.me/v1/user-test/create', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: {'Content-Type': 'application/json'}
    });
    await response.json();
    getUsers(); // შენახვის ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ უსერები
  }catch (e){
    console.log('ERROR!', e);
  }
}


// Add event listeners for modal open/close buttons
openModalBtn.addEventListener('click', openModal);

function openModal() {
  mainModal.style.display = "block";
}

closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
  if(mainModal.style.display == "block") {
    mainModal.style.display = "none";
  } else {
    mainModal.style.display = "block";
  }
}


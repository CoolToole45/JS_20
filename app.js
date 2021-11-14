////////////////////////////////////////////////////////////////////////////////
// async function loadIntoTable(url, table) {
//   const tableHead = table.querySelector('thead');
//   const tableBody = table.querySelector('tbody');
//   const responce = await fetch(url);
//   const { rows } = await responce.json;

//   for (const row of rows) {
//     const rowElement = document.createElement("tr");

//     for (const cellText of row) {
//       const cellElement = document.createElement("td");

//       cellElement.textContent = cellText;
//       rowElement.appendChild(cellElement);
//     }

//     tableBody.appendChild(rowElement);
//   }

//   // tableBody.innerHTML = "<tr></tr>";
// }

// loadIntoTable('http://api.kesho.me/v1/user-test/index', document.querySelector('.mainTable'))
////////////////////////////////////////////////////////////////////////////////


// fetch('http://api.kesho.me/v1/user-test/index', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'aplication/json'
//   },
//   body: JSON.stringify({
//     first_name: "giorgi"
//   })
// })
// .then(res => {
//     return res.json();
//   })
// .then(data => console.log(data))



////////////////////////////////////////////////////////////////////////////////
// AJAX

// function loadUserData() {
//   let userDataRequest = new XMLHttpRequest();
//   userDataRequest.open('GET', 'http://api.kesho.me/v1/user-test/index', true);

//   userDataRequest.onload = () => {
//     if(userDataRequest.status == 200) {
//       console.log(this.responseText);
//     }
//   }
//   userDataRequest.send();
// }

// loadUserData();
////////////////////////////////////////////////////////////////////////////////



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
                  <td>${users.mobile_number}</td>
                  <td>${users.personal_number}</td>
                  <td>${users.zip_code}</td>
                  <td>${users.actions}</td>
                 <td><button class = "removeUser">Delete</button></td>
                 <td><button class = "editUser">Edit</button></td>
                </tr>
    `})
  console.log(userItems);
  userTableBody.innerHTML = userItems.join('');
  userActions();
}


function userActions(){
  // ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
  // იქნება 2 ღილაკი რედაქტირება და წაშლა
  // id შეინახეთ data-user-id ატრიბუტად ღილაკებზე
  // წაშლა ღილაკზე უნდა გაიგზავნოს წაშლის მოთხოვნა და გადაეცეს id
  // ეიდტის ღილაკზე უნდა გაიხსნას მოდალ სადაც ფორმი იქნება
  // ეიდტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)
  // ეს დატა უნდა შეივსოს ფორმში formManager აქვს ახალი შესაძლებლობა formManager.setFields(userObject)
  // ეს ფუნქცია გამოიძახე და გადაეცი user-ის დატა
}


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




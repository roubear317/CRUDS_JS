var siteN = document.getElementById("site_Name");
var siteU = document.getElementById("site_Url");

var toasterin = document.getElementById("toaster");

var toasterBootStrap = new bootstrap.Toast(toasterin);
var showInhtml = document.getElementById("showBody");
var AddbtnInput = document.getElementById("addBtn");
var UpdatebtnInput = document.getElementById("UpdateBtn");
var SearchInput = document.getElementById("site_Search");
var updateindex = 0;
var arrOfSites;
if (localStorage.getItem("site") !== null) {
  arrOfSites = JSON.parse(localStorage.getItem("site"));
  DisplayPlist();
} else {
  arrOfSites = [];
}
function addWebSites() {
  var WebSite = {
    siteName: siteN.value,
    siteUrl: siteU.value,
  };
  if (siteN.value == "" || siteU.value == "") return;
  arrOfSites.push(WebSite);
  toasterBootStrap.show();
  DisplayPlist();

  localStorage.setItem("site", JSON.stringify(arrOfSites));
  resetInput();
}
function resetInput() {
  siteN.value = "";
  siteU.value = "";
}
function displayOneweb(Web, index) {
  showInhtml.innerHTML += `  
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${Web.siteName}</td>
      <td>${Web.siteUrl}</td>
      <td class="btn btn-danger   w-25 me-2" onclick="DeleteProduct(${index})">Delete</td>
      <td class="btn btn-info w-25 ms-3" onclick="setToForm(${index})">update</td>

    </tr>
 
`;
}
function DisplayPlist() {
  showInhtml.innerHTML = "";
  for (let index = 0; index < arrOfSites.length; index++) {
    displayOneweb(arrOfSites[index], index);
  }
}
function DeleteProduct(index) {
  arrOfSites.splice(index, 1);
  DisplayPlist();
  localStorage.setItem("site", JSON.stringify(arrOfSites));
}
function setToForm(i) {
  updateindex = i;
  siteN.value = arrOfSites[i].siteName;
  siteU.value = arrOfSites[i].siteUrl;
  AddbtnInput.classList.add("d-none");
  UpdatebtnInput.classList.remove("d-none");
}
function updateProduct() {
  arrOfSites[updateindex].siteName = siteN.value;
  arrOfSites[updateindex].siteUrl = siteU.value;
  DisplayPlist();
  localStorage.setItem("site", JSON.stringify(arrOfSites));
  AddbtnInput.classList.remove("d-none");
  UpdatebtnInput.classList.add("d-none");
  resetInput();
}
function ValidatorForInput(inputId, regextag, validmassage) {
  var regex = {
    name: /^[a-zA-Z ]+$/,
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  };
  var inputElement = document.getElementById(inputId);
  inputElement.classList.remove("is-valid", "is-invalid");
  var isValid = inputElement.value.match(regex[regextag]);
  if (isValid) {
    document.getElementById(validmassage).classList.replace('d-block','d-none');
   
    
    inputElement.classList.add("is-valid");
  } else {
    document.getElementById(validmassage).classList.replace('d-none','d-block');
    inputElement.classList.add("is-invalid");
  }
}
// function searchWeb() {
//   var term =SearchInput.value.tolowercase()
//   showInhtml.innerHTML="";
// for (let i = 0; i < arrOfSites.length; i++) {
//   const isincluded = arrOfSites[i].siteName.tolowercase().Startswith(term);
//   if (isincluded) {
  
//     showInhtml.innerHTML += `  
//       <tr>
//         <th scope="row">${1}</th>
//         <td>${Web.siteName}</td>
//         <td>${Web.siteUrl}</td>
//         <td class="btn btn-danger   w-25 me-2" onclick="DeleteProduct(${i})">Delete</td>
//         <td class="btn btn-info w-25 ms-3" onclick="setToForm(${i})">update</td>
  
//       </tr>
   
//   `}
// }
// }
function searchWeb() {
  var term = SearchInput.value.toLowerCase();
  showInhtml.innerHTML = "";
  for (let i = 0; i < arrOfSites.length; i++) {
    const isincluded = arrOfSites[i].siteName.toLowerCase().startsWith(term);
    if (isincluded) {
      showInhtml.innerHTML += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${arrOfSites[i].siteName}</td>
          <td>${arrOfSites[i].siteUrl}</td>
          <td class="btn btn-danger w-25 me-2" onclick="DeleteProduct(${i})">Delete</td>
          <td class="btn btn-info w-25 ms-3" onclick="setToForm(${i})">Update</td>
        </tr>
      `;
    }
  }
}

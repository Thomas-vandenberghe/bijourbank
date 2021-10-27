console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

// Variable de recupération de l'array stocké dans le LocalStorage
let tabOp = JSON.parse(localStorage.getItem("op"))

let valeurLs = localStorage.getItem("valeurAjout");


// Tableau "opérations" défini en fonction du Local storage (vide ou non)
let operations = []
if (valeurLs !== null){
  operations= JSON.parse(localStorage.getItem('op'))
}

// Solde défini en fonction du Local storage (vide ou non)
let solde = document.querySelector("#solde").innerHTML;
if (valeurLs !== null){
  solde = parseFloat(valeurLs);
  document.querySelector("#solde").innerHTML = solde+"€";
  console.log(solde);
}


                                  // DISPLAY DES ONGLET AU CLIC//
 
const debcache = document.getElementsByClassName("debit");
const crecache = document.getElementsByClassName("credit");
const tout = document.querySelector("#btntout");
const debit = document.querySelector("#btndebit")

debit.addEventListener("click", function(){
for(let i = 0; i < crecache.length; i++){
 crecache[i].style.display = "none"; }
for(let i = 0; i < debcache.length; i++){
 debcache[i].style.display ="block"
 }
 debit.setAttribute("class", "active")    // changement class active//
 tout.setAttribute("class", "inactive")
 credit.setAttribute("class", "inactive")
})

const credit = document.querySelector("#btncredit")

credit.addEventListener("click", function(){
  for(let i = 0; i < debcache.length; i++){
    debcache[i].style.display = "none"; }
   for(let i = 0; i < crecache.length; i++){
    crecache[i].style.display ="block"
   }
   credit.setAttribute("class", "active")    // changement class active//
   tout.setAttribute("class", "inactive")
   debit.setAttribute("class", "inactive")
  })

tout.addEventListener("click", ()=>{
  for(let i = 0; i < debcache.length; i++){
    debcache[i].style.display = "block"; }
   for(let i = 0; i < crecache.length; i++){
    crecache[i].style.display ="block"
   }
   tout.setAttribute("class", "active")    // changement class active//
   credit.setAttribute("class", "inactive")
   debit.setAttribute("class", "inactive")
  })

 //----------------------------NOUVELLES OPERATIONS-----------------------------------//

 // Grosse fonction dans laquelle découle la mise en place des opérations suite au SUBMIT
  const form = document.querySelector("#operationForm");
  form.addEventListener("submit",function(){

      //declaration des imputs//
const titre = document.querySelector("#titre").value; 
const operator = document.querySelector("#operator").value
const montant = document.querySelector("#montant").value
const desc = document.querySelector("#desc").value

//%//
let pourcentage1 = parseFloat(montant) / parseFloat(solde);
let pourcentage2 = parseFloat(pourcentage1) *100
pourcentage2 = pourcentage2.toFixed(2) //pour avoir 2 chiffres après la virgule

// Recuperation des données
const results = document.querySelector("#results") 
let img = document.querySelector("img").src

// png en fonction de l'opération
if (operator === "credit") {
  img = "./assets/images/sac-dargent.png";
} else {
  img = "./assets/images/depenses.png";

}
// Texte d'une nouvelle opération et integration des données//
results.innerHTML+=`
<div class="operation ${operator}">
          <div class="grid-x grid-padding-x align-middle">
            <div class="cell shrink">
              <div class="picto">
                <img id="image" src= ${img} />
              </div>
            </div>
            <div class="cell auto">
              <div>
                <h2>${titre}</h2>
                <small>${desc} </small>
              </div>
            </div>
            <div class="cell small-3 text-right">
              <div>
                <p class="count" type=int >${montant}€</p>
                <small>${pourcentage2}%</small>
              </div>
            </div>
          </div>
        </div>
        `

        // Crédit ou débit

if (operator == "credit") {
  solde = parseFloat(solde) + parseFloat(montant);
  document.querySelector("#solde").innerHTML = solde+ "€"
} else { 
  solde = parseFloat(solde) - parseFloat(montant);
  document.querySelector("#solde").innerHTML = solde+ "€"
}
  localStorage.setItem('valeurAjout', parseFloat(solde));

//Rappel de la fonction pour actualiser le message sous le solde
  msg();

// definition de l'objet "opération"
let operation = {
  type : operator,
  titre : titre,
  montant : montant,
  desc : desc,
  image : img,
  pourcentage : pourcentage2,
}
//isertion de l'objet dans l'array
operations.push(operation)
localStorage.setItem('op', JSON.stringify(operations))

// Rappel de la fonction de DatagGraph.js
updateGraph();

// Fais disparaitre le formulaire après le click submit et le reset
 let hideform = document.querySelector(".reveal-overlay");
      hideform.style.display = " none";
      form.reset();  // Reset les champs du formulaire

})     

// Re-génere les opérations déja stockée dans le localStorage (si il n'est pas vide)
if (localStorage.getItem("valeurAjout") !== null){
  for (let index = 0; index < tabOp.length; index++) {
let operator =  tabOp[index].type;
let img = tabOp[index].image;
let titre = tabOp[index].titre;
let desc = tabOp[index].desc;
let montant = tabOp[index].montant;
let pourcentage2 = tabOp[index].pourcentage

results.innerHTML+=`
<div class="operation ${operator}">
          <div class="grid-x grid-padding-x align-middle">
            <div class="cell shrink">
              <div class="picto">
                <img id="image" src= ${img} />
              </div>
            </div>
            <div class="cell auto">
              <div>
                <h2>${titre}</h2>
                <small>${desc} </small>
              </div>
            </div>
            <div class="cell small-3 text-right">
              <div>
                <p class="count" type=int >${montant}€</p>
                <small>${pourcentage2}%</small>
              </div>
            </div>
          </div>
        </div>
        `

  }}
// Définition du message en fonction de la valeur du solde
  let message = document.getElementById("message");
  function msg(){
  if (solde > 15001){
    message.innerHTML = "On est bien 💲💲💲"
    message.style.color = "green" 
  }
  else if 
    (solde <= 15000 && solde >= 10001  ){
      message.innerHTML = "Hey reste cool !"
      message.style.color = "#f1de2f"
    }
  else if 
    (solde <= 10000 && solde >= 5001){
      message.innerHTML = "tu t'es cru à Las Vegas ⚠️?!"
      message.style.color = "orange"
  
    }
  else if 
  (solde <= 5000 && solde >= 0  ){
      message.innerHTML = "t'as carrément craqué ! ⚠️⚠️⚠️ "
      message.style.color = "red"
    }
  }
  msg();
// -------- Creation SELECT
var tarifs = ["Plein tarif", "- 14 ans"];
$('#panierSelectTarifs').empty();
$.each(tarifs, function (i, p) {
  $('#panierSelectTarifs').append($('<option></option>').val(p).html(p));
});

var seances = ["du lundi au vendredi de 9h à 18h", "du lundi au vendredi en soirée", "le week-end"];
$('#panierSeances').empty();
$.each(seances, function (i, p) {
  $('#panierSeances').append($('<option></option>').val(p).html(p));
});

// -----------------
// Tableaux de prix
var priceList = [
  [10, 12, 12.50],
  [5, 6, 6]
]
// -----------------


// -------- BASKET
var numberOfLaneBasket = 1;
var calculAchatTotal = 0;
var priceToAdd;

// * get the json from local Storage and Transform it back to an Object
let mySave = JSON.parse(window.localStorage.getItem("reservations"));

// generate x selects for numberOfLaneBasket
if (window.localStorage.length !== 0) {
  // console.log("size :", mySave.length);
  numberOfLaneBasket = mySave.length;
}


for (let i = 1; i <= numberOfLaneBasket; i++) {
  generateEmptySelect(i);
}

// * BTN NOUVELLE RESA
$('#incrementBasket').click(function () {
  numberOfLaneBasket += 1;
  $("#countLine").text(numberOfLaneBasket);
  generateEmptySelect(numberOfLaneBasket);
});
// * BTN DELETE ALL RESA
$('#deleteBasket').click(function () {
  window.localStorage.clear();
  for (let i = 1; i <= numberOfLaneBasket; i++) {
    $("#trId" + i).remove();
  }
  numberOfLaneBasket = 1;
  $("#achatTotal").text(0)
  generateEmptySelect(numberOfLaneBasket);
});

// * BTN SAVE ALL RESA
$('#saveBasket').click(function () {
  saveBasket();
  console.log("saved");
});

/**
 * Generate Empty Select -> window.localStorage.length == 0
 */
function generateEmptySelect(numberOfLaneBasket) {
  var trContainer = document.createElement("tr");

  // * add an id to the <tr>
  $(trContainer).attr('id', 'trId' + numberOfLaneBasket);

  $("#panierSelectTarifsGenerated").append(trContainer);

  // * Generated Tarifs
  $(trContainer).append($(
    '<td><select id="tarifNumber' + numberOfLaneBasket + '" class="changeableSelect form-control form-control-sm">',
    '<option>choix tarifs</option>',
    '</select></td>'
  ));
  // * Generated Seances
  $(trContainer).append($(
    '<td><select id="seanceNumber' + numberOfLaneBasket + '" class="changeableSelect form-control form-control-sm">',
    '<option>choix séances</option>',
    '</select></td>'
  ));

  // * Generated Quantity selector
  $(trContainer).append($(
    '<td><input id="quantityInBasket' + numberOfLaneBasket + '" class="panierQuantity changeableSelect form-control form-control-sm" type="number" value="0" min="0" max="20" step="1" /></td>'
  ));

  // * Generated Span Prix unitaire
  $(trContainer).append($(
    '<td id="calculTarif' + numberOfLaneBasket + '">',
    '</td>'
  ));
  // * Generated Span Prix achat
  $(trContainer).append($(
    '<td id="calculTarifTotal' + numberOfLaneBasket + '">',
    '</td>'
  ));

  // * remplissage des SPAN Prix unitaire
  $("#calculTarif" + numberOfLaneBasket).text("");
  // * remplissage des SPAN Prix achat
  $("#calculTarifTotal" + numberOfLaneBasket).text("");

  // $('#panierSelectTarifsGenerated').append("<br/>")

  // * remplissage des SELECTS
  $.each(tarifs, function (i, p) {
    $('#tarifNumber' + numberOfLaneBasket).append($('<option></option>').val(p).html(p));
  });
  $.each(seances, function (i, p) {
    $('#seanceNumber' + numberOfLaneBasket).append($('<option></option>').val(p).html(p));
  });

  // recupere les index requis pour trouver le prix associés dans le tableau
  var indexFirstGen = $("#tarifNumber" + numberOfLaneBasket).prop('selectedIndex');
  var indexSecondGen = $("#seanceNumber" + numberOfLaneBasket).prop('selectedIndex');
  // * Write Prix Unitaire of current lane at creation
  $("#calculTarif" + numberOfLaneBasket).text(priceList[indexFirstGen][indexSecondGen] + " €");
  // * Prix total of current lane at creation
  $("#calculTarifTotal" + numberOfLaneBasket).text((priceList[indexFirstGen][indexSecondGen] * $("#quantityInBasket" + numberOfLaneBasket).val()) + " €");
}

// * surveille seulement 1 id onChange
// $("#panierSelectTarifs").change(function() {

// * surveille tous les 'changeableSelect' onChange
$(document).on('change', '.changeableSelect', function () {

  // * Calcul generated lane


  // * my ID (recuperation id)
  // * regarde qui a lancé le "onChange"
  var myElemId = $(this).attr('id');
  // console.log("myElemId >-> " + myElemId);
  // * value de celui qui vient de lancer le "onChange"
  var valueSelected = $("#" + myElemId).val();
  // console.log("valueSelected-- " + valueSelected);

  // * Recupere le int de l'id ...
  var lastCharIsId = myElemId.substr(myElemId.length - 1);
  // console.log("lastCharIsId -> " + lastCharIsId);

  // recupere les index requis pour trouver le prix associés dans le tableau
  var indexFirstGen = $("#tarifNumber" + lastCharIsId).prop('selectedIndex');
  var indexSecondGen = $("#seanceNumber" + lastCharIsId).prop('selectedIndex');


  // * Recupere id du Quantity
  // var myQuantityId = $("#quantityInBasket" + numberOfLaneBasket).attr('id');
  // console.log("quantity ID : " + myQuantityId);

  // * Prix Unitaire
  $("#calculTarif" + lastCharIsId).text(priceList[indexFirstGen][indexSecondGen] + " €");
  // $("#calculTarifTotal" + lastCharIsId).text("Prix total : " + (priceList[indexFirstGen][indexSecondGen] * (quantityGen ? quantityGen : 1)));

  // console.log('iii ' + $("#quantityInBasket" + lastCharIsId).attr('id'));

  // * Prix total
  $("#calculTarifTotal" + lastCharIsId).text((priceList[indexFirstGen][indexSecondGen] * $("#quantityInBasket" + lastCharIsId).val()) + " €");


  calculAchatTotal = 0;
  for (let i = 1; i <= numberOfLaneBasket; i++) {
    priceToAdd = parseInt($("#calculTarifTotal" + i).text()); // parseInt -> s'arrette au premier non int, contrairement a Number() qui renverrait NaN

    // if priceToAdd NaN -> become 0
    priceToAddChecked = priceToAdd || 0;

    calculAchatTotal += priceToAddChecked;
    // console.log("calculAchatTotal " + calculAchatTotal);
    // console.log("priceToAdd++ " +typeof calculAchatTotal);
  }
  $("#achatTotal").text(calculAchatTotal)
});

// SAVE

function saveBasket() {

  let rows = document.querySelectorAll("#tableResa tr");
  let data = [];

  for (i = 1; i <= rows.length - 1; i++) {
    let tarif = document.querySelector("#tarifNumber" + i).value;
    let seance = document.querySelector("#seanceNumber" + i).value;
    let quantite = document.querySelector("#quantityInBasket" + i).value;
    let prixUnitaire = document.querySelector("#calculTarif" + i).textContent;
    let prixTotal = document.querySelector("#calculTarifTotal" + i).textContent;
    let info = {
      "tarif": tarif,
      "seance": seance,
      "quantite": quantite,
      "prixUnitaire": prixUnitaire,
      "prixTotal": prixTotal
    };
    data.push((info));
  }
  localStorage.setItem("reservations", JSON.stringify(data));
}


// ! getCart() autolunch function()
$(function() {
  if (window.localStorage.length == 0) {
    console.log("Pas de sauvegarde");
  } else {

    for (let i = 0; i < mySave.length; i++) {
      // my id start at 1 and not 0
      id = i+1;
      // change select value and trigger onchange
      $("#tarifNumber" + id).val(mySave[i]['tarif']).change();
      $("#seanceNumber" + id).val(mySave[i]['seance']).change();
      $("#quantityInBasket" + id).val(mySave[i]['quantite']).change();
    }
}});

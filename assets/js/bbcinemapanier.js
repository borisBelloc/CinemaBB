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

// -------- BASKET
var numberOfLaneBasket = 0;
var calculAchatTotal = 0;
var priceToAdd;
generateSelect();

// * BTN NOUVELLE RESA
$('#incrementBasket').click(function () {
  numberOfLaneBasket += 1;
  $("#countLine").text(numberOfLaneBasket);
  generateSelect();
});
// * BTN DELETE ALL RESA
$('#deleteBasket').click(function () {
  for (let i = 0; i <= numberOfLaneBasket; i++) {
    $("#trId" + i).remove();
  }
  numberOfLaneBasket = 0;
  $("#achatTotal").text(0)
  generateSelect();
});


// * BTN SAVE ALL RESA
$('#saveBasket').click(function () {
  saveBasket();
  console.log("saved");
  
});

function generateSelect() {
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
    '<td><input id="quantityPlacePanier' + numberOfLaneBasket + '" class="panierQuantity changeableSelect form-control form-control-sm" type="number" value="0" min="0" max="20" step="1" /></td>'
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

}

// * surveille seulement 1 id
// $("#panierSelectTarifs").change(function() {

// * surveille tous les 'changeableSelect'
$(document).on('change', '.changeableSelect', function () {

  // * Calcul generated lane
  var indexFirstGen = $("#tarifNumber" + numberOfLaneBasket).prop('selectedIndex');
  // console.log("indexFirstGen -- " + indexFirstGen);
  var indexSecondGen = $("#seanceNumber" + numberOfLaneBasket).prop('selectedIndex');
  // console.log("indexSecondGen -- " + indexSecondGen);

  // Tableaux de prix
  var priceList = [
    [10, 12, 12.50],
    [5, 6, 6]
  ]


  // * my ID (recuperation id)
  // TODO: Fusionner ces 4 lignes en 2 ?
  // * regarde qui a lancé le "onChange"
  var myElemId = $(this).attr('id');
  // console.log("myElemId >-> " + myElemId);
  // * value de celui qui vient de lancer le "onChange"
  var valueSelected = $("#" + myElemId).val();
  // console.log("valueSelected-- " + valueSelected);

  // * Recupere le int de l'id ...
  var lastCharIsId = myElemId.substr(myElemId.length - 1);
  // console.log("lastCharIsId -> " + lastCharIsId);

  // * Recupere id du Quantity
  var myQuantityId = $("#quantityPlacePanier" + numberOfLaneBasket).attr('id');
  // console.log("quantity ID : " + myQuantityId);

  // * Calcul for generated
  $("#calculTarif" + lastCharIsId).text(priceList[indexFirstGen][indexSecondGen] + " €");
  // $("#calculTarifTotal" + lastCharIsId).text("Prix total : " + (priceList[indexFirstGen][indexSecondGen] * (quantityGen ? quantityGen : 1)));

  // console.log('iii ' + $("#quantityPlacePanier" + lastCharIsId).attr('id'));

  // est-on sur un Quantity ?
  // TODO: if else inutile ? la ligne du else marche partout ?
  if (myElemId == $("#quantityPlacePanier" + lastCharIsId).attr('id')) {
    // console.log("Oui, on a touché la quantity");
    $("#calculTarifTotal" + lastCharIsId).text((priceList[indexFirstGen][indexSecondGen] * valueSelected) + " €");
  } else {
    // console.log("Non, on a pas touché la quantity");
    $("#calculTarifTotal" + lastCharIsId).text((priceList[indexFirstGen][indexSecondGen] * $("#quantityPlacePanier" + numberOfLaneBasket).val()) + " €");
  }
  calculAchatTotal = 0;
  for (let i = 0; i <= numberOfLaneBasket; i++) {
    // calculAchatTotal = 0;
    priceToAdd = parseInt($("#calculTarifTotal" + i).text()); // parseInt -> s'arrette au premier non int, contrairement a Number() qui renverrait NaN
    // console.log("+priceToAdd " + typeof calculAchatTotal);
    // console.log("priceToAdd " + priceToAdd);

    calculAchatTotal += priceToAdd;
    // console.log("calculAchatTotal " + calculAchatTotal);
    // console.log("priceToAdd++ " +typeof calculAchatTotal);
  }
  $("#achatTotal").text(calculAchatTotal)
});

// SAVE

function saveBasket() {

  let rows = document.querySelectorAll("#tableResa tr");
  let data = [];

  for (i = 0; i < rows.length - 1; i++) {
    let tarif = document.querySelector("#tarifNumber" + i).value;
    let seance = document.querySelector("#seanceNumber" + i).value;
    let quantite = document.querySelector("#quantityPlacePanier" + i).value;
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

function getCart() {
  // Print the json
  let info = localStorage.getItem("reservations");
  console.log(info);
  // console.log("i" + info.length);


  // TODO: séparer les objets contenus dans DATA afin de les afficher 1 par row
  // ci dessous pas fini; pas reussis a séparer les objects lorsqu'on a plusieurs reservations

  // * Transform localStorage back to an Object
  // TODO: crash because there is 2 objects...
  let mySave = JSON.parse(window.localStorage.getItem('reservations'));

  // * enumerate the properties of a JavaScript object
  // var propertyName;
  // for (propertyName in mySave) {
  //   console.log("propertyName " + propertyName);
  //   console.log(mySave[propertyName]);
  // }

  // var output = '';
  // for (var key in info) {
  //   if (info.hasOwnProperty(key)) {
  //     output = output + (key +  + info[key]) + ':<br>';
  //   }
  // }

  // console.log("restult -> " + output);

  // $('#divtoshowarray').html(output);

}
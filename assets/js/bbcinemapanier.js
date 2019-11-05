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
generateSelect();

// * BTN NOUVELLE RESA
$('#incrementBasket').click(function () {
  numberOfLaneBasket += 1;
  $("#countLine").text(numberOfLaneBasket);
  generateSelect();
});
// * BTN DELETE ALL RESA
$('#deleteBasket').click(function () {
  for (i=0; i<= numberOfLaneBasket; i++ ) {
    $("#trId"+i).remove();
  }
  numberOfLaneBasket = 0;
  generateSelect();
});



function generateSelect() {
  var trContainer = document.createElement("tr");
  // * ADD ID TO THE <tr>
  $(trContainer).attr('id', 'trId'+numberOfLaneBasket);




  $("#panierSelectTarifsGenerated").append(trContainer);

  // * Generated Tarifs
  // $("#panierSelectTarifsGenerated").append($('<p class="mb-0">').text("NEW LINE"));
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
  // $("#calculTarif" + numberOfLaneBasket).text(" Prix unitaire");
  $("#calculTarif" + numberOfLaneBasket).text("");
  // * remplissage des SPAN Prix achat
  // $("#calculTarifTotal" + numberOfLaneBasket).text(" Prix achat");
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


// Valeur à l'ouverture de page :
// console.log($("#panierSelectTarifs").prop('selectedIndex'));
// console.log($('#panierSelectTarifs').val());

// * surveille seulement 1 id
// $("#panierSelectTarifs").change(function() {

// * surveille tous les 'changeableSelect'
$(document).on('change', '.changeableSelect', function () {

  // * calcul static
  // var indexFirst = $("#panierSelectTarifs").prop('selectedIndex');
  // console.log("indexFirst > " + indexFirst);
  // var indexSecond = $("#panierSeances").prop('selectedIndex');
  // console.log("indexSecond > " + indexSecond);
  // var quantity = $("#quantityPlacePanier").val();

  // * Calcul generated lane
  var indexFirstGen = $("#tarifNumber" + numberOfLaneBasket).prop('selectedIndex');
  console.log("indexFirstGen -- " + indexFirstGen);
  var indexSecondGen = $("#seanceNumber" + numberOfLaneBasket).prop('selectedIndex');
  console.log("indexSecondGen -- " + indexSecondGen);

  var priceList = [
    [10, 12, 12.50],
    [5, 6, 6]
  ]
  // Calcul static
  // $("#calculTarif").text("Prix unitaire : " + priceList[indexFirst][indexSecond]);
  // $("#calculTarifTotal").text("Prix total : " + (priceList[indexFirst][indexSecond] * quantity));


  // * my ID (recuperation id)
  // TODO: Fusionner ces 4 lignes en 2 ?
  var myElemId = $(this).attr('id');
  console.log("myElemId >-> " + myElemId);
  var valueSelected = $("#" + myElemId).val();
  console.log("valueSelected-- " + valueSelected);

  // * Recupere l'int de l'id ...
  var lastCharIsId = myElemId.substr(myElemId.length - 1);
  console.log("lastCharIsId -> " + lastCharIsId);

  console.log("******* " + valueSelected);
  
  // * Recupere id du Quantity
  var myQuantityId = $("#quantityPlacePanier"+numberOfLaneBasket).attr('id');
  console.log("quantity ID : " + myQuantityId);
  // console.log("value Quantity clicked : " + $("#"+myQuantityId).val());
  

  // * Calcul for generated
  $("#calculTarif" + lastCharIsId).text(priceList[indexFirstGen][indexSecondGen] + " €");
  // $("#calculTarifTotal" + lastCharIsId).text("Prix total : " + (priceList[indexFirstGen][indexSecondGen] * (quantityGen ? quantityGen : 1)));

  console.log('iii ' + $("#quantityPlacePanier"+lastCharIsId).attr('id'));

  // est-on sur un Quantity ?
  // TODO: if else inutile ? le else marche partout ?
  if (myElemId == $("#quantityPlacePanier"+lastCharIsId).attr('id')) {
    console.log("oui");
    $("#calculTarifTotal" + lastCharIsId).text((priceList[indexFirstGen][indexSecondGen] * valueSelected) + " €");
  } else {
    console.log("non");
    $("#calculTarifTotal" + lastCharIsId).text((priceList[indexFirstGen][indexSecondGen] * $("#quantityPlacePanier"+numberOfLaneBasket).val()) + " €");
  }
});

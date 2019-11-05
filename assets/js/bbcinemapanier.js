// var options = ["1", "2", "3", "4", "5"];
// $('#select').empty();
// $.each(options, function(i, p) {
//     $('#select').append($('<option></option>').val(p).html(p));
// });



// -------- Creation SELECT
// !
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

$('#incrementBasket').click(function () {
  numberOfLaneBasket += 1;
  $("#countLine").text(numberOfLaneBasket);


  var pContainer = document.createElement("p");
  $("#panierSelectTarifsGenerated").append(pContainer);
  // $("p").append("Some appended text.");
  

  // * Generated Tarifs
  // $("#panierSelectTarifsGenerated").append($('<p class="mb-0">').text("NEW LINE"));
  $(pContainer).append($(
    '<select id="tarifNumber' + numberOfLaneBasket + '" class="changeableSelect">',
    '<option>choix tarifs</option>',
    '</select>'
  ));
  // * Generated Seances
  $(pContainer).append($(
    '<select id="seanceNumber' + numberOfLaneBasket + '" class="changeableSelect">',
    '<option>choix séances</option>',
    '</select>'
  ));

  // * Generated Quantity selector
  $(pContainer).append($(
    '<input id="quantityPlacePanier"'+ numberOfLaneBasket +' class="panierQuantity changeableSelect" type="number" value="0" min="0" max="20" step="1" />'
  ));


  // $('#panierSelectTarifsGenerated').append("<br/>")


  // * remplissage des SELECTS
  $.each(tarifs, function (i, p) {
    $('#tarifNumber' + numberOfLaneBasket).append($('<option></option>').val(p).html(p));
  });
  $.each(seances, function (i, p) {
    $('#seanceNumber' + numberOfLaneBasket).append($('<option></option>').val(p).html(p));
  });

});

/*

  <select id="panierSeances" class="changeableSelect">
    <option>choix séances</option>
  </select>

*/

// Valeur à l'ouverture de page :
// console.log($("#panierSelectTarifs").prop('selectedIndex'));

// console.log($('#panierSelectTarifs').val());

// * surveille seulement 1 id
// $("#panierSelectTarifs").change(function() {

// * surveille tous les 'changeableSelect'
$(document).on('change', '.changeableSelect', function () {

  // * Recup la value selected: String
  // console.log($("#panierSelectTarifs").val());
  // console.log($("#panierSelectTarifs").index());

  var tarifName = $("#panierSelectTarifs").val();
  console.log("tarifName val() " + tarifName);

  // var listItem = $("#panierSelectTarifs");
  // console.log( "Index: " + $( "option" ).index( listItem ) );
  var indexFirst = $("#panierSelectTarifs").prop('selectedIndex');
  console.log("indexFirst > " + indexFirst);
  var indexSecond = $("#panierSeances").prop('selectedIndex');
  console.log("indexSecond > " + indexSecond);

  varQuantity = $("#quantityPlacePanier").val();
  console.log(varQuantity);

  // var index = $( "#panierSelectTarifs" ).index( this );
  // $( "#calculTarif" ).text( "That was div index #" + index );

  var priceList = [
    [10, 12, 12.50],
    [5, 6, 6]
  ]
  $("#calculTarif").text("Prix unitaire : " + priceList[indexFirst][indexSecond]);
  $("#calculTarifTotal").text("Prix total : " + (priceList[indexFirst][indexSecond] * varQuantity));

});
// var options = ["1", "2", "3", "4", "5"];
// $('#select').empty();
// $.each(options, function(i, p) {
//     $('#select').append($('<option></option>').val(p).html(p));
// });

var tarifs = ["Plein tarif", "- 14 ans"];
$('#panierSelectTarifs').empty();
$.each(tarifs, function(i, p) {
    $('#panierSelectTarifs').append($('<option></option>').val(p).html(p));
});

// var ttt = {"Plein tarif": 100, id2: 200, "tag with spaces": 300};
// $('#panierSelectTarifs').val()


// Valeur à l'ouverture de page :
// console.log($("#panierSelectTarifs").prop('selectedIndex'));

// console.log($('#panierSelectTarifs').val());

// * surveille seulement 1 id
// $("#panierSelectTarifs").change(function() {

// * surveille tous les 'changeresponsibleuser'
$(document).on('change', '.changeableSelect',function(){

  // * Recup la value selected: String
  // console.log($("#panierSelectTarifs").val());
  // console.log($("#panierSelectTarifs").index());
  
  var tarifName = $("#panierSelectTarifs").val();
  console.log("tarifName val() " + tarifName);

  // var listItem = $("#panierSelectTarifs");
  // console.log( "Index: " + $( "option" ).index( listItem ) );

  // Select index of value
  // console.log($("#panierSelectTarifs").prop('selectedIndex'));
  // TODO: utiliser variable a la place de l'id ou faire un switch case si pas possible
  var indexFirst = $("#panierSelectTarifs").prop('selectedIndex');
  console.log("indexFirst > " + indexFirst);
  var indexSecond = $("#panierSeances").prop('selectedIndex');
  console.log("indexSecond > " + indexSecond);

  varQuantity = $("#quantityPlacePanier").val();
  console.log(varQuantity);
  
  // var index = $( "#panierSelectTarifs" ).index( this );
  // $( "#calculTarif" ).text( "That was div index #" + index );
  
  var priceList = [[10, 12, 12.50],[5, 6, 6]]
  $( "#calculTarif" ).text( "Prix unitaire : " + priceList[indexFirst][indexSecond] );
  $( "#calculTarifTotal" ).text( "Prix total : " + (priceList[indexFirst][indexSecond]*varQuantity) );
  
});

// Tableau de tableau prix
// [type tarif][horaire]
// console.log("AAA " + priceList[1][1]);



var seances = ["du lundi au vendredi de 9h à 18h", "du lundi au vendredi en soirée", "le week-end"];
$('#panierSeances').empty();
$.each(seances, function(i, p) {
    $('#panierSeances').append($('<option></option>').val(p).html(p));
});


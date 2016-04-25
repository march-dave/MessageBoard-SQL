'use strict';

$(document).ready(init);

function init() {
  // $('table').on('click', openModel);
  // $('form.submitform').submit(submitCar);
  $('form.submitform').submit(submitNewCar);
  $('.carList').on('click', '.isDelete', deleteCar);
}

function deleteCar(e) {

  var id = $(this).parent().parent().children()[0].textContent;
  var url = `api/cars/${id}`;
  $.ajax({
    url: url,
    type: 'DELETE'
  })
  .done(function(data) {
    $(`td:contains(${id})`).parent().remove();

    console.log('data', data);

  })
  .fail(function (err) {
    console.log(err);
  });
}

function submitNewCar(e) {
  e.preventDefault();

  var make = $('#make').val();
  var model = $('#model').val();
  var year = $('#year').val();

  var car = {
    make: make,
    model: model,
    year: year
  }

  var url = 'api/cars';
  $.ajax({
    url: url,
    type: 'POST',
    data: car
  })
  .done(function(data) {

     var $car = $('.template').clone();
     $car.removeClass('template');
     $car.find('.id').text(data.id);
     $car.find('.make').text(data.make);
     $car.find('.model').text(data.model);
     $car.find('.year').text(data.year);

    //  $car.data('id', data);
     $('.carList').append($car);

    console.log('data', data);

     $('.modal').modal('hide');

  })
  .fail(function (err) {
    console.log(err);
  });
}

// Update
function submitCar(e) {
  e.preventDefault();

  var id = $('#id').val();
  var make = $('#make').val();
  var model = $('#model').val();
  var year = $('#year').val();

  var car = {
    id: id,
    make: make,
    model: model,
    year: year
  }

  // console.log('car', car);

  var url = `api/cars/${id}`;
  $.ajax({
    url: url,
    type: 'PUT',
    data: car
  })
  .done(function(data) {
  // var $list = dataList(data);



  // var id = $(this).parent().parent().children()[0].textContent;
  // var url = `api/cars/${id}`;
  //
  // $(`td:contains(${id})`).parent().remove();
  // $(`td:contains(${id})`).parent().remove();
  // $(`td:contains(${id})`).parent().remove();
  // $(`td:contains(${id})`).parent().remove();






   $('.modal').modal('hide');

  })
  .fail(function (err) {
    console.log(err);
  });
}

function openModel(e) {
  $('#myModal').modal('show');
  var id = $(e.target).closest('tr').children(0)[0].textContent;
  var make = $(e.target).closest('tr').children(0)[1].textContent;
  var model = $(e.target).closest('tr').children(0)[2].textContent;
  var year = $(e.target).closest('tr').children(0)[3].textContent;

  $('#id').val(id);
  $('#make').val(make);
  $('#model').val(model);
  $('#year').val(year);
}

function removelist(event) {
  var index = $(this).closest('tr').index();
  var url = 'api/cars/'+ id;
  $.ajax({
  })
  .done(function(data) {
      var $list = dataList(data);
  })
  .fail(function (err) {
    console.log(err);
  });
  renderList();
}

function getItem() {

    // localhost:3000/api/cars/a509e55f-a352-4d26-8ce2-d4b5f6db7b81
    // var index = $(this).closest('tr').index();
    var id = $(this).parent().parent().children()[0].textContent;

    var url = 'api/cars/'+ id;
    $.ajax({
      url: url,
      type: 'GET'
    })
    .done(function(data) {
        var $list = dataList(data);
        console.log('$list', $list);
        console.log('data', data);
    })
    .fail(function (err) {
      console.log(err);
    });
    renderList();
}

function updateList(event) {

  var index = $(this).closest('tr').index();
  var id = $(this).parent().parent().children()[0].textContent;

  console.log('ld', id);

  var url = 'api/cars/'+ id;
  $.ajax({
    url: url,
    type: 'PUT'
  })
  .done(function(data) {
      var $list = dataList(data);
  })
  .fail(function (err) {
    console.log(err);
  });
  renderList();
}

function renderList() {
  // $.post('/api/bananas/:id', {varitety: 'cavendish'})
  // .done()
  var url = 'api/cars';
  $.ajax({
    url: url,
  })
  .done(function(data) {
      var $list = dataList(data);
  })
  .fail(function (err) {
    console.log(err);
  });
}

function eventSplit(event) {

	if (typeof event != 'undefined') {

		if (  $('button').is(event.target) ){
			removeContact(event);
		} else if ( $('img.img-circle').is(event.target) ) {
			updateContact(event, $(this).index() );
		}
	}
}

var contactArray = [];
function saveContact() {

	var image = $('#image').val();

	var name = $('#name').val();
	var phone = $('#phone').val();
	var address = $('#address').val();
	var email = $('#email').val();
	var birthday = $('#birthday').val();
	var favorite = $('#favorite').val();

	if (contactArray.length > 0) {
		contactArray = [];
	}

	contactArray.push(image);
	contactArray.push(name);
	contactArray.push(phone);
	contactArray.push(address);
	contactArray.push(email);
	contactArray.push(birthday);
	contactArray.push(favorite);

	$('#image').val('');
	$('#name').val('');
	$('#phone').val('');
	$('#address').val('');
	$('#email').val('');
	$('#birthday').val('');
	$('#favorite').val('');

  $('#btnSave').show();
  $('#btnUpdate').hide();

	addContact();

}

// function renderList() {
//   // $.post('/api/bananas/:id', {varitety: 'cavendish'})
//   // .done()
//   var url = 'api/cars';
//   $.ajax({
//     url: url,
//   })
//   .done(function(data) {
//       var $list = dataList(data);
//   })
//   .fail(function (err) {
//     console.log(err);
//   });
// }

function dataList(data) {
  $('table').empty();
  var count = 0;

  for (var i=0; i<data.length; i++) {
    var array = [];
    var $list = $('<tr>').addClass('dataList');
    // will be hiddn field
    var $id = $('<td>').text(data[i].id);
    var $make = $('<td>').text(data[i].make);
    var $model = $('<td>').text(data[i].model);
    var $year = $('<td>').text(data[i].year);
    var $buttonU = $('<td>').append('<button>Update').addClass('btnUpdate');
    var $buttonD = $('<td>').append('<button>Delete').addClass('btnDelete');

    array.push($list);
    array.push($id);
    array.push($make);
    array.push($model);
    array.push($year);
    array.push($buttonU);
    array.push($buttonD);

    $list.append(array);
    $('table').append($list);
    array = '';
    $list = '';
  }

  return $list;
}

'use strict';

$(document).ready(init);

function init() {

  // $('button').on('click', getList);
  // $('table').on('click', 'button', removelist);
  // $('table').on('click', 'button', updateList);
  // $('table').on('click', 'button', getItem);
  $('table').on('click', openModel);
  // renderList();
  //

	// renderList();
  //
	// $('table').on('click', '.btnDelete', eventSplit);
	// $('table').on('click', '.contactList', eventSplit);
	// $('#btnUpdate').on('click', saveContact);
  //
	// $('#myModal').on('hidden.bs.modal', function (e) {
  //   $(this).find('input,textarea,select').val('').end();
	// })
}

function openModel(event) {

  $('#myModal').modal('show');

  console.log('22222', $(event.target).closest('tr').children(0)[0].textContent);
  console.log('22222', $(event.target).closest('tr').children(0)[1].textContent);
  console.log('22222', $(event.target).closest('tr').children(0)[2].textContent);
  console.log('22222', $(event.target).closest('tr').children(0)[3].textContent);

  var id = $(event.target).closest('tr').children(0)[0].textContent;
  var make = $(event.target).closest('tr').children(0)[1].textContent;
  var model = $(event.target).closest('tr').children(0)[2].textContent;
  var year = $(event.target).closest('tr').children(0)[3].textContent;

// var id = $(this).parent().parent().children()[0].textContent;
  // var make = $(this).parent().parent().children()[1].textContent;
  // var model = $(this).parent().parent().children()[2].textContent;
  // var year = $(this).parent().parent().children()[3].textContent;
  //
  // console.log('id', id);
  // console.log('id', make);
  // console.log('id', model);
  // console.log('id', year);
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

function addContact() {

  var contactList = ContactStorage.get();
	if (g_index > 0) {
		// Update
		contactList.splice(g_index, 1, contactArray);
	  g_index = -1;

	} else {
	  contactList.push(contactArray);
	}

  ContactStorage.write(contactList);
  renderList();
}

var g_index = -1;
function updateContact(event, index) {
  // var index = $(this).index();
  var index = index;

  var contactList = ContactStorage.get();

  g_index = index;

  var array = contactList[index];

	$('#image').val(array[0]);
	$('#name').val(array[1]);
	$('#phone').val(array[2]);
	$('#address').val(array[3]);
	$('#email').val(array[4]);
	$('#birthday').val(array[5]);
	$('#favorite').val(array[6]);

	contactList.splice(index, 1, contactArray);
  ContactStorage.write(contactList);

  renderList();

  $('#myModal').modal();

  if (index > 0) {
	  $('#btnSave').hide();
	  $('#btnUpdate').show();
  } else {
	  $('#btnUpdate').hide();
  }

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

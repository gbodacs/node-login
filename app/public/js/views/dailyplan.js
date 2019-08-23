
$(document).ready(function(){

	var ec = new ExcerciseController();
	var ev = new ExcerciseValidator();
	
	$('#excercise-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'name', value:$('#name-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') ec.onUpdateSuccess();
		},
		error : function(e){
			if (e.responseText == 'error-adding-excercise'){
				ev.showInvalidName();
			}	/*else if (e.responseText == 'username-taken'){
				ev.showInvalidUserName();
			}*/
		}
	});
	$('#name-tf').focus();

// customize the account settings form //
	/*
	$('#account-form h3').text('Felhasználói beállítások');
	$('#account-form #sub').text('Itt vannak a fiókod beállításai és az adataid.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Törlés');
	$('#account-form-btn1').removeClass('btn-outline-dark');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Mentés');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h4').text('Fiók törlése');
	$('.modal-confirm .modal-body p').html('Tényleg törölni szeretnéd a fiókodat?');
	$('.modal-confirm .cancel').html('Mégsem');
	$('.modal-confirm .submit').html('Törlés');
	$('.modal-confirm .submit').addClass('btn-danger');
*/
});
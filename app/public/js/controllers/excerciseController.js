
function ExcerciseController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// Clear input //
	$('#excercise-form-btn1').click(function(){ that.clearInput(); });

// Add new excercise //
	$('.modal-confirm .submit').click(function(){ that.addExcercise(); });

	/*this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('A felhasználód kitöröltük.<br>Továbbítunk a főoldalra.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}*/

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('Kiléptél.<br>Továbbítunk a főoldalra.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h4').text('Sikerült!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

ExcerciseController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Sikerült!');
	$('.modal-alert .modal-body p').html('A gyakorlat adatait frissítetted..');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
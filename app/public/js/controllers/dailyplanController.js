
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

	this.clearInput = function()
	{
		var w = document.getElementById("name-tf"); 
		var q = document.getElementById("movielink-tf"); 
		var e = document.getElementById("unit-tf"); 
		var r = document.getElementById("comment-tf"); 

		w.value = ""; 
		q.value = ""; 
		e.value = ""; 
		r.value = ""; 
	}

	this.addExcercise = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/admin_excercise',
			type: 'POST',
			success: function(data)
			{
	 			that.showLockedAlert('Gyakorlat az adatbázishoz hozzáadva.<br>blabla.');
			},
			error: function(jqXHR)
			{
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

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
		$('.modal-alert button').click(function(){window.location.href = '/admin_excercise';})
		setTimeout(function(){window.location.href = '/admin_excercise';}, 3000);
	}
}

ExcerciseController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Sikerült!');
	$('.modal-alert .modal-body p').html('Felvettél egy új gyakorlatot.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}

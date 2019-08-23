
function BlockController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// Clear input //
	$('#block-form-btn1').click(function(){ that.clearInput(); });

// Add new Block //
	$('.modal-confirm .submit').click(function(){ that.addBlock(); });

	this.clearInput = function()
	{
		var name = document.getElementById("name_tf"); 
		var repeat = document.getElementById("repeat_tf"); 

		name.value = ""; 
		//repeat.value = "cleared!"; 
	}

	this.addBlock = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/admin_block',
			type: 'POST',
			success: function(data)
			{
	 			that.showLockedAlert('Blokk az adatbázishoz hozzáadva.<br> ');
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
		$('.modal-alert button').click(function(){window.location.href = '/admin_block';})
		setTimeout(function(){window.location.href = '/admin_block';}, 3000);
	}
}

BlockController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Sikerült!');
	$('.modal-alert .modal-body p').html('Felvettél egy új blokkot.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}

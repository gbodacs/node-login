
function DailyPlanController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// Clear input //
	$('#dailyplan-form-btn1').click(function(){ that.clearInput(); });

// Add new dailyplan //
	$('.modal-confirm .submit').click(function(){ that.addDailyPlan(); });

	this.clearInput = function()
	{
		var w = document.getElementById("startdate-tf"); 
		var q = document.getElementById("enddate-tf"); 
		var e = document.getElementById("comment-tf"); 
		var r = document.getElementById("block_id_tf"); 
		var t = document.getElementById("repeat-tf"); 
		
		w.value = ""; 
		q.value = ""; 
		e.value = ""; 
		r.value = ""; 
		t.value = ""; 
	}

	this.addDailyPlan = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/admin_dailyplan',
			type: 'POST',
			success: function(data)
			{
	 			that.showLockedAlert('Napi terv az adatbázishoz hozzáadva.');
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
		$('.modal-alert button').click(function(){window.location.href = '/admin_dailyplan';})
		setTimeout(function(){window.location.href = '/admin_dailyplan';}, 3000);
	}
}

DailyPlanController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Sikerült!');
	$('.modal-alert .modal-body p').html('Felvettél egy új napi tervet.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}


function ExcerciseValidator()
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#name-tf'), $('#movielink-tf'), $('#unit-tf'), $('#comment-tf')];
	this.controlGroups = [$('#name-cg'), $('#movielink-cg'), $('#unit-cg'), $('#comment-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validateMovieLink = function(s)
	{
		return s.length >= 3;
	}
	
	this.validateUnit = function(s)
	{
		return s.length >= 1;
	}
	
	this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Kérlek javítsd az alábbi hibákat:');
		var ul = $('.modal-form-errors .modal-body ul');
		ul.empty();

		for (var i=0; i < a.length; i++) 
			ul.append('<li>'+a[i]+'</li>');

		this.alert.modal('show');
	}

}

ExcerciseValidator.prototype.showInvalidName = function()
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['Ez a név már foglalt, adj meg másikat.']);
}

ExcerciseValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) 
		this.controlGroups[i].removeClass('error');

	if (this.validateName(this.formFields[0].val()) == false) 
	{
		this.controlGroups[0].addClass('error'); e.push('Kérlek add meg a gyakorlat nevét!');
	}

	if (this.validateMovieLink(this.formFields[1].val()) == false) 
	{
		this.controlGroups[1].addClass('error'); e.push('Kérlek adj meg egy YouTube URL-t!');
	}

	if (this.validateUnit(this.formFields[2].val()) == false) 
	{
		this.controlGroups[2].addClass('error'); e.push('Kérlek adj meg egy mértékegységet!');
	}
	

	if (e.length) 
		this.showErrors(e);

	return e.length === 0;
}


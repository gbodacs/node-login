
function BlockValidator()
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#name_tf'), $('#repeat_tf'), $('#excer_id_tf'), $('#excer_rep_tf')];
	this.controlGroups = [$('#name-cg'), $('#repeat-cg'), $('#excer_id-cg'), $('#excer_rep-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validateRepeat = function(s)
	{
		return ((s != "") && (s!=undefined));
	}
	
	this.validateExIds = function(s)
	{
		if (s == '0')
			return false;
			
		return true;
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

BlockValidator.prototype.showInvalidName = function()
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['Ez a név már foglalt, kérlek adj meg másikat.']);
}
/*
BlockValidator.prototype.showInvalidRepeat = function()
{
	this.controlGroups[2].addClass('error');
	this.showErrors(['A blokk ismétlésszáma nem lehet üres.']);
}

BlockValidator.prototype.showInvalidExIds = function()
{
	this.controlGroups[3].addClass('error');
	this.showErrors(['Leglább egy gyakorlat kell, hogy legyen egy blokkban.']);
}

BlockValidator.prototype.showInvalidExReps = function()
{
	this.controlGroups[4].addClass('error');
	this.showErrors(['Legalább az első gyakorlatnak kell ismétlési alapbeállítás.']);
}*/

BlockValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++)
	{
		this.controlGroups[i].removeClass('error');
	}

	if (this.validateName(this.formFields[0].val()) == false) 
	{
		this.controlGroups[0].addClass('error'); 
		e.push('Kérlek adj meg egy hosszabb nevet!');
	}

	if (this.validateRepeat(this.formFields[1].val()) == false) 
	{
		this.controlGroups[1].addClass('error'); 
		e.push('A blokk ismétlésszáma nem lehet üres.');
	}

	if (this.validateExIds(this.formFields[2].val()) == false) 
	{
		this.controlGroups[2].addClass('error'); 
		e.push('Az első gyakorlat nem lehet üres.');
	}

	if (e.length) 
		this.showErrors(e);

	return e.length === 0;
}


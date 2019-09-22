
function DailyPlanValidator()
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#startdate-tf'), $('#enddate-tf'), $('#comment-tf'), $('#block_id_tf'), $('#repeat-tf')];
	this.controlGroups = [$('#startdate-cg'), $('#enddate-cg'), $('#comment-cg'), $('#block_id_cg'), $('#repeat-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateStartDate = function(s)
	{
		return s.length >= 2;
	}
	
	this.validateEndDate = function(s)
	{
		return s.length >= 2;
	}
	
	this.validateBlockIds = function(s)
	{
		return s.length >= 2;
	}

	this.validateRepeats = function(s)
	{
		return s.length >= 2;
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

DailyPlanValidator.prototype.showInvalidStartDate = function()
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['A kezdő dátum hibás, kérlek adj meg egy helyeset.']);
}

DailyPlanValidator.prototype.showInvalidEndDate = function()
{
	this.controlGroups[2].addClass('error');
	this.showErrors(['A végződő dátum hibás, kérlek adj meg egy helyeset.']);
}

DailyPlanValidator.prototype.showInvalidBlockIds = function()
{
	this.controlGroups[3].addClass('error');
	this.showErrors(['Legalább egy blokkot be kell állítanod.']);
}

DailyPlanValidator.prototype.showInvalidRepeats = function()
{
	this.controlGroups[4].addClass('error');
	this.showErrors(['Az első blokknak kell, hogy legyen ismétlése.']);
}

DailyPlanValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++)
	{
		this.controlGroups[i].removeClass('error');
	}

	if (this.validateStartDate(this.formFields[0].val()) == false) 
	{
		this.controlGroups[0].addClass('error'); 
		e.push('A kezdő dátum nem lehet üres!');
	}

	if (this.validateEndDate(this.formFields[1].val()) == false) 
	{
		this.controlGroups[1].addClass('error'); 
		e.push('A végző dátum nem lehet üres!');
	}

	if (this.validateBlockIds(this.formFields[3].val()) == false) 
	{
		this.controlGroups[2].addClass('error'); 
		e.push('Legalább egy blokkot meg kell adnod.');
	}

	if (this.validateRepeats(this.formFields[4].val()) == false) 
	{
		this.controlGroups[3].addClass('error'); 
		e.push('Legalább az első blokknak kell ismétlési beállítást megadnod.');
	}

	if (e.length) 
		this.showErrors(e);

	return e.length === 0;
}


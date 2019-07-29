
function AccountValidator()
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];
	this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validateYturl = function(s)
	{
		return s.length >= 3;
	}
	
	this.validateUnit = function(e)
	{
		return s.length >= 1;
	}
	
	this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Kérlek javítsd az alábbi hibákat:');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

}

AccountValidator.prototype.showInvalidEmail = function()
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['Ez az email cím már használatban van.']);
}

AccountValidator.prototype.showInvalidUserName = function()
{
	this.controlGroups[2].addClass('error');
	this.showErrors(['Ez a felhasználónév már használatban van.']);
}

AccountValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Kérlek add meg a neved!');
	}
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error'); e.push('Kérlek adj meg egy valódi email címet!');
	}
	if (this.validateName(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error');
		e.push('Válassz felhasználónevet!');
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('error');
		e.push('A jelszó minimum 6 karakter hosszú legyen!');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}


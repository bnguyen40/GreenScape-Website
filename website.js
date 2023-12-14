/********f************
    
	Project 4 Javascript
	Name: Binh Nguyen 
	Date: Dec. 13, 2023
	Description: Project 4

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Reset?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	// Determine if any items are in the cart
	// When the cart has not items, submission of form is halted
	let errorFlag = false;

	//	Complete the validations below
	let commentsRequiredFileds = ["name", "phone", "email"];

	for(let i=0; i<commentsRequiredFileds.length; i++){
		let textField = document.getElementById(commentsRequiredFileds[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(commentsRequiredFileds[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			// Raise the error flag
			errorFlag = true;
		}
	}

    let tenNumberRegex = new RegExp(/^\d{10}$/);
    let phoneNumber = document.getElementById("phone").value;

    if(!tenNumberRegex.test(phoneNumber)){
		document.getElementById("phoneformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		//Raise the error flag
		errorFlag = true;
	}

	let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
	let email = document.getElementById("email").value;

	if(!emailRegex.test(email)){
		document.getElementById("emailformat_error").style.display = "block";
		if(!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		//Raise the error flag
		errorFlag = true;
	}
	
	return errorFlag;

}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);


	// Add event listener for our order form reset function
	document.getElementById("orderform").addEventListener("reset", resetForm);

	hideErrors();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
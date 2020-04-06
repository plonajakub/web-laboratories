function validateRegexForm() {
    const form = document.forms["regexForm"];
    let isFormValid = true;

    // RegExp patterns
    const namePattern = /^[a-zA-Z]+$/;
    const phoneNumberPattern = /^\+\d{10}$/;
    const dateStructurePattern = /^(.*)\.(.*)\.(.*)$/;
    const dateDayPattern = /^[1-3][0-9]$|^0?[1-9]$/;
    const dateMonthPattern = /^1[0-2]$|^0?[1-9]$/;
    const dateYearPattern = /^[1-2][0-9]{3}$/;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const loginPattern = /^[a-z]+$/;

    const inputValidMsg = "";

    const firstNameInfoSpan = document.getElementById("first-name-info");
    const firstNameInputValue = form["firstName"].value;
    if (!namePattern.test(firstNameInputValue)) {
        firstNameInfoSpan.innerHTML = "Dozwolone tylko litery!";
        isFormValid = false;
    } else {
        firstNameInfoSpan.innerHTML = inputValidMsg;
    }

    const lastNameInfoSpan = document.getElementById("last-name-info");
    const lastNameInputValue = form["lastName"].value;
    if (!namePattern.test(lastNameInputValue)) {
        lastNameInfoSpan.innerHTML = "Dozwolone tylko litery!";
        isFormValid = false;
    } else {
        lastNameInfoSpan.innerHTML = inputValidMsg;
    }

    const phoneNumberInfoSpan = document.getElementById("phone-number-info");
    const phoneNumberInputValue = form["phoneNumber"].value;
    if (!phoneNumberPattern.test(phoneNumberInputValue)) {
        phoneNumberInfoSpan.innerHTML = "Tylko format międzynarodowy!";
        isFormValid = false;
    } else {
        phoneNumberInfoSpan.innerHTML = inputValidMsg;
    }

    const birthDateInfoSpan = document.getElementById("birth-date-info");
    const birthDateInputValue = form["birthDate"].value;
    let isDateStructureValid = true;
    let areDateElementsValid = true;
    let invalidDateElementsInfo = [];
    if (!dateStructurePattern.test(birthDateInputValue)) {
        isDateStructureValid = false;
    } else {
        let [dayInput, monthInput, yearInput] = birthDateInputValue.split(".");
        if (!dateDayPattern.test(dayInput)) {
            invalidDateElementsInfo.push("dzień");
            areDateElementsValid = false;
        }
        if (!dateMonthPattern.test(monthInput)) {
            invalidDateElementsInfo.push("miesiąc");
            areDateElementsValid = false;
        }
        if (!dateYearPattern.test(yearInput)) {
            invalidDateElementsInfo.push("rok");
            areDateElementsValid = false;
        }
    }

    if (!isDateStructureValid || !areDateElementsValid) {
        isFormValid = false;

        if (!areDateElementsValid) {
            birthDateInfoSpan.innerHTML = "Nieporawne elementy daty: " + invalidDateElementsInfo.join(", ");
        } else if (!isDateStructureValid) {
            birthDateInfoSpan.innerHTML = "Niedozwolony format daty";
        }
    } else {
        birthDateInfoSpan.innerHTML = inputValidMsg;
    }

    const emailInfoSpan = document.getElementById("email-info");
    const emailInputValue = form["email"].value;
    if (!emailPattern.test(emailInputValue)) {
        emailInfoSpan.innerHTML = "Email niepoprawny!";
        isFormValid = false;
    } else {
        emailInfoSpan.innerHTML = inputValidMsg;
    }

    const loginInfoSpan = document.getElementById("login-info");
    const loginInputValue = form["login"].value;
    if (!loginPattern.test(loginInputValue)) {
        loginInfoSpan.innerHTML = "Dozwolone tylko małe litery!";
        isFormValid = false;
    } else {
        loginInfoSpan.innerHTML = inputValidMsg;
    }

    const passwordInfoSpan = document.getElementById("password-info");
    const repeatPasswordInfoSpan = document.getElementById("repeat-password-info");
    const passwordInputValue = form["password"].value;
    const repeatPasswordInputValue = form['repeatPassword'].value;

    if (passwordInputValue.length === 0) {
        passwordInfoSpan.innerHTML = "Pole nie może być puste!";
        isFormValid = false;
    } else {
        passwordInfoSpan.innerHTML = "";
    }

    if (repeatPasswordInputValue.length === 0) {
        repeatPasswordInfoSpan.innerHTML = "Pole nie może być puste!";
        isFormValid = false;
    } else {
        repeatPasswordInfoSpan.innerHTML = "";
    }

    if (passwordInputValue !== repeatPasswordInputValue) {
        if (passwordInputValue.length !== 0) {
            passwordInfoSpan.innerHTML = "Podane hasła są różne!";
        }
        if (repeatPasswordInputValue.length !== 0) {
            repeatPasswordInfoSpan.innerHTML = "Podane hasła są różne!";
        }
        isFormValid = false;
    } else {
        if (passwordInputValue.length !== 0) {
            passwordInfoSpan.innerHTML = inputValidMsg;
        }
        if (repeatPasswordInputValue.length !== 0) {
            repeatPasswordInfoSpan.innerHTML = inputValidMsg;
        }
    }

    const formInfoSummarySpan = document.getElementById('check-info-summary');
    if (isFormValid) {
        formInfoSummarySpan.innerHTML = "Formularz poprawny, dane zostały przesłane.";
        // In order to see the message
        return false;
    } else {
        formInfoSummarySpan.innerHTML = "";
    }

    return isFormValid;
}
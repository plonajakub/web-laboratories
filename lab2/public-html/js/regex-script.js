function validateRegexForm() {
    const form = document.forms["regexForm"];
    let isFormValid = true;

    // RegExp patterns
    const onlyLettersPattern = /^[a-zA-Z]+$/;
    const phoneNumberPattern = /^\+\d{10}$/;
    const dateStructurePattern = /^(.*)\.(.*)\.(.*)$/;
    const dateDayPattern = /^[1-3][0-9]$|^0?[1-9]$/;
    const dateMonthPattern = /^1[0-2]$|^0?[1-9]$/;
    const dateYearPattern = /^[1-2][0-9]{3}$/;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const loginPattern = /^[a-z]+$/;

    const firstNameInfoSpan = document.getElementById("first-name-info");
    const firstNameInputValue = form["firstName"].value;
    if (!onlyLettersPattern.test(firstNameInputValue)) {
        firstNameInfoSpan.innerHTML = "Tylko litery!";
        firstNameInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        firstNameInfoSpan.innerHTML = "";
    }

    const lastNameInfoSpan = document.getElementById("last-name-info");
    const lastNameInputValue = form["lastName"].value;
    if (!onlyLettersPattern.test(lastNameInputValue)) {
        lastNameInfoSpan.innerHTML = "Tylko litery!";
        lastNameInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        lastNameInfoSpan.innerHTML = "";
    }

    const phoneNumberInfoSpan = document.getElementById("phone-number-info");
    const phoneNumberInputValue = form["phoneNumber"].value;
    if (!phoneNumberPattern.test(phoneNumberInputValue)) {
        phoneNumberInfoSpan.innerHTML = "Tylko format międzynarodowy!";
        phoneNumberInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        phoneNumberInfoSpan.innerHTML = "";
    }

    const birthDateInfoSpan = document.getElementById("birth-date-info");
    const birthDateInputValue = form["birthDate"].value;
    let isDateStructureValid = true;
    let isDateValid = true;
    let invalidDateElementsInfo = [];
    if (!dateStructurePattern.test(birthDateInputValue)) {
        isDateStructureValid = false;
    } else {
        let [dayInput, monthInput, yearInput] = birthDateInputValue.split(".");
        if (!dateDayPattern.test(dayInput)) {
            invalidDateElementsInfo.push("dzień");
            isDateValid = false;
        }
        if (!dateMonthPattern.test(monthInput)) {
            invalidDateElementsInfo.push("miesiąc");
            isDateValid = false;
        }
        if (!dateYearPattern.test(yearInput)) {
            invalidDateElementsInfo.push("rok");
            isDateValid = false;
        }
    }

    if (!isDateStructureValid || !isDateValid) {
        birthDateInfoSpan.style.color = "red";
        isFormValid = false;

        if (!isDateValid) {
            birthDateInfoSpan.innerHTML = "Nieporawne elementy daty: " + invalidDateElementsInfo.join(", ");
        } else if (!isDateStructureValid) {
            birthDateInfoSpan.innerHTML = "Format daty nieznany";
        }
    } else {
        birthDateInfoSpan.innerHTML = "";
    }

    const emailInfoSpan = document.getElementById("email-info");
    const emailInputValue = form["email"].value;
    if (!emailPattern.test(emailInputValue)) {
        emailInfoSpan.innerHTML = "Email niepoprawny!";
        emailInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        emailInfoSpan.innerHTML = "";
    }

    const loginInfoSpan = document.getElementById("login-info");
    const loginInputValue = form["login"].value;
    if (!loginPattern.test(loginInputValue)) {
        loginInfoSpan.innerHTML = "Login niepoprawny: tylko małe litery!";
        loginInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        loginInfoSpan.innerHTML = "";
    }

    const passwordInfoSpan = document.getElementById("password-info");
    const repeatPasswordInfoSpan = document.getElementById("repeat-password-info");
    const passwordInputValue = form["password"].value;
    const repeatPasswordInputValue = form['repeatPassword'].value;

    if (passwordInputValue.length === 0) {
        passwordInfoSpan.innerHTML = "Pole nie może być puste!";
        passwordInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        passwordInfoSpan.innerHTML = "";
    }

    if (repeatPasswordInputValue.length === 0) {
        repeatPasswordInfoSpan.innerHTML = "Pole nie może być puste!";
        repeatPasswordInfoSpan.style.color = "red";
        isFormValid = false;
    } else {
        repeatPasswordInfoSpan.innerHTML = "";
    }

    if (passwordInputValue !== repeatPasswordInputValue) {
        if (passwordInputValue.length !== 0) {
            passwordInfoSpan.innerHTML = "Podane hasła są różne!";
            passwordInfoSpan.style.color = "red";
        }
        if (repeatPasswordInputValue.length !== 0) {
            repeatPasswordInfoSpan.innerHTML = "Podane hasła są różne!";
            repeatPasswordInfoSpan.style.color = "red";
        }
        isFormValid = false;
    } else {
        if (passwordInputValue.length !== 0) {
            passwordInfoSpan.innerHTML = "";
        }
        if (repeatPasswordInputValue.length !== 0) {
            repeatPasswordInfoSpan.innerHTML = "";
        }
    }

    const formInfoSummarySpan = document.getElementById('check-info-summary');
    if (isFormValid) {
        formInfoSummarySpan.innerHTML = "Formularz poprawny, dane zostały przesłane.";
        formInfoSummarySpan.style.color = "green";
        // In order to see the message
        return false;
    } else {
        formInfoSummarySpan.innerHTML = "";
    }

    return isFormValid;
}
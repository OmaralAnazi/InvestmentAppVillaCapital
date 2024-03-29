/**
 * This function simulates the validation of payment details, without conducting any actual financial transactions.
 */
function validatePayment(cardNumber, expirationDate, cvv) {
    if (!/^\d{16}$/.test(cardNumber)) {
        throw new Error("Card number must be 16 digits.");
    }

    // Validate Expiration Date (format MM/YY and not expired)
    const [expMonth, expYear] = expirationDate.split("/");
    const currentYear = new Date().getFullYear() % 100; // Last two digits of the year
    const currentMonth = new Date().getMonth() + 1; // 1-12 for January to December
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate) || parseInt(expYear) < currentYear || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
        throw new Error("Invalid or expired date. Use MM/YY format.");
    }

    if (!/^\d{3}$/.test(cvv)) {
        throw new Error("CVV must be 3 digits.");
    }

    return true; 
}

export default validatePayment;

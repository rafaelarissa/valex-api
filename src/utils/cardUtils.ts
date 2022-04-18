export function checkCardValidation(cardNo) {
  var regex = new RegExp("^[0-9]{16}$");
  if (!regex.test(cardNo)) return false;

  var s = 0;
  var doubleDigit = false;
  for (var i = cardNo.length - 1; i >= 0; i--) {
    var digit = +cardNo[i];
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    s += digit;
    doubleDigit = !doubleDigit;
  }
  return s % 10 == 0;
}

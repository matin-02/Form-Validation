function isEmail(email) {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isStrongPassword(password) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

$("#showPassword").change(function () {
  const type = $(this).is(":checked") ? "text" : "password";
  $("#password, #confirmpassword").attr("type", type);
});

$("#submitbutton").click(function (e) {
  e.preventDefault();
  let errormessage = "";
  let missingfield = "";

  $("#error").html("");
  $("#success").html("");

  const email = $("#Email").val().trim();
  const phone = $("#phoneno").val().trim();
  const password = $("#password").val();
  const confirmPassword = $("#confirmpassword").val();

  if (email === "") missingfield += "<p>Email is not filled</p>";
  if (phone === "") missingfield += "<p>Phone Number is not filled</p>";
  if (password === "") missingfield += "<p>Password is not filled</p>";
  if (confirmPassword === "") missingfield += "<p>Confirm Password is not filled</p>";

  if (email && !isEmail(email)) errormessage += "<p>Email format is invalid</p>";
  if (phone && (!$.isNumeric(phone) || phone.length !== 10)) {
    errormessage += "<p>Phone number must be exactly 10 digits</p>";
  }

  if (password && !isStrongPassword(password)) {
    errormessage += `<p>Password must be at least 8 characters long and include uppercase, lowercase, and a number</p>`;
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errormessage += "<p>Passwords do not match</p>";
  }

  if (!errormessage && !missingfield) {
    $("#success").html("You are registered successfully!");
  } else {
    $("#error").html(errormessage + missingfield);
  }
});

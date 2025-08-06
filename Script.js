function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/;
  return regex.test(password);
}

// Allow only numbers in Phone field
$("#phoneno").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

$("#submitbutton").click(function (e) {
  e.preventDefault();
  var errormessage = "";
  var missingfield = "";

  $("#error").html("");
  $("#success").html("");

  var email = $("#Email").val().trim();
  var phone = $("#phoneno").val().trim();
  var password = $("#password").val();
  var confirmPassword = $("#confirmpassword").val();

  if (email === "") missingfield += "<p>Email is required.</p>";
  if (phone === "") missingfield += "<p>Phone Number is required.</p>";
  if (password === "") missingfield += "<p>Password is required.</p>";
  if (confirmPassword === "") missingfield += "<p>Confirm Password is required.</p>";

  if (email && !isEmail(email)) {
    errormessage += "<p>Invalid Email format.</p>";
  }

  if (phone && phone.length !== 10) {
    errormessage += "<p>Phone Number must be 10 digits.</p>";
  }

  if (password && !isValidPassword(password)) {
    errormessage += "<p>Password must be 8-15 characters, with at least one uppercase, one lowercase, and one special character.</p>";
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errormessage += "<p>Passwords do not match.</p>";
  }

  if (errormessage === "" && missingfield === "") {
    $("#success").html("✅ You are registered successfully!");
  } else {
    $("#error").html(errormessage + missingfield);
  }
});

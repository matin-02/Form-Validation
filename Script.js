
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isPasswordValid(password) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,15}$/;
  return regex.test(password);
}

$(document).ready(function () {
  $("#phoneno").on("input", function () {
    this.value = this.value.replace(/[^\d]/g, "").slice(0, 10);
  });

  $(".toggle-password").click(function () {
    let input = $($(this).attr("toggle"));
    let icon = $(this).find("i");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  $("#submitbutton").click(function (e) {
    e.preventDefault();
    var errormessage = "";
    var missingfield = "";

    $("#error").html("");
    $("#success").html("");

    const email = $("#Email").val();
    const phone = $("#phoneno").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmpassword").val();

    if (!email) missingfield += "<p>Email is required.</p>";
    if (!phone) missingfield += "<p>Phone Number is required.</p>";
    if (!password) missingfield += "<p>Password is required.</p>";
    if (!confirmPassword) missingfield += "<p>Confirm Password is required.</p>";

    if (email && !isEmail(email)) errormessage += "<p>Invalid Email format.</p>";
    if (phone && phone.length !== 10) errormessage += "<p>Phone Number must be exactly 10 digits.</p>";
    if (password && !isPasswordValid(password)) {
      errormessage += "<p>Password must be 8-15 characters long and include uppercase, lowercase, and a special character.</p>";
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errormessage += "<p>Passwords do not match.</p>";
    }

    if (!missingfield && !errormessage) {
      $("#success").html("Registration successful!");
    } else {
      $("#error").html(errormessage + missingfield);
    }
  });
});

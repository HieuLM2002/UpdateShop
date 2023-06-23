
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
    <link rel="stylesheet" href="../styles/register.css" />
  </head>
  <body>
    <div class="register-box">
      <div id="form">
          <h2>Register</h2>
          <form id="register-form" method="POST">
            <div class="user-box">
            <label>Full Name</label>
              <input type="text" name="fullname" id="fullname" class="form-control"/>
              <span class="form-message"></span>
            </div>
            <div class="user-box">
            <label>User Name</label>
              <input type="text" name="username"  id="username" class="form-control"/>
              <span class="form-message">
                        <?php echo (isset($errUserName) ? $errUserName : ''); ?>
                        <?php echo (isset($messCheckUser) ? $messCheckUser : ''); ?>
             </span>
            </div>
            <div class="user-box">
            <label>E-mail</label>
              <input type="text" name="email" id="email"  class="form-control"/>
              <span class="form-message">
                        <?php echo (isset($errEmail) ? $errEmail : ''); ?>
                        <?php echo (isset($messCheckEmail) ? $messCheckEmail : ''); ?>
             </span>
            </div>
            <div class="user-box">
            <label>Phone</label>
              <input type="text" name="phone" id="phone" class="form-control" />
              <span class="form-message">
                        <?php echo (isset($errPhone) ? $errPhone : ''); ?>
             </span>
            </div>
            <div class="user-box">
            <label>Address</label>
              <input type="text" name="addresss" id="address" class="form-control"/>   
              <span class="form-message"></span>
            </div>
            <div class="user-box">
            <label>Password</label>
              <input type="password" name="password" id="password" class="form-control"  autocomplete="on"/>  
              <span class="form-message">
                       <?php echo (isset($errMessagePassword) ? $errMessagePassword : ''); ?> 
             </span>
            </div>
            <div class="user-box">
            <label>Re-enter Password</label>
              <input type="password" name="retypepassword" id="retypepassword" class="form-control"  autocomplete="on"/>         
              <span class="form-message">
                        <?php echo (isset($errPassWord) ? $errPassWord : ''); ?>
             </span>
            </div>
            <button type="submit" name="resgister">Register</button>
          </form>
          <p class="not-member">
            Not a member yet?| Click
            <a href="">here</a>
            to login
          </p>      
      </div>
    </div>
    <script src="../js/main.js"></script>
    <script>
      Validator({
        form: "#register-form",
        formGroupSelector: ".user-box",
        errorSelector: ".form-message",
        rules: [
        Validator.isRequired("#fullname"),
          Validator.isRequired("#username"),
          Validator.isRequired("#email"),
          Validator.isEmail("#email"),
          Validator.isRequired("#phone"),
          Validator.isRequired("#address"),
          Validator.isRequired("#password"),
          Validator.passwordMinLength("#password", 6),
          Validator.isRequired("#retypepassword"),     
          Validator.isConfirmed(
            "#retypepassword",
            () => {
              return document.querySelector("#register-form #password").value;
            },
            "Re-entered password is incorrect!"
          ),
        ],
        onSubmit: (data) => {
            var xhr = new XMLHttpRequest();
xhr.open('POST', '../database/User.php');
 xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
       // var response = JSON.parse(xhr.responseText);
        // handle response here
    }
};
xhr.send(JSON.stringify(data));;
        },
       }
       );
    </script>
  </body>
</html>

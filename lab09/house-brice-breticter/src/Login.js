

function Login() {
    return (
      <div className="Login">
        <label for="fname">First name:</label><br/>
        <input type="text" id="fname" name="fname"/><br/>
        <label for="lname">Last name:</label><br/>
        <input type="text" id="lname" name="lname"/>
      </div>
    );
  }
  
  export default Login;



// Linking Login to Backend Post("/login")

function submitLoginForm() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameWarning = document.getElementById('usernameWarning');
    const passwordWarning = document.getElementById('passwordWarning');

    // Reset warnings
    usernameWarning.style.display = 'none';
    passwordWarning.style.display = 'none';

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    let isValid = true;

    // Validate inputs
    if (!username) {
        usernameWarning.style.display = 'block';
        isValid = false;
    }

    if (!password) {
        passwordWarning.style.display = 'block';
        isValid = false;
    }

    // Proceed if valid
    if (isValid) {
        // Prepare data to send
        const user = {
            username: username,
            password: password
        };

        // Send POST request to /login endpoint
        fetch("http://localhost:8080/login", { method: "POST", headers: {"Content-Type": "application/json"} , body: JSON.stringify(user)  })
        
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Invalid Username or Password");
            }
        })
        .then(message => {
            alert(message); // Show the success message
            // Show OTP modal if needed
            const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
            otpModal.show();
        })
        .catch(error => {
            alert(error.message); // Show the error message
        });
    }
}


// ---------------------------------------------------------------------------------------------------------------------------


//<!--  OTP verification -->

document.getElementById('verifyOtpButton').addEventListener('click', function () {
    const otpInput = document.getElementById('otpInput');
    const otpWarning = document.getElementById('otpWarning');

    if (otpInput.value.trim() === '') {
        otpWarning.style.display = 'block'; // Show warning
        otpWarning.textContent = 'Please enter your OTP'; // Warning text
    } else {
        otpWarning.style.display = 'none'; // Hide warning

        // Prepare data to send in the request
        const userData = {
            otp: otpInput.value // Assuming the `User` class has an `otp` field
        };

        // Send the POST request
        fetch('http://localhost:8080/verify', {method: 'POST',headers: {'Content-Type': 'application/json' },body: JSON.stringify(userData) })

        .then(response => response.text())
        .then(message => {
            otpWarning.style.display = 'block'; // Show warning or success message area
            otpWarning.textContent = message; // Display server response directly

             // Redirect to dashboard if OTP verification is successful
             if (message === 'Verified Successfuly') {
                window.location.href = 'dashboard.html';
            }
        })
        
        
        .catch(error => {
            console.error('Error:', error);
            otpWarning.style.display = 'block';
            otpWarning.textContent = 'An error occurred. Please try again.'; // Error message display
        });
    }
});


 // ---------------------------------------------------------------------------------------------------------------------------


// Forgot Password

function handleForgotPassword() {
    const forgotPasswordInput = document.getElementById('forgotPasswordInput');
    const forgotPasswordWarning = document.getElementById('forgotPasswordWarning');

    if (forgotPasswordInput.value.trim() === '') {
        forgotPasswordWarning.style.display = 'block';
    } else {
                forgotPasswordWarning.style.display = 'none';
                console.log('Forgot password requested for:', forgotPasswordInput.value);

                
                const requestData = {
                    username: forgotPasswordInput.value, // Assuming this field is required
                    email: forgotPasswordInput.value // If you have separate inputs for email and username, adjust accordingly
                };

                fetch('http://localhost:8080/forgot', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(requestData) })

                .then(response => response.text())
                .then(message => {
                    alert(message); // Display server response

                    // Hide the forgot password modal
                    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
                    const bootstrapForgotPasswordModal = bootstrap.Modal.getInstance(forgotPasswordModal);
                    bootstrapForgotPasswordModal.hide();

                    const setPasswordModal = new bootstrap.Modal(document.getElementById('setPasswordModal'));
                    setPasswordModal.show();
                })
               .catch(error => console.error('Error:', error));
              
    }
}


// ---------------------------------------------------------------------------------------------------------------------------


// Set New Password Modal


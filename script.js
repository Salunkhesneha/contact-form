document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Invalid email format";
        isValid = false;
    }

    // Message validation
    if (message === "") {
        messageError.textContent = "Message is required";
        isValid = false;
    } else if (message.length < 20) {
        messageError.textContent = "Message must be at least 20 characters";
        isValid = false;
    }

    // If all inputs are valid, send data to mock API
    if (isValid) {
        let formData = { name, email, message };
        console.log("Form Data:", formData); // Log input data

        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                document.getElementById("contactForm").reset();
            } else {
                alert("Error submitting form. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection.");
        }
    }
});

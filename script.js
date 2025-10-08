// =======================
// QuickFix Complaint Form
// =======================

// Select the form
const complaintForm = document.getElementById("complaintForm");

// Listen for the submit event
complaintForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    // Get user input values
    const name = document.getElementById("name").value.trim();
    const room = document.getElementById("room").value.trim();
    const category = document.getElementById("category").value;
    const details = document.getElementById("details").value.trim();

    // Simple form validation
    if (!name || !room || !category || !details) {
        alert("⚠️ Please fill out all fields before submitting.");
        return;
    }

    // Simulated success message
    alert(`✅ Complaint Registered Successfully!\n\nName: ${name}\nRoom: ${room}\nCategory: ${category}\nDetails: ${details}`);

    // Clear form after submission
    complaintForm.reset();
});

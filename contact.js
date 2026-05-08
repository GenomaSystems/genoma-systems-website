document.addEventListener('DOMContentLoaded', () => {
    // Consultation Form Validation & Submission
    const consultationForm = document.getElementById('consultationForm');

    if (consultationForm) {
        consultationForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Basic validation
            const fullName = document.getElementById('fullName').value.trim();
            const organization = document.getElementById('organization').value.trim();
            const workEmail = document.getElementById('workEmail').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = consultationForm.querySelector('.btn-submit');

            if (fullName && organization && workEmail) {
                // Change button state
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending Request...';
                submitBtn.disabled = true;

                try {
                    // Send data using Web3Forms API
                    // To make this work:
                    // 1. Go to https://web3forms.com/
                    // 2. Enter your email (shivang@genomasystems.com) to get an Access Key
                    // 3. Replace 'YOUR_ACCESS_KEY_HERE' below with that key
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: '35106e1b-7254-4f09-b9d9-a93f3f4aa763', // <-- PASTE YOUR KEY HERE
                            subject: 'New Consultation Request - Genoma Systems',
                            from_name: 'Genoma Systems Website',
                            Name: fullName,
                            Email: workEmail,
                            Organization: organization,
                            Message: message || 'No message provided.'
                        })
                    });

                    const result = await response.json();

                    if (response.status === 200) {
                        // Hide form, show success message
                        consultationForm.style.display = 'none';
                        const successMsg = document.getElementById('formSuccessMessage');
                        if (successMsg) {
                            successMsg.style.display = 'block';
                        }
                    } else {
                        console.error('Submission failed:', result);
                        alert('Something went wrong. Please try again later.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('There was an error sending your request. Please try again or email us directly.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }

            } else {
                alert('Please fill out all required fields.');
            }
        });
    }
});

const form = document.getElementById('waitlistForm');
const message = document.getElementById('formMessage');
const year = document.getElementById('year');

const SCRIPT_URL = https://script.google.com/macros/s/AKfycbwAXv0rvHQg9yy_Jvf1mG5auouUizwSL_y0RPAsP8Mi6u2pW26Otv-JPXMPeVse5l8J/exec;

if (year) {
    year.textContent = new Date().getFullYear();
}

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
            name: (formData.get('name') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            interest: (formData.get('interest') || '').toString().trim()
        };

        if (!payload.email || !isValidEmail(payload.email)) {
            setMessage('Please enter a valid email address.', 'error');
            return;
        }

        setMessage('Submitting...', '');

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                form.reset();
                setMessage('Thanks — you are on the waitlist.', 'success');
            } else {
                setMessage('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            setMessage('Submission failed. Please try again.', 'error');
            console.error(error);
        }
    });
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setMessage(text, type) {
    if (!message) return;
    message.textContent = text;
    message.className = `form-message ${type}`;
} 

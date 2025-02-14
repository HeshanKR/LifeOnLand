function showNotification(message, isSuccess = false) {
    const notification = document.createElement('div');
    notification.className = `notification${isSuccess ? ' success' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.top = '20px';
    }, 10);
    setTimeout(() => {
        notification.style.top = '-50px';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const visit = document.querySelector('input[name="visit"]:checked');
    const rate = document.querySelector('input[name="rate"]:checked');
    const recommend = document.querySelector('input[name="recommend"]:checked');
    const updates = document.getElementById('updates').value;
    const mobile = document.getElementById('mobile').value;
    const feedback = document.getElementById('feedback').value;

    if (!name || !email || !visit || !rate || !recommend || !feedback) {
        alert('All fields are required.');
        return;
    }

    if (name === '') {
        alert('Name cannot be empty or only spaces.');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Name must contain only letters and spaces.');
        return;
    }

    // Check for email field errors
    if (email === '') {
        alert('Email cannot be empty.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (/\s/.test(email)) {
        alert('Email cannot contain spaces.');
        return;
    }

    // Check for mobile number field errors
    if (updates === 'sms') {
        if (mobile === '') {
            alert('Please enter your mobile number.');
            return;
        }

        if (!/^0\d{9}$/.test(mobile)) {
            alert('Mobile number must start with 0 and have 10 digits in total.');
            return;
        }

        if (/\s/.test(mobile)) {
            alert('Mobile number should not contain spaces.');
            return;
        }    
    }


    // Show preview
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewVisit').textContent = visit.value;
    document.getElementById('previewRate').textContent = rate.value;
    document.getElementById('previewRecommend').textContent = recommend.value;
    document.getElementById('previewUpdates').textContent = updates === 'sms' ? 'Yes - via SMS' : updates === 'email' ? 'Yes - via Email' : 'No';
    document.getElementById('previewMobile').textContent = updates === 'sms' ? mobile : '';
    document.getElementById('previewMobileSection').style.display = updates === 'sms' ? 'block' : 'none';
    document.getElementById('previewFeedback').textContent = feedback;
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
});

document.getElementById('editButton').addEventListener('click', function() {
    document.getElementById('feedbackForm').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
});

document.getElementById('confirmButton').addEventListener('click', function() {
    showNotification('Thank you for your feedback!', true);

    // Clear form and hide preview
    document.getElementById('feedbackForm').reset();
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('feedbackForm').style.display = 'block';

    // Redirect to the home page
    setTimeout(() => {
        window.location.href = '../../../Student2/Student2/Home/home.html';
    }, 2000);  // Redirects after 2 seconds to give time for the thank you message
});

document.getElementById('updates').addEventListener('change', function() {
const viaSMS = document.getElementById('viaSMS');
const mobileField = document.getElementById('mobile');
if (this.value === 'sms') {
viaSMS.style.display = 'block';
} else {
viaSMS.style.display = 'none';
}
});
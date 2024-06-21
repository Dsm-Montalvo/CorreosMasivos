document.getElementById('socialMediaButton').addEventListener('click', function() {
    var socialIcons = document.getElementById('socialIcons');
    if (socialIcons.style.display === 'none' || socialIcons.style.display === '') {
        socialIcons.style.display = 'block';
        this.classList.add('active');
    } else {
        socialIcons.style.display = 'none';
        this.classList.remove('active');
    }
});

document.getElementById('contactUsButton').addEventListener('click', function() {
    var contactInfo = document.getElementById('contactInfo');
    if (contactInfo.style.display === 'none' || contactInfo.style.display === '') {
        contactInfo.style.display = 'block';
        this.classList.add('active');
    } else {
        contactInfo.style.display = 'none';
        this.classList.remove('active');
    }
});

document.getElementById('directoryHeader').addEventListener('click', function() {
    var directoryAccordion = document.getElementById('directoryAccordion');
    if (directoryAccordion.style.display === 'none' || directoryAccordion.style.display === '') {
        directoryAccordion.style.display = 'block';
        this.classList.add('active');
    } else {
        directoryAccordion.style.display = 'none';
        this.classList.remove('active');
    }
});

document.getElementById('courseButton').addEventListener('click', function() {
    var courseContent = document.getElementById('courseContent');
    if (courseContent.style.display === 'none' || courseContent.style.display === '') {
        courseContent.style.display = 'block';
        this.classList.add('active');
    } else {
        courseContent.style.display = 'none';
        this.classList.remove('active');
    }
});

document.getElementById('donationButton').addEventListener('click', function() {
    var donationContent = document.getElementById('donationContent');
    if (donationContent.style.display === 'none' || donationContent.style.display === '') {
        donationContent.style.display = 'block';
        this.classList.add('active');
    } else {
        donationContent.style.display = 'none';
        this.classList.remove('active');
    }
});

document.getElementById('signalsButton').addEventListener('click', function() {
    var signalsContent = document.getElementById('signalsContent');
    if (signalsContent.style.display === 'none' || signalsContent.style.display === '') {
        signalsContent.style.display = 'block';
        this.classList.add('active');
    } else {
        signalsContent.style.display = 'none';
        this.classList.remove('active');
    }
});

// document.getElementById('youtubeButton').addEventListener('click', function() {
//     var youtubeContent = document.getElementById('youtubeContent');
//     if (youtubeContent.style.display === 'none' || youtubeContent.style.display === '') {
//         youtubeContent.style.display = 'block';
//         this.classList.add('active');
//     } else {
//         youtubeContent.style.display = 'none';
//         this.classList.remove('active');
//     }
// });

document.getElementById('eventsButton').addEventListener('click', function() {
    var eventsContent = document.getElementById('eventsContent');
    if (eventsContent.style.display === 'none' || eventsContent.style.display === '') {
        eventsContent.style.display = 'block';
        this.classList.add('active');
    } else {
        eventsContent.style.display = 'none';
        this.classList.remove('active');
    }
});

function copyNumber(phoneNumber) {
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Número copiado al portapapeles: ' + phoneNumber);
    }).catch(err => {
        console.error('Error al copiar el número: ', err);
    });
}

function toggleEmail(id) {
    var emailContent = document.getElementById(id);
    emailContent.classList.toggle("show");
}

function toggleLocation() {
    var locationContent = document.getElementById("locationContent");
    locationContent.classList.toggle("show");
}

function toggleEmailDirectory() {
    var emailContentDirectory = document.getElementById("emailContentDirectory");
    emailContentDirectory.classList.toggle("show");
}
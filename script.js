// Show contact cards when "Get in Touch" button is clicked
document.getElementById('showContactBtn').addEventListener('click', function() {
    document.getElementById('contactCards').style.display = 'block';
    this.style.display = 'none';
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Highlight nav link based on scroll position (like brittanychiang.com)
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 120) index = i;
    }
    navLinks.forEach(link => link.classList.remove('active'));
    const activeSection = sections[index];
    if (activeSection) {
        const activeLink = document.querySelector(`.nav-link[href="#${activeSection.id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('resize', activateNavLink);
window.addEventListener('DOMContentLoaded', activateNavLink);
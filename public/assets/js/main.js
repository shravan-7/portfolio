AOS.init();

AOS.init({
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 700, // values from 0 to 3000, with step 50ms
	easing: "ease", // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

(function () {
	emailjs.init("z8Ia0BVKWn4tf0ns-");
})();

document
	.getElementById("contact-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		// Change button text to "Sending..."
		var button = this.querySelector('button[type="submit"]');
		var originalButtonText = button.innerHTML;
		button.innerHTML = "Sending...";
		button.disabled = true;

		emailjs
			.sendForm("service_gj2g78o", "template_09ao47f", this)
			.then(
				function () {
					console.log("SUCCESS!");
					document.getElementById("contact-message").innerHTML =
						"Your message has been sent!";
					document.getElementById("contact-message").style.display =
						"block";
					document.getElementById("contact-form").reset();
				},
				function (error) {
					console.log("FAILED...", error);
					document.getElementById("contact-message").innerHTML =
						"Failed to send message. Please try again.";
					document.getElementById("contact-message").style.display =
						"block";
				}
			)
			.finally(function () {
				button.innerHTML = originalButtonText;
				button.disabled = false;
			});
	});
document.addEventListener("DOMContentLoaded", function () {
	const contactForm = document.getElementById("contact-form");
	const contactMessage = document.getElementById("contact-message");
	const contactSection = document.getElementById("contact");
	const contactNavItem = document.querySelector(
		'a.nav-link[href="#contact"]'
	);

	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Simulate form submission (replace with actual form submission logic)
			setTimeout(() => {
				contactForm.style.display = "none";
				contactMessage.style.display = "block";
				contactMessage.textContent =
					"Thank you for your message. We will get back to you soon!";

				// Hide message after 3 seconds
				setTimeout(() => {
					contactMessage.style.display = "none";
					// Hide contact section
					contactSection.style.display = "none";
					// Remove contact from navigation
					if (contactNavItem) {
						contactNavItem.parentElement.remove();
					}
				}, 3000);
			}, 1000); // Simulate 1 second delay for form submission
		});
	}
});

// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.querySelector(".navbar");
	const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

	// Change navbar style on scroll
	window.addEventListener("scroll", () => {
		if (window.scrollY > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	});

	// Smooth scrolling for nav links
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			let target = document.querySelector(this.getAttribute("href"));
			window.scrollTo({
				top: target.offsetTop - navbar.offsetHeight,
				behavior: "smooth",
			});
		});
	});

	// Update active nav link on scroll
	window.addEventListener("scroll", () => {
		let current = "";
		const sections = document.querySelectorAll("section");
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if (pageYOffset >= sectionTop - navbar.offsetHeight) {
				current = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href").substring(1) === current) {
				link.classList.add("active");
			}
		});
	});

	// Close mobile menu on link click
	const navbarCollapse = document.querySelector(".navbar-collapse");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (navbarCollapse.classList.contains("show")) {
				navbarCollapse.classList.remove("show");
			}
		});
	});
});

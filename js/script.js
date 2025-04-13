$(document).ready(function() {
    const projects = [
        {
            id: 1,
            title: "Castle Canada Website",
            image: "images/castle_canada_project.png",
            description: "An e-commerce website for a perfume company with product listings and shopping cart functionality.",
            details: "This project involved creating a responsive e-commerce platform using HTML, CSS, and JavaScript. Features include product filtering, user authentication, and a shopping cart system."
        },
        {
            id: 2,
            title: "IEAC Organization Site",
            image: "images/ieac_project.png",
            description: "A responsive website for an international organization featuring event listings and member resources.",
            details: "Developed a multilingual website with content management system, event calendar, and member portal using modern web technologies."
        },
        {
            id: 3,
            title: "Portfolio Website",
            image: "images/website.jpg",
            description: "A personal portfolio website showcasing web development projects and skills.",
            details: "Created a responsive portfolio using HTML, Bootstrap, JavaScript, and jQuery with features like dark mode, form validation, and dynamic content generation."
        }
    ];

    function generateProjects() {
        const projectsContainer = $('#projectsContainer');
        projectsContainer.empty();

        projects.forEach(project => {
            const projectCard = `
                <div class="col-md-4">
                    <div class="card project-card h-100">
                        <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <button class="btn btn-primary project-details" data-bs-toggle="modal" data-bs-target="#projectModal" data-project-id="${project.id}">More Details</button>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.append(projectCard);
        });
    }

    function createProjectModal() {
        const modalHTML = `
            <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="projectModalLabel">Project Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="projectModalBody">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalHTML);
        
        if ($('body').hasClass('dark-mode')) {
            $('#projectModal .modal-content').addClass('dark-mode');
        }
    }

    $(document).on('click', '.project-details', function() {
        const projectId = $(this).data('project-id');
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
            const modalContent = `
                <div class="text-center mb-4">
                    <img src="${project.image}" class="img-fluid rounded" alt="${project.title}" style="max-height: 200px;">
                </div>
                <h4>${project.title}</h4>
                <p>${project.details}</p>
            `;
            $('#projectModalBody').html(modalContent);
        }
    });

    function generateContactForm() {
        const contactFormContainer = $('#contactFormContainer');
        const formHTML = `
            <form id="contactForm" class="needs-validation" novalidate>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                    <div class="invalid-feedback">
                        Please enter your name.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                    <div class="invalid-feedback">
                        Please enter a valid email address.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                    <div class="invalid-feedback">
                        Please enter your message.
                    </div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
                <div id="formStatus" class="mt-3"></div>
            </form>
        `;
        contactFormContainer.html(formHTML);
    }

    function validateForm() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                submitFormWithAjax();
            }
            
            form.classList.add('was-validated');
        }, false);
    }

    function submitFormWithAjax() {
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };
        
        $('#formStatus').html('<div class="alert alert-info">Sending message...</div>');
        
        setTimeout(function() {
            $('#formStatus').html('<div class="alert alert-success">Message sent successfully!</div>');
            $('#contactForm').removeClass('was-validated').trigger('reset');
            
            console.log('Form submitted with:', formData);
        }, 1500);
    }

    function setupDarkModeToggle() {
        const darkModeToggle = $('#darkModeToggle');
        const icon = darkModeToggle.find('i');
        
        if (localStorage.getItem('darkMode') === 'enabled') {
            $('body').addClass('dark-mode');
            $('.modal-content').addClass('dark-mode');
            icon.removeClass('bi-moon').addClass('bi-sun');
        }
        
        darkModeToggle.on('click', function() {
            if ($('body').hasClass('dark-mode')) {
                $('body').removeClass('dark-mode');
                $('.modal-content').removeClass('dark-mode');
                icon.removeClass('bi-sun').addClass('bi-moon');
                localStorage.setItem('darkMode', 'disabled');
            } else {
                $('body').addClass('dark-mode');
                $('.modal-content').addClass('dark-mode');
                icon.removeClass('bi-moon').addClass('bi-sun');
                localStorage.setItem('darkMode', 'enabled');
            }
        });
    }

    function setupSmoothScrolling() {
        $('a.nav-link').on('click', function(event) {
            if (this.hash !== '') {
                event.preventDefault();
                const hash = this.hash;
                
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 56 // Adjust for fixed navbar
                }, 0, function() {
                    window.location.hash = hash;
                });
                
                $('.navbar-collapse').collapse('hide');
            }
        });
    }

    function setupScrollSpy() {
        $(window).on('scroll', function() {
            const scrollPosition = $(window).scrollTop();
            
            $('section').each(function() {
                const sectionTop = $(this).offset().top - 100;
                const sectionBottom = sectionTop + $(this).outerHeight();
                const sectionId = $(this).attr('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    $(`.nav-link[href="#${sectionId}"]`).addClass('active');
                }
            });
        });
    }

    function init() {
        generateProjects();
        createProjectModal();
        generateContactForm();
        validateForm();
        setupDarkModeToggle();
        setupSmoothScrolling();
        setupScrollSpy();
    }

    init();
});
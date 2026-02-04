'use strict';

document.addEventListener("DOMContentLoaded", () => {
    // Form Submission Logic
    setupFormValidation();

    // Carousel Logic
    setupCarousel();

    // Tabs Logic for Profiles Page
    setupTabs();

    // Team Pages API Logic
    setupTeamPages();
});

function setupFormValidation() {
    const form = document.getElementById("favorite-player-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input");
    const successMessage = document.createElement("p");
    successMessage.classList.add("success-message");
    successMessage.textContent = "Thank you for submitting your favorites!";
    successMessage.style.display = "none";
    form.appendChild(successMessage);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let allValid = true;

        inputs.forEach((input) => {
            if (!input.checkValidity()) {
                input.classList.add("invalid");
                allValid = false;
            } else {
                input.classList.remove("invalid");
            }
        });

        if (allValid) {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
                form.reset();
            }, 3000);
        }
    });

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.checkValidity()) {
                input.classList.remove("invalid");
            }
        });
    });
}

function setupCarousel() {
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    const carouselItems = Array.from(document.querySelectorAll('.image-item'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    if (!carouselItems.length) return;

    const CAROUSEL_SIZE = carouselItems.length;
    let intervalId;

    leftBtn.addEventListener('click', swipe);
    rightBtn.addEventListener('click', swipe);
    dots.forEach(dot => dot.addEventListener('click', goToSlide));

    function swipe(e) {
        const currentCarouselItem = document.querySelector('.image-item.active');
        const currentIndex = carouselItems.indexOf(currentCarouselItem);
        let nextIndex;

        if (e.currentTarget.classList.contains('left')) {
            nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;
        }

        updateCarousel(nextIndex, currentIndex);
    }

    function goToSlide(e) {
        const targetIndex = parseInt(e.currentTarget.getAttribute('data-slide'));
        const currentCarouselItem = document.querySelector('.image-item.active');
        const currentIndex = carouselItems.indexOf(currentCarouselItem);

        updateCarousel(targetIndex, currentIndex);
    }

    function updateCarousel(nextIndex, currentIndex) {
        carouselItems[nextIndex].classList.add('active');
        carouselItems[currentIndex].classList.remove('active');
        dots[nextIndex].classList.add('active');
        dots[currentIndex].classList.remove('active');
    }

    function startAutoSlide() {
        intervalId = setInterval(() => {
            const currentCarouselItem = document.querySelector('.image-item.active');
            const currentIndex = carouselItems.indexOf(currentCarouselItem);
            const nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;

            updateCarousel(nextIndex, currentIndex);
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    startAutoSlide();

    carouselItems.forEach(item => {
        item.addEventListener('mouseover', stopAutoSlide);
        item.addEventListener('mouseout', startAutoSlide);
    });
}

function setupTabs() {
    const superstarsTab = document.getElementById('superstars-tab');
    const risingStarsTab = document.getElementById('rising-stars-tab');
    const superstarsContent = document.getElementById('superstars');
    const risingStarsContent = document.getElementById('rising-stars');

    if (!superstarsTab || !risingStarsTab || !superstarsContent || !risingStarsContent) return;

    superstarsTab.addEventListener('click', () => {
        superstarsTab.classList.add('active');
        risingStarsTab.classList.remove('active');
        superstarsContent.style.display = 'grid';
        risingStarsContent.style.display = 'none';
    });

    risingStarsTab.addEventListener('click', () => {
        risingStarsTab.classList.add('active');
        superstarsTab.classList.remove('active');
        risingStarsContent.style.display = 'grid';
        superstarsContent.style.display = 'none';
    });
}

// Team Pages Logic
function setupTeamPages() {
    
    const divisions = {
        "Western Conference": ["Northwest", "Pacific", "Southwest"],
        "Eastern Conference": ["Atlantic", "Central", "Southeast"],
    };

    const teamsContainer = document.querySelector("#teams");
    const conferenceButtons = document.querySelectorAll(".conference-btn");
    const divisionContainer = document.querySelector("#divisions");
    let teamsData = [];

    // Fetch the teams data from the JSON file
    fetch("data/teams.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load teams data");
            }
            return response.json();
        })
        .then(data => {
            teamsData = data.data; 
            console.log("Teams data loaded:", teamsData);
        })
        .catch(error => console.error("Error loading teams data:", error));

    // Add event listeners to conference buttons
    conferenceButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedConference = button.dataset.conference;
            showDivisionsForConference(selectedConference);
        });
    });
    
    // Function to show divisions based on selected conference
    function showDivisionsForConference(conference) {
        // Clear current divisions
        divisionContainer.innerHTML = "";

        // Get the divisions for the selected conference
        const divisionsList = divisions[conference];
        if (divisionsList) {
            divisionsList.forEach(division => {
                const divisionButton = document.createElement("button");
                divisionButton.classList.add("division-btn");
                divisionButton.dataset.division = division;
                divisionButton.textContent = division;

                // Add event listener to division buttons
                divisionButton.addEventListener("click", () => {
                    filterTeamsByDivision(division);
                });

                divisionContainer.appendChild(divisionButton);
            });
        }
    }

    // Function to filter teams and display them based on selected division
    function filterTeamsByDivision(division) {
        // Clear the current teams display
        teamsContainer.innerHTML = "";

        // Filter teams based on the selected division
        const filteredTeams = teamsData.filter(team => team.division === division);

        // Display the filtered teams
        if (filteredTeams.length > 0) {
            filteredTeams.forEach(team => {
                const teamElement = document.createElement("a");
                teamElement.classList.add("team-box");
                teamElement.href = team.homepage || "#";
                teamElement.target = "_blank";

                teamElement.innerHTML = `
                    <div class="team-logo">
                        <img src="${team.logo_url}" alt="${team.full_name} Logo" />
                    </div>
                    <div class="team-details">
                        <h3>Name: ${team.full_name} (${team.abbreviation})</h3>
                        <p>City: ${team.city}</p>
                        <p>Conference: ${team.conference}</p>
                        <p>Division: ${team.division}</p>
                    </div>
                `;

                teamsContainer.appendChild(teamElement);
            });
        } else {
            teamsContainer.innerHTML = `<p class="placeholder-text">No teams found in this division.</p>`;
        }
    }
}
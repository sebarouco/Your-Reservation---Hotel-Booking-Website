// ==========================================
// HOTEL BOOKING WEBSITE - JAVASCRIPT FUNCTIONALITY
// ==========================================
// This file contains all interactive functionality for the hotel booking website
// Including search, property display, user interactions, and dynamic content loading

// ==========================================
// SAMPLE ROOM DATA
// ==========================================
// In a real application, this would come from an API
// For demo purposes, we're using static data
const sampleRooms = [
    {
        id: 1,
        name: 'Deluxe Ocean View',
        type: 'Deluxe',
        description: 'Spacious room with stunning ocean views, king-size bed, and luxury amenities.',
        price_per_night: 250,
        max_guests: 2,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Room Service'],
        rating: 8.9,
        reviews: 324,
        location: 'Miami Beach'
    },
    {
        id: 2,
        name: 'Standard Garden View',
        type: 'Standard',
        description: 'Comfortable room with garden views, perfect for budget-conscious travelers.',
        price_per_night: 120,
        max_guests: 2,
        image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Work Desk'],
        rating: 8.2,
        reviews: 156,
        location: 'Central Park'
    },
    {
        id: 3,
        name: 'Family Suite',
        type: 'Suite',
        description: 'Large suite with separate living area, perfect for families with children.',
        price_per_night: 350,
        max_guests: 4,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        amenities: ['WiFi', 'Air Conditioning', 'Kitchenette', 'Sofa Bed', 'Two Bedrooms'],
        rating: 9.1,
        reviews: 89,
        location: 'Times Square'
    },
    {
        id: 4,
        name: 'Single Room',
        type: 'Standard',
        description: 'Cozy single room with all essential amenities for solo travelers.',
        price_per_night: 80,
        max_guests: 1,
        image_url: 'https://images.unsplash.com/photo-1590490362328-cd4f789f6fd8?w=800',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Work Desk'],
        rating: 7.8,
        reviews: 203,
        location: 'Brooklyn'
    },
    {
        id: 5,
        name: 'Honeymoon Suite',
        type: 'Luxury',
        description: 'Romantic suite with jacuzzi, champagne service, and panoramic views.',
        price_per_night: 450,
        max_guests: 2,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        amenities: ['WiFi', 'Air Conditioning', 'Jacuzzi', 'Champagne Service', 'Balcony'],
        rating: 9.5,
        reviews: 67,
        location: 'Upper East Side'
    },
    {
        id: 6,
        name: 'Business Executive Room',
        type: 'Deluxe',
        description: 'Modern room designed for business travelers with workspace and premium amenities.',
        price_per_night: 180,
        max_guests: 2,
        image_url: 'https://images.unsplash.com/photo-1566665717773-06d27ec61bf8?w=800',
        amenities: ['WiFi', 'Work Desk', 'Air Conditioning', 'Mini Bar', 'Room Service'],
        rating: 8.7,
        reviews: 142,
        location: 'Financial District'
    }
];

// ==========================================
// PAGE INITIALIZATION
// ==========================================
// This function runs when the DOM is fully loaded
// It sets up initial content and event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProperties();  // Load initial properties
    setupEventListeners();       // Set up all event listeners
});

// ==========================================
// PROPERTY LOADING FUNCTIONS
// ==========================================

/**
 * Load featured properties on page load
 * Displays first 3 properties with loading animation
 */
function loadFeaturedProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    if (!propertiesGrid) return;

    // Show loading state while properties load
    propertiesGrid.innerHTML = '<div class="loading">Loading properties...</div>';

    // Simulate API call delay for realistic loading experience
    setTimeout(() => {
        const featuredRooms = sampleRooms.slice(0, 3);  // Get first 3 rooms
        propertiesGrid.innerHTML = featuredRooms.map(room => createPropertyCard(room)).join('');
    }, 1000);
}

/**
 * Create HTML for a property card
 * @param {Object} room - Room object with all property details
 * @returns {string} HTML string for the property card
 */
function createPropertyCard(room) {
    return `
        <div class="property-card">
            <div class="property-image">
                <img src="${room.image_url}" alt="${room.name}">
                <div class="property-badge">${room.type}</div>
                <button class="property-favorite" onclick="toggleFavorite(this)">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="property-content">
                <div class="property-header">
                    <div>
                        <h3 class="property-title">${room.name}</h3>
                        <div class="property-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${room.location}</span>
                        </div>
                        <div class="property-rating">
                            <div class="rating-stars">
                                <i class="fas fa-star"></i>
                                <span class="rating-score">${room.rating}</span>
                                <span class="rating-text">Excellent (${room.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div class="property-price">
                        <div class="price-amount">$${room.price_per_night}</div>
                        <div class="price-period">per night</div>
                    </div>
                </div>
                <p class="property-description">${room.description}</p>
                <div class="property-amenities">
                    ${room.amenities.slice(0, 3).map(amenity => 
                        `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                    ${room.amenities.length > 3 ? 
                        `<span class="amenity-tag">+${room.amenities.length - 3} more</span>` : ''
                    }
                </div>
                <div class="property-footer">
                    <div class="property-features">
                        <span><i class="fas fa-wifi"></i> Free WiFi</span>
                        <span><i class="fas fa-car"></i> Free Parking</span>
                    </div>
                    <button class="cta-button" onclick="bookRoom(${room.id})">Reserve Now</button>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================

/**
 * Set up all event listeners for the page
 * Includes mobile menu, date validation, and smooth scrolling
 */
function setupEventListeners() {
    // Mobile menu toggle (for responsive design)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Date input setup and validation
    setupDateInputs();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Header scroll effect
    setupHeaderScrollEffect();
}

/**
 * Set up date inputs with default values and validation
 * Ensures check-out is after check-in and sets minimum dates
 */
function setupDateInputs() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Set default dates: today and tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        checkInInput.valueAsDate = today;
        checkInInput.min = today.toISOString().split('T')[0];  // Can't select past dates
        
        checkOutInput.valueAsDate = tomorrow;
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        
        // Update checkout minimum date when checkin changes
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const minCheckOut = new Date(checkInDate);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            checkOutInput.min = minCheckOut.toISOString().split('T')[0];
            
            // If checkout is before or same as checkin, update it
            if (new Date(checkOutInput.value) <= checkInDate) {
                checkOutInput.valueAsDate = minCheckOut;
            }
        });
    }
}

/**
 * Set up smooth scrolling for anchor links
 * Provides smooth scrolling when clicking internal links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add shadow effect to header when scrolling
 * Provides visual feedback when user scrolls down the page
 */
function setupHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ==========================================
// USER INTERACTION FUNCTIONS
// ==========================================

/**
 * Toggle mobile menu visibility
 * In a real app, this would show/hide a mobile navigation menu
 */
function toggleMobileMenu() {
    // This would typically show/hide a mobile menu
    alert('Mobile menu would appear here - in a real app, this would show navigation options');
}

/**
 * Set destination from popular destination buttons
 * @param {string} destination - The destination to set in the search input
 */
function setDestination(destination) {
    const destinationInput = document.getElementById('destination');
    if (destinationInput) {
        destinationInput.value = destination;
        destinationInput.focus();  // Focus the input for user convenience
    }
}

/**
 * Main search function - filters properties based on search criteria
 * Validates form and displays search results
 */
function searchRooms() {
    const destination = document.getElementById('destination').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;

    // Form validation
    if (!destination) {
        alert('Please enter a destination');
        return;
    }

    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }

    // Log search criteria (in real app, this would be sent to API)
    console.log('Searching for:', {
        destination,
        checkIn,
        checkOut,
        guests
    });

    // Show loading state during search
    const propertiesGrid = document.getElementById('properties-grid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = '<div class="loading">Searching properties...</div>';
        
        // Simulate search delay
        setTimeout(() => {
            // Filter rooms based on search criteria
            let filteredRooms = sampleRooms;
            
            // Filter by destination (location or name)
            if (destination) {
                filteredRooms = filteredRooms.filter(room => 
                    room.location.toLowerCase().includes(destination.toLowerCase()) ||
                    room.name.toLowerCase().includes(destination.toLowerCase())
                );
            }
            
            // Filter by guest capacity
            if (guests) {
                filteredRooms = filteredRooms.filter(room => room.max_guests >= parseInt(guests));
            }
            
            // Display results
            if (filteredRooms.length === 0) {
                // No results found message
                propertiesGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                        <h3 style="color: white; font-size: 24px; margin-bottom: 16px;">No properties found</h3>
                        <p style="color: #B0B0B0; margin-bottom: 24px;">Try adjusting your search criteria</p>
                        <button class="cta-button" onclick="clearSearch()">Clear Search</button>
                    </div>
                `;
            } else {
                // Display filtered properties
                propertiesGrid.innerHTML = filteredRooms.map(room => createPropertyCard(room)).join('');
            }
        }, 1500);  // Simulate API delay
    }
}

/**
 * Clear search form and reset to featured properties
 */
function clearSearch() {
    // Reset form fields
    document.getElementById('destination').value = '';
    document.getElementById('check-in').valueAsDate = new Date();
    document.getElementById('check-out').valueAsDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    document.getElementById('guests').value = '2';
    
    // Load original featured properties
    loadFeaturedProperties();
}

/**
 * Toggle favorite status for a property
 * Changes heart icon from outline to filled
 * @param {HTMLElement} button - The favorite button element
 */
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        // Add to favorites
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.background = 'white';
    } else {
        // Remove from favorites
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.background = 'rgba(255, 255, 255, 0.9)';
    }
}

/**
 * Handle room booking
 * Shows booking confirmation with room details
 * @param {number} roomId - The ID of the room to book
 */
function bookRoom(roomId) {
    const room = sampleRooms.find(r => r.id === roomId);
    if (!room) return;

    // Get search criteria
    const destination = document.getElementById('destination').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;

    // Show booking confirmation (in real app, this would navigate to booking page)
    alert(`Booking ${room.name}!\n\n` +
          `Check-in: ${checkIn}\n` +
          `Check-out: ${checkOut}\n` +
          `Guests: ${guests}\n` +
          `Price: $${room.price_per_night}/night\n\n` +
          `In a real application, this would take you to a booking confirmation page.`);
}

/**
 * Load all properties instead of just featured ones
 */
function viewAllProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = '<div class="loading">Loading all properties...</div>';
        
        setTimeout(() => {
            // Display all sample rooms
            propertiesGrid.innerHTML = sampleRooms.map(room => createPropertyCard(room)).join('');
        }, 1000);
    }
}

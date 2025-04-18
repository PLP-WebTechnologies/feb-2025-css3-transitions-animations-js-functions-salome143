document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationBox = document.getElementById('animation-box');
    const animationSelect = document.getElementById('animation-select');
    const durationInput = document.getElementById('duration');
    const applyBtn = document.getElementById('apply-btn');
    const saveBtn = document.getElementById('save-btn');
    const resetBtn = document.getElementById('reset-btn');
    const visitCount = document.getElementById('visit-count');

    // Load saved preferences from localStorage
    function loadPreferences() {
        const savedAnimation = localStorage.getItem('animationPreference');
        const savedDuration = localStorage.getItem('animationDuration');
        
        if (savedAnimation) {
            animationSelect.value = savedAnimation;
        }
        
        if (savedDuration) {
            durationInput.value = savedDuration;
        }
        
        applyAnimation();
    }

    // Update visit count
    function updateVisitCount() {
        let count = localStorage.getItem('visitCount') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('visitCount', count);
        visitCount.textContent = count;
    }

    // Apply the selected animation
    function applyAnimation() {
        // Remove all animation classes first
        animationBox.classList.remove('bounce', 'spin', 'color-change', 'slide');
        
        // Get selected values
        const selectedAnimation = animationSelect.value;
        const duration = durationInput.value;
        
        // Apply the selected animation
        animationBox.style.setProperty('--duration', `${duration}s`);
        animationBox.classList.add(selectedAnimation);
    }

    // Reset animation
    function resetAnimation() {
        animationBox.classList.remove('bounce', 'spin', 'color-change', 'slide');
        animationBox.style.animation = 'none';
    }

    // Event Listeners
    applyBtn.addEventListener('click', applyAnimation);
    
    saveBtn.addEventListener('click', function() {
        localStorage.setItem('animationPreference', animationSelect.value);
        localStorage.setItem('animationDuration', durationInput.value);
        alert('Preferences saved! They will be loaded next time you visit.');
    });
    
    resetBtn.addEventListener('click', function() {
        resetAnimation();
        localStorage.removeItem('animationPreference');
        localStorage.removeItem('animationDuration');
        animationSelect.value = 'bounce';
        durationInput.value = '2';
    });

    // Initialize
    loadPreferences();
    updateVisitCount();
});
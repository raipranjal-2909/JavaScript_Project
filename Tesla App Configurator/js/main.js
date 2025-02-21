const topBar = document.querySelector('#top-bar');
const exteriorColorSelection = document.querySelector('#exterior-buttons')
const interiorColorSelection = document.querySelector('#interior-buttons')
const exteriorImage = document.querySelector('#exterior-image')
const interiorImage = document.querySelector('#interior-image')
const wheelButtonsSection = document.querySelector('#wheel-buttons')
const performanceBtn = document.querySelector('#performance-btn')
const totalPriceElement = document.querySelector('#total-price')
const fullSelfDrivingCheckbox = document.querySelector('#full-self-driving-checkbox')
const accessoryCheckbox = document.querySelectorAll('.accessory-form-checkbox')
const downPaymentElement = document.querySelector('#down-payment')
const monthlyPaymentElement = document.querySelector('#monthly-payment')

const basePrice = 52490;
let currentPrice = basePrice;

let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving':false,
};

const pricing = {
    'Performance Wheels' : 2500,
    'Performance Package' : 5000,
    'Full Self-Driving' : 8500,
    'Accessories' : {
        'Center Console Trays' : 35,
        'Sunshade' : 105,
        'All-Weather Interior Liners' : 225,
    }
}

// Image Mapping
const exteriorImages = {
    'Stealth Grey': './images/model-y-stealth-grey.jpg',
    'Pearl White': './images/model-y-pearl-white.jpg',
    'Deep Blue': './images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './images/model-y-solid-black.jpg',
    'Ultra Red': './images/model-y-ultra-red.jpg',
    'Quick Silver': './images/model-y-quicksilver.jpg',
  };
  
  const interiorImages = {
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',
  };

// Update total price in UI
const updateTotalPrice = () => {
        // Reset the current price to base price 
        currentPrice = basePrice;

        // Performance Wheel pricing
        if(selectedOptions['Performance Wheels']){
            currentPrice += pricing['Performance Wheels'];
        }
        
        // Performance Package pricing 
        if(selectedOptions['Performance Package']){
            currentPrice += pricing['Performance Package'];
        }

        // Full Self-Driving Package
        if(selectedOptions['Full Self-Driving']){
            currentPrice += pricing['Full Self-Driving'];
        }

        // Accessory Chexkboxes
        accessoryCheckbox.forEach((checkbox) =>{
            // Extract the accesory label
            const accessoryLabel = checkbox.closest('label').querySelector('span').textContent.trim();

            const accessoryPrice = pricing['Accessories'][accessoryLabel];
            
            // Add to current price if accessory is selected
            if (checkbox.checked) {
                currentPrice += accessoryPrice;
            }
        }); 

        // Update the total Price in UI
        totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;  
        
        updatePaymentBreakdown();
}

// update payment based on current price 
const updatePaymentBreakdown = () => {
    // Calculate Down Payment 
    const downpayment = currentPrice * 0.1;
    downPaymentElement.textContent = `$${downpayment.toLocaleString()}`;

    // calculate loan details (assuming 60-month loan and 3% interest)
    const loanTermMonths = 60;
    const interestRate = 0.03;

    const loanAmount = currentPrice - downpayment;

    // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
    const monthlyInterestRate = interestRate/12;

    const monthlyPayment = (loanAmount * (monthlyInterestRate*Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1+monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;
}

// Handle Top Bar on Scroll

const handleScroll = () =>{
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar',atTop);
    topBar.classList.toggle('hidden-bar',!atTop);
};

// Handle Color Selection
const handleColorButtonClick = (event) => {
    let button;
  
    if (event.target.tagName === 'IMG') {
      button = event.target.closest('button');
    } else if (event.target.tagName === 'BUTTON') {
      button = event.target;
    }
  
    if (button) {
      const buttons = event.currentTarget.querySelectorAll('button');
      buttons.forEach((btn) => btn.classList.remove('btn-selected'));
      button.classList.add('btn-selected');


    //   Change Exterior Color
      if (event.currentTarget === exteriorColorSelection){
        selectedColor = button.querySelector('img').alt;
        updateExteriorImage();
      }

      //   Change Interior Color
      if (event.currentTarget === interiorColorSelection){
        const color = button.querySelector('img').alt;
        interiorImage.src = interiorImages[color];
      }
    }
};

// Update exterior image based on color and wheels
const updateExteriorImage = () =>{
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
};

// Wheel Selection
const handleWheelButtonCLick = (event) => {
    if(event.target.tagName === 'BUTTON'){
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700','text-white'));

        // Add Selected Styles to clicked button
        event.target.classList.add('bg-gray-700','text-white');

        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

        updateExteriorImage();

        updateTotalPrice();
    }
}

// Performance Package Selection
const handlePerfrmanceButtonClick = () => {
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');

    // Update Selected Options
    selectedOptions['Performance Package'] = isSelected;

    updateTotalPrice();
}

// Full Self Driving Selection
const fullSelfDrivingChange = () => {
    selectedOptions['Full Self-Driving'] = fullSelfDrivingCheckbox.checked;
    updateTotalPrice();
 }

//  Handle Accessory Checkbox Listeners
accessoryCheckbox.forEach((checkbox) =>{
    checkbox.addEventListener('change',()=>updateTotalPrice())
})

// Initial Update total price
updateTotalPrice(); 

// Event Listener

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener('click', handleColorButtonClick);
interiorColorSelection.addEventListener('click', handleColorButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonCLick);
performanceBtn.addEventListener('click', handlePerfrmanceButtonClick);
fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange);
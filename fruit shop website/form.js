
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.Form');
    const productInput = document.querySelector('#product');
    const ratingSelect = document.querySelector('#rating');
    const commentsTextarea = document.querySelector('#comments');
    const submitButton = document.querySelector('.feedbackButton');

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        
        productInput.style.borderColor = 'rgb(255, 140, 140)';
        ratingSelect.style.borderColor = 'rgb(255, 140, 140)';
        commentsTextarea.style.borderColor = 'rgb(255, 140, 140)';
    }

    function showError(input, message) {
        clearErrors();
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = `
            color: red;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
        `;
        input.style.borderColor = 'red';
        
        input.parentNode.insertBefore(error, input.nextSibling);
        
        input.focus();
    }

    function validateField(input, value) {
        if (!value.trim()) {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input === commentsTextarea && value.trim().length < 10) {
            showError(input, 'Comments must be at least 10 characters');
            return false;
        }
        
        return true;
    }


    function validateForm() {
        const productValue = productInput.value.trim();
        const ratingValue = ratingSelect.value;
        const commentsValue = commentsTextarea.value.trim();
        
        let isValid = true;
        
   
        if (!productValue) {
            showError(productInput, 'Please enter a product name');
            isValid = false;
        }
        
   
        if (!ratingValue) {
            showError(ratingSelect, 'Please select a rating');
            isValid = false;
        }
        
  
        if (!commentsValue) {
            showError(commentsTextarea, 'Please enter comments');
            isValid = false;
        } else if (commentsValue.length < 10) {
            showError(commentsTextarea, 'Comments must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitButton.disabled = true;
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            
     
            const formData = {
                product: productInput.value,
                rating: ratingSelect.value,
                comments: commentsTextarea.value,
                timestamp: new Date().toISOString()
            };
            
            console.log('Form submitted:', formData);
            

            setTimeout(function() {
                alert('Thank you for your feedback! Your response has been recorded.');
                form.reset();
                clearErrors();
                
     
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        }
    });


    productInput.addEventListener('blur', function() {
        validateField(this, this.value);
    });
    
    ratingSelect.addEventListener('change', function() {
        clearErrors();
    });
    
    commentsTextarea.addEventListener('blur', function() {
        validateField(this, this.value);
    });

    productInput.addEventListener('input', clearErrors);
    commentsTextarea.addEventListener('input', clearErrors);

    const inputs = [productInput, ratingSelect, commentsTextarea];
    inputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        input.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.421)';
        });
    });

    submitButton.addEventListener('mouseenter', function() {
        if (!this.disabled) {
            this.style.backgroundColor = '#000000';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.2s ease';
        }
    });
    
    submitButton.addEventListener('mouseleave', function() {
        if (!this.disabled) {
            this.style.backgroundColor = '#ff6a45f0';
            this.style.transform = 'scale(1)';
        }
    });
});
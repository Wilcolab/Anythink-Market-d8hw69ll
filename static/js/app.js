document.addEventListener("DOMContentLoaded", function () {
  // File input preview and auto-submit
  const fileInput = document.getElementById("image-upload");
  const previewContainer = document.getElementById("preview-container");
  const uploadForm = document.querySelector("form[action='/upload']");
  const loadingIndicator = document.querySelector(".loading");

  if (fileInput && uploadForm) {
    fileInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        // Show loading indicator
        if (loadingIndicator) {
          loadingIndicator.style.display = "flex";
        }

        // Show image preview
        if (previewContainer) {
          previewContainer.innerHTML = "";
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "preview-image";
            previewContainer.appendChild(img);
            
            // Auto-submit the form after preview is loaded
            uploadForm.submit();
          };

          reader.readAsDataURL(this.files[0]);
        } else {
          // If no preview container, submit immediately
          uploadForm.submit();
        }
      }
    });
  }

  // Filter selection
  const filterOptions = document.querySelectorAll(".filter-option");
  const filterInput = document.getElementById("selected-filter");

  if (filterOptions.length && filterInput) {
    filterOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        filterOptions.forEach((opt) => opt.classList.remove("active"));

        // Add active class to selected option
        this.classList.add("active");

        // Update hidden input value
        filterInput.value = this.dataset.filter;
      });
    });
  }

  // Form submission loading indicator
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const loadingEl = this.querySelector(".loading");

      if (loadingEl) {
        loadingEl.style.display = "flex";
      }
    });
  });
});

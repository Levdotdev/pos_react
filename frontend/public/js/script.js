document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const themeToggle = document.getElementById("theme-toggle");
    const logoutBtn = document.getElementById("logout-btn");
    const body = document.body;
    const navItems = document.querySelectorAll("#sidebar li[data-section]");
    const contentSections = document.querySelectorAll(".content-section");
    const pageTitleElement = document.querySelector(".page-title");
    const themeIcon = themeToggle.querySelector("i");

    sidebarToggle.addEventListener("click", () => {
        if (window.innerWidth > 768) {
            sidebar.classList.toggle("collapsed");
        } else {
            sidebar.classList.toggle("visible");
        }
    });

    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "light-mode");
        }
    }

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark-mode") {
        applyTheme(true);
    } else {
        body.classList.add("light-mode");
    }

    themeToggle.addEventListener("click", () => {
        const isCurrentlyDark = body.classList.contains("dark-mode");
        applyTheme(!isCurrentlyDark);
    });

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetSectionId = item.getAttribute("data-section");

            navItems.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");

            contentSections.forEach((section) => section.classList.remove("active"));
            
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add("active");

                const newTitle = targetSection.querySelector("h2") ? 
                                 targetSection.querySelector("h2").textContent.trim() : 
                                 'Dashboard';
                pageTitleElement.textContent = newTitle;
            }

            if (window.innerWidth <= 768) {
                sidebar.classList.remove("visible");
            }
        });
    });

    const activeSection = document.querySelector(".content-section.active");
    if (activeSection && activeSection.querySelector("h2")) {
        pageTitleElement.textContent = activeSection.querySelector("h2").textContent.trim();
    }

    logoutBtn.addEventListener("click", () => {
        alert("Logging out of TechStore Admin System. Thank you for your service!");
    });
});

function handleCrudAction(action) {
    alert(`[${action}]: Action triggered! A modal form for input/editing would typically open here.`);
}

function confirmDelete() {
    if (confirm("CONFIRM: Are you sure you want to DELETE this record? This action cannot be undone.")) {
        handleCrudAction("DELETE");
    }
}

function openAddProductModal() {
  const overlay = document.getElementById('addProductOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  // trap focus (simple)
  setTimeout(() => {
    const first = overlay.querySelector('input,select,button,textarea');
    if (first) first.focus();
  }, 50);
}
function closeAddProductModal() {
  const overlay = document.getElementById('addProductOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
}

/* Toast & modal alert system */
(function(){
  const form = document.getElementById('addProductForm');
  const modalAlertContainer = document.getElementById('modal-alert-container');
  const toastContainer = document.getElementById('toast-container');
  const notifSound = document.getElementById('notifSound');

  function playSound(){
    if(!notifSound) return;
    try{ notifSound.currentTime = 0; notifSound.play(); }catch(e){}
  }

  function showModalAlert(message, type='info') {
    const div = document.createElement('div');
    div.className = 'modal-alert ' + (type === 'success' ? 'alert-success' : (type==='error' ? 'alert-error' : 'alert-info'));
    const icon = type==='success' ? 'fa-check-circle' : (type==='error' ? 'fa-times-circle' : 'fa-info-circle');
    div.innerHTML = `<i class="fas ${icon}" style="font-size:18px"></i><div>${message}</div>`;
    modalAlertContainer.innerHTML = '';
    modalAlertContainer.appendChild(div);
    playSound();
    setTimeout(()=>{ if(modalAlertContainer.contains(div)) modalAlertContainer.removeChild(div); }, 4500);
  }

  function createToast(message, type='info') {
    playSound();
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type==='success' ? 'toast-success' : (type==='error' ? 'toast-error' : 'toast-info'));
    toast.innerHTML = `
      <div class="left"><i class="fas ${type==='success' ? 'fa-check-circle' : (type==='error' ? 'fa-times-circle' : 'fa-info-circle')}" style="font-size:18px"></i><div>${message}</div></div>
      <button class="close-toast" aria-label="Close">&times;</button>
    `;
    toastContainer.appendChild(toast);
    const remove = ()=>{
      if(!toast.parentElement) return;
      toast.style.transition = 'opacity .2s, transform .2s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
      setTimeout(()=> toast.remove(), 220);
    };
    toast.querySelector('.close-toast').addEventListener('click', remove);
    // auto remove
    setTimeout(()=> {
      toast.style.animation = 'none';
      remove();
    }, 4200);
  }

  // Form submission (demo: shows toast + closes modal)
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // Basic validation (already required attributes will help)
      const name = (form.product_name?.value || '').trim();
      if(!name){
        showModalAlert('Please provide a product name.', 'error');
        return;
      }
      // Simulate save success
      closeAddProductModal();
      createToast('Product successfully added!', 'success');
      // reset form
      form.reset();
    });
  }

  // close on overlay click (but not when clicking card)
  const overlay = document.getElementById('addProductOverlay');
  if(overlay){
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeAddProductModal();
    });
  }

  // keyboard ESC to close
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const overlay = document.getElementById('addProductOverlay');
      if(overlay && overlay.classList.contains('open')) closeAddProductModal();
    }
  });

  // expose utilities (optional)
  window.showToast = createToast;
  window.showModalAlert = showModalAlert;
})();

document.getElementById("product_id").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
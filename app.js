// ==================== APP INIT ====================
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
});


// ==================== COMPONENT LOADER ====================
async function loadComponents() {
    try {
        const drawerHTML = await fetch('components/contact-drawer.html').then(r => r.text());
        console.log("drawer loaded:", drawerHTML);
        document.getElementById('drawer-container').innerHTML = drawerHTML;

        // wait 1 tick so DOM actually updates
        requestAnimationFrame(() => {
            initDrawer();
        });

    } catch (err) {
        console.error("Component loading failed:", err);
    }
}


// ==================== DRAWER LOGIC ====================
function initDrawer() {
    const drawer = document.getElementById('contact-drawer');
    const backdrop = document.getElementById('drawer-backdrop');

    if (!drawer || !backdrop) {
        console.warn('Drawer not found');
        return;
    }

    function openDrawer() {
        drawer.classList.remove('hidden');

        setTimeout(() => {
            const panel = drawer.querySelector('.absolute.right-0');
            if (panel) panel.classList.remove('translate-x-full');

            backdrop.classList.add('opacity-100');
        }, 10);
    }

    function closeDrawer() {
        const panel = drawer.querySelector('.absolute.right-0');
        if (panel) panel.classList.add('translate-x-full');

        backdrop.classList.remove('opacity-100');

        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 500);
    }

    // 🔥 EVENT DELEGATION (THIS FIXES YOUR PROBLEM)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#open-contact-drawer')) {
            openDrawer();
        }

        if (e.target.closest('#close-drawer') || e.target === backdrop) {
            closeDrawer();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
            closeDrawer();
        }
    });
}
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}
// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Aktif menü öğesi
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Back to top butonu
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Sayfa scroll olduğunda göster/gizle
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Tıklandığında sayfanın başına git
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 
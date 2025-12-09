const sections = document.querySelectorAll('.info-box');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 130,
            behavior: 'smooth'
        });
    });
});

const accardions = document.querySelectorAll('.accordion-item');

accardions.forEach(item => {
    const btn = item.querySelector('.accordion-btn');

    btn.addEventListener('click', () => {
        accardions.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
            }
        })

        item.classList.toggle('active');
    })
})

const boxes = document.querySelectorAll('.info-box');

function showBoxesOnScroll () {
    const trigerBottom = window.innerHeight * 0.85;

    boxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < trigerBottom) {
            setTimeout(() => {
                box.classList.add('show');
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', showBoxesOnScroll);
window.addEventListener('load', showBoxesOnScroll);

const searchInput = document.querySelector('.search-container input');
const searchBtn = document.querySelector('.search-btn');
const safeOutput = document.getElementById('safe-output');
const sandbox = document.getElementById('xss-sandbox');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const isXSS = /<script|onerror|img|svg|onload|javascript:/i.test(query);

    if (isXSS) {
        safeOutput.textContent = query;

        const iframeDoc = sandbox.contentDocument || sandbox.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
            <html>
            <body>
                ${query}
            </body>
            </html>
        `);
        iframeDoc.close();

        window.scrollTo({
            top: document.querySelector('.xss-tester').offsetTop - 100,
            behavior: 'smooth'
        });

        return;
    }

    let found = false;

    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2')?.textContent.toLowerCase();
        const sectionId = section.getAttribute('id').toLowerCase();

        if (sectionTitle.includes(query.toLowerCase()) || sectionId.includes(query.toLowerCase())) {
            found = true;
            window.scrollTo({
                top: section.offsetTop - 130,
                behavior: 'smooth'
            });
        }
    });

    if (!found) {
        alert('Совпадений не найдено');
    }
});
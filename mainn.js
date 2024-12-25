 
    // Ambil kontainer untuk menampilkan konten
    const container = document.getElementById('content-container');
    
    // Fungsi untuk memuat data JSON
    async function loadJSON() {
        try {
            const response = await fetch('data.json'); // Ambil data dari file JSON
            const jsonData = await response.json();   // Parsing JSON
            renderContent(jsonData);                 // Panggil fungsi untuk render data
        } catch (error) {
            console.error("Gagal memuat data JSON:", error);
        }
    }
    
    // Fungsi untuk menampilkan data ke HTML
    function renderContent(jsonData) {
        const sliderContent = document.createElement('div');
        sliderContent.className = 'slider-content';  // Mengelompokkan semua konten
        let currentIndex = 1; // Mulai dari indeks 1 karena elemen tambahan di awal dan akhir
    
        // Duplikasi elemen pertama dan terakhir untuk efek loop
        const firstItem = { ...jsonData[0] };
        const lastItem = { ...jsonData[jsonData.length - 1] };
        jsonData.unshift(lastItem); // Tambahkan elemen terakhir di awal
        jsonData.push(firstItem);   // Tambahkan elemen pertama di akhir
    
        jsonData.forEach(item => {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
    
            contentDiv.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="Image">
                </div>
                <p class="text">${item.text}</p>
            `;
    
            sliderContent.appendChild(contentDiv);
        });
    
        // Tambahkan elemen slider ke dalam container
        container.appendChild(sliderContent);
    
        // Set posisi awal untuk efek loop
        const slideWidth = sliderContent.firstElementChild.offsetWidth;
        sliderContent.style.transform = `translateX(-${slideWidth}px)`;
    
        // Tambahkan kontrol untuk slider
        addSliderControls(sliderContent, jsonData.length, currentIndex, slideWidth);
    }
    
    // Fungsi untuk menambahkan kontrol ke slider (Next, Previous)
    function addSliderControls(sliderContent, slideCount, currentIndex, slideWidth) {
        const prevBtn = document.createElement('button');
        prevBtn.innerText = 'Previous';
        prevBtn.classList.add('slider-btn', 'prev');
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            moveSlider(sliderContent, currentIndex, slideCount, slideWidth, 'prev');
        });
    
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.classList.add('slider-btn', 'next');
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            moveSlider(sliderContent, currentIndex, slideCount, slideWidth, 'next');
        });
    
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
    }
    
    // Fungsi untuk menggerakkan slider
    function moveSlider(sliderContent, currentIndex, slideCount, slideWidth, direction) {
        sliderContent.style.transition = 'transform 0.5s ease';
        sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
        sliderContent.addEventListener('transitionend', () => {
            if (currentIndex === 0) {
                // Jika di slide tambahan awal, lompat ke slide terakhir
                sliderContent.style.transition = 'none';
                currentIndex = slideCount - 2;
                sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            } else if (currentIndex === slideCount - 1) {
                // Jika di slide tambahan akhir, lompat ke slide pertama
                sliderContent.style.transition = 'none';
                currentIndex = 1;
                sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }
        });
    }
    
    // Panggil fungsi untuk memuat data JSON
    loadJSON();
    
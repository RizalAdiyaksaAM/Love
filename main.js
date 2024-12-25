
AOS.init({
    disable: function () {
      var maxWidth = 800;
      return window.innerWidth < maxWidth;
    },
    duration: 1800,
    easing: "ease-in-out", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom",
  });
  
  onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};



function goFlower() {
  window.location.href = "flower.html"; // Arahkan ke halaman lain
}


// Fungsi untuk memuat JSON menggunakan async/await
async function loadJSON() {
    try {
        const response = await fetch('data.json'); // Ambil data dari file JSON
        const jsonData = await response.json();   // Parsing JSON
        renderContent(jsonData);                  // Panggil fungsi untuk render data
    } catch (error) {
        console.error("Gagal memuat data JSON:", error);
    }
}

// Fungsi untuk merender konten dari JSON
function renderContent(jsonData) {
    const swiperWrapper = document.querySelector('.swiper-wrapper'); // Ambil elemen swiper-wrapper

    // Loop data JSON untuk membuat slide
    jsonData.forEach(item => {
        const slideDiv = document.createElement('div'); // Buat elemen slide
        slideDiv.className = 'swiper-slide'; // Tambahkan class swiper-slide

        // Tambahkan konten gambar dan teks
        slideDiv.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="Image">
            </div>
            <p class="text">${item.text}</p>
        `;

        // Tambahkan slide ke dalam swiper-wrapper
        swiperWrapper.appendChild(slideDiv);
    });

    // Inisialisasi Swiper setelah slide selesai dimuat
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

// Panggil fungsi untuk memuat JSON ketika DOM selesai dimuat
document.addEventListener("DOMContentLoaded", loadJSON);

  

function gamau(id) {
  var mau = document.getElementById("btn_mau");
  var i = Math.floor(Math.random() * 300) + 1;
  var j = Math.floor(Math.random() * 100) + mau.offsetTop;
  id.style.left = i + "px";
  id.style.top = j + "px";
}

function goHome() {
  window.location.href = "home.html"; // Arahkan ke halaman home
}

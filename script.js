document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError')
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');
  // KODE LOGIKA BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('backToTop');

  // Menampilkan tombol saat pengguna men-scroll ke bawah sejauh 300 pixel
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Efek kembali ke atas secara halus (smooth scroll) saat tombol diklik
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Fungsi untuk menghilangkan error saat user mulai mengetik
  const clearError = (inputElement, errorElement) => {
    inputElement.addEventListener('input', function() {
      inputElement.classList.remove('input-error');
      errorElement.textContent = '';
    });
  };

  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(phoneInput, phoneError);
  clearError(messageInput, messageError);

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman

    let isValid = true;
    
    // Sembunyikan pesan sukses setiap kali tombol ditekan
    successMessage.style.display = 'none';

    // Validasi Nama
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Kolom nama tidak boleh dibiarkan kosong.';
      nameInput.classList.add('input-error');
      isValid = false;
    }

    // Validasi No. WhatsApp
    const phoneValue = phoneInput.value.trim();
    if (phoneValue === '') {
      phoneError.textContent = 'Kolom no. WhatsApp tidak boleh kosong.';
      phoneInput.classList.add('input-error');
      isValid = false;
    }

    // Validasi Email
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      emailError.textContent = 'Kolom email tidak boleh kosong.';
      emailInput.classList.add('input-error');
      isValid = false;
    } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
      emailError.textContent = 'Email harus mengandung karakter "@" dan titik (".").';
      emailInput.classList.add('input-error');
      isValid = false;
    }

    // Validasi Pesan
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Kolom pesan tidak boleh dibiarkan kosong.';
      messageInput.classList.add('input-error');
      isValid = false;
    }

    // Jika semua validasi terpenuhi
    if (isValid) {
      // Ambil semua nilai dari kolom form
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = messageInput.value.trim();

      // Susun format pesan yang akan dikirim ke WhatsApp
      // Simbol \n digunakan untuk membuat baris baru (enter), dan * untuk text bold di WA
      const waText = `Halo tim Pancake Durian Roll, saya ingin memesan/bertanya:\n\n*Nama:* ${name}\n*Email:* ${email}\n*No. HP/WA:* ${phone}\n*Pesan:*\n${message}`;

      // Tentukan nomor WhatsApp tujuan (gunakan format 62 tanpa tanda +, spasi, atau strip)
      const waTargetNumber = "6285126635966";

      // Buat URL WhatsApp dengan teks yang sudah di-encode
      const waURL = `https://wa.me/${waTargetNumber}?text=${encodeURIComponent(waText)}`;

      // Buka tab baru yang mengarah ke WhatsApp
      window.open(waURL, '_blank');

      // Tampilkan pesan sukses di halaman website Anda
      successMessage.style.display = 'block';
      
      // Kosongkan kembali seluruh kolom form
      form.reset();
    }
  });

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  // Menampilkan/menyembunyikan menu saat tombol hamburger diklik
  hamburgerBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // (Opsional) Menutup menu secara otomatis saat salah satu link diklik
  const navLinks = document.querySelectorAll('#navMenu ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
});
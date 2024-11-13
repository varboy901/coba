const puppeteer = require('puppeteer');

async function startBot() {
  const browser = await puppeteer.launch({
    headless: false, // Menampilkan browser
    slowMo: 50, // Memberikan waktu ekstra untuk melihat aksi di browser
  });

  const page = await browser.newPage();

  try {
    // Pergi ke halaman pendaftaran
    await page.goto('https://app.nodepay.ai/register', { waitUntil: 'domcontentloaded' });

    // Tunggu halaman sepenuhnya dimuat
    await page.waitForSelector('input[name="email"]', { timeout: 60000 });

    console.log('Email input ditemukan');

    // Isi email secara otomatis
    await page.type('input[name="email"]', 'example' + Date.now() + '@gmail.com');
    console.log('Email berhasil dimasukkan');

    // Isi username
    await page.type('input[name="username"]', 'user' + Date.now());
    console.log('Username berhasil dimasukkan');

    // Isi password dan konfirmasi password
    await page.type('input[name="password"]', 'Password123!');
    await page.type('input[name="confirmPassword"]', 'Password123!');
    console.log('Password berhasil dimasukkan');

    // Isi kode referral
    await page.type('input[name="referralCode"]', 'UNdo7u6fdS6icE3');
    console.log('Referral code berhasil dimasukkan');

    // Centang checkbox "I have read and agree to Terms and Privacy Policy"
    await page.click('input[type="checkbox"]');
    console.log('Checkbox berhasil dicentang');

    // Kirim form
    await page.click('button[type="submit"]');
    console.log('Form pendaftaran berhasil dikirim');

    // Tunggu beberapa saat untuk melihat hasilnya
    await page.waitForTimeout(5000); // Tunggu 5 detik setelah submit

    // Jika perlu, login setelahnya
    // Logika login dapat ditambahkan di sini jika diperlukan
    
  } catch (err) {
    console.error('Error saat membuat akun:', err);
  } finally {
    await browser.close(); // Tutup browser setelah selesai
  }
}

startBot();

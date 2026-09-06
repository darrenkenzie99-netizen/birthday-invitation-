/* =========================================================
   A SPECIAL CHAPTER — JavaScript
   Semua interaksi website ada di file ini.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const opening = document.getElementById("opening");
  const envelope = document.querySelector(".envelope");
  const openInvitation = document.getElementById("openInvitation");
  const mainContent = document.getElementById("mainContent");
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const musicToggle = document.getElementById("musicToggle");
  const birthdayMusic = document.getElementById("birthdayMusic");
  const surpriseCard = document.getElementById("surpriseCard");
  const particles = document.getElementById("particles");
  const rsvpForm = document.getElementById("rsvpForm");
  const formMessage = document.getElementById("formMessage");

  document.body.classList.add("locked");

  /* Opening invitation + envelope animation */
  openInvitation.addEventListener("click", () => {
    if (envelope.classList.contains("is-open")) return;

    envelope.classList.add("is-open");
    openInvitation.disabled = true;

    window.setTimeout(() => {
      opening.classList.add("is-closing");
      mainContent.classList.remove("hidden");
      document.body.classList.remove("locked");

      window.setTimeout(() => {
        opening.remove();
        document.querySelectorAll(".reveal, .reveal-scale").forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("is-visible");
          }
        });
      }, 850);
    }, 1200);
  });

  /* Navbar changes on scroll */
  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  /* Mobile navigation */
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Scroll reveal with Intersection Observer */
  const revealElements = document.querySelectorAll(".reveal, .reveal-scale");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  /* Countdown
     Mudah diganti: cukup ubah tanggal di bawah. */
  const targetDate = new Date("2026-09-12T16:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdownGrid = document.getElementById("countdown");
  const countdownDone = document.getElementById("countdownDone");

  const pad = value => String(value).padStart(2, "0");

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownGrid.classList.add("hidden");
      countdownDone.classList.remove("hidden");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  /* Surprise flip + subtle particles */
  surpriseCard.addEventListener("click", () => {
    const isOpen = surpriseCard.classList.toggle("is-open");

    if (!isOpen) return;

    const particleCount = window.innerWidth < 600 ? 18 : 28;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";

      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 90 + Math.random() * 170;

      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

      particles.appendChild(particle);

      window.setTimeout(() => particle.remove(), 1200);
    }
  });

  /* Music toggle — browser only starts audio after user interaction */
  musicToggle.addEventListener("click", async () => {
    if (birthdayMusic.paused) {
      try {
        await birthdayMusic.play();
        musicToggle.classList.add("is-playing");
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute("aria-label", "Matikan musik");
      } catch (error) {
        console.warn("Audio belum bisa diputar:", error);
      }
    } else {
      birthdayMusic.pause();
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.setAttribute("aria-label", "Nyalakan musik");
    }
  });

  /* RSVP frontend validation */
  rsvpForm.addEventListener("submit", event => {
    event.preventDefault();

    const nameInput = document.getElementById("guestName");
    const attendance = rsvpForm.querySelector('input[name="attendance"]:checked');
    const name = nameInput.value.trim();

    if (!name) {
      formMessage.classList.remove("hidden");
      formMessage.textContent = "Please enter your name first.";
      nameInput.focus();
      return;
    }

    if (!attendance) {
      formMessage.classList.remove("hidden");
      formMessage.textContent = "Please choose your attendance.";
      return;
    }

    formMessage.classList.remove("hidden");
    formMessage.innerHTML = "<strong>THANK YOU!</strong><br>Your response has been received. See you at the celebration.";

    rsvpForm.querySelector("button[type='submit']").disabled = true;
  });

  /* Tiny parallax effect for oversized hero typography */
  const heroYear = document.querySelector(".hero__year");

  window.addEventListener("scroll", () => {
    if (!heroYear) return;

    const offset = Math.min(window.scrollY * 0.12, 80);
    heroYear.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
  }, { passive: true });
});



// Pengiriman Data RSVP ke Google Sheets
const rsvpForm = document.querySelector('form');

// Link Aplikasi Web Google Apps Script kamu
const scriptURL = 'https://script.google.com/macros/s/AKfycby1YDUrg9Sg_kzaKC5WADQ-OCULPZKRopFxGEuiNHSntb9v1lHVuXCbfLMKi3MRLcjU/exec';

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // Mengambil data input dari formulir RSVP
  const nameInput = document.querySelector('input[type="text"]').value;
  const attendanceInput = document.querySelector('input[name="attendance"]:checked') 
                          ? document.querySelector('input[name="attendance"]:checked').value 
                          : 'Hadir';

  // Mengirim data ke Google Sheets
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({
      name: nameInput,
      attendance: attendanceInput
    })
  })
  .then(response => {
    alert('Terima kasih! RSVP kamu berhasil terkirim.');
    rsvpForm.reset(); // Mengosongkan isian form kembali
  })
  .catch(error => {
    alert('Gagal mengirim RSVP, silakan coba lagi.');
    console.error('Error!', error.message);
  });
});
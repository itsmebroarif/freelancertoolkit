<template>
  <div class="container" data-aos="fade-up" data-aos-delay="100">
    <h1 class="display-5 mb-3 fw-bold">Daily Activity Dashboard</h1>
    <hr width="450" />
    <p class="lead">Silahkan gunakan sesuka kamu ya!</p>
    <!-- 3 Cards -->
    <div class="row g-4 mb-4">
      <!-- Card: Time & Date -->
      <div class="col-md-4">
        <div class="card futuristic-card h-100 shadow">
          <div class="card-body">
            <h5 class="card-title"><b>⏰ Waktu Saat Ini</b></h5>
            <hr />
            <p><strong>Jam:</strong> {{ currentTime }} WIB</p>
            <p><strong>Tanggal:</strong> {{ currentDate }}</p>
            <p><strong>Lokasi:</strong> Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
      <!-- Card: Developer Info -->
      <div class="col-md-4">
        <div class="card futuristic-card h-100 shadow">
          <div class="card-body">
            <h5 class="card-title"><b>👨‍💻 Developer Info</b></h5>
            <hr />
            <p><strong>Nama:</strong> Arif Alexander</p>
            <p><strong>Telp:</strong> 0858-1704-8266</p>
            <p><strong>Email:</strong> codewitharif01@gmail.com</p>
          </div>
        </div>
      </div>
      <!-- Card: Quote -->
      <div class="col-md-4">
        <div class="card futuristic-card h-100 text-center shadow">
          <div class="card-body">
            <h5 class="card-title"><b>💬 Quote of the Day</b></h5>
            <hr />
            <blockquote class="blockquote mb-0">
              <p class="fst-italic">“{{ quote }}”</p>
            </blockquote>
            <hr />
            <p class="mb-0 text-muted">— Arif Alexander</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Sticky Note -->
    <div class="card sticky-note futuristic-card shadow">
      <div class="card-body">
        <h5 class="card-title">📝 Catatan Harian</h5>
        <textarea
          ref="noteTextarea"
          v-model="note"
          @input="autoResize"
          class="form-control border-0 bg-transparent"
          rows="1"
          placeholder="Tulis catatanmu di sini..."
        ></textarea>
      </div>
    </div>
    <!-- Toast Notification -->
  </div>
  <transition name="zoom-glow">
    <div
      v-if="showToast"
      class="toast-container position-fixed bottom-0 end-0 p-3 show"
      style="z-index: 1055"
      role="alertdialog"
    >
      <div
        class="toast align-items-center text-white bg-success border-0 show"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">Catatan tersimpan!</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.futuristic-card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.futuristic-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  transform: translateY(-3px);
}

.sticky-note {
  background-color: rgba(255, 250, 205, 0.6);
  border: 1px dashed #ffa;
  padding-bottom: 3em;
  backdrop-filter: blur(3px);
  border-radius: 1rem;
}

textarea::placeholder {
  color: #9bbdc2;
  margin-top: 0.5em;
  border-radius: 1rem;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";

const currentTime = ref("");
const currentDate = ref("");
const note = ref(localStorage.getItem("stickyNote") || "");
const showToast = ref(false);
const noteTextarea = ref(null);

const quotes = [
  "Kita tidak bisa mengubah arah angin, tetapi kita bisa menyesuaikan layar.",
  "Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.",
  "Jangan menunggu kesempatan, ciptakan kesempatan.",
  "Hidup adalah 10% apa yang terjadi pada kita dan 90% bagaimana kita bereaksi terhadapnya.",
  "Keberanian bukanlah ketiadaan rasa takut, tetapi kemampuan untuk mengatasi rasa takut.",
  "Kadang cinta bukan hanya ucapan, tapi juga aksi yang berdampak padanya.",
  "Jangan pernah menyerah pada impianmu, teruslah berjuang hingga akhir.",
  "Jika mencintaimu adalah kesalahan, maka aku rela salah selamanya.",
  "Aku tidak butuh surga karena aku menemukanmu. Aku tidak butuh mimpi karena aku sudah memilikimu.",
  "Cinta itu seperti angin, aku tidak bisa melihatnya tapi aku bisa merasakannya.",
  "Kamu adalah alasan aku tersenyum setiap hari.",
  "Setiap detik bersamamu adalah momen yang aku syukuri.",
  "Kerja keras hari ini adalah investasi untuk masa depan yang lebih baik.",
  "Setiap proyek adalah peluang untuk belajar dan berkembang.",
  "Jangan takut mencoba hal baru, di situlah peluang besar menanti.",
  "Fokus pada tujuanmu, bukan pada gangguan di sekitarmu.",
  "Kamu adalah bos dari waktumu, manfaatkan dengan bijak.",
  "Setiap langkah kecil membawa kita lebih dekat ke kesuksesan besar.",
  "Jangan lupa istirahat, produktivitas butuh keseimbangan.",
  "Hasil terbaik datang dari dedikasi dan konsistensi.",
  "Freelancer adalah seniman waktu, ciptakan mahakaryamu.",
  "Setiap tantangan adalah kesempatan untuk menunjukkan kemampuanmu.",
];
const quote = ref(quotes[Math.floor(Math.random() * quotes.length)]);

const autoResize = () => {
  nextTick(() => {
    const el = noteTextarea.value;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  });
};

setInterval(() => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("id-ID");
  currentDate.value = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}, 1000);

watch(note, (val) => {
  localStorage.setItem("stickyNote", val);
  autoResize();
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
});

onMounted(() => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("id-ID");
  currentDate.value = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  autoResize();
});
</script>

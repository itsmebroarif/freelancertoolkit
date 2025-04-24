<template>
  <div class="container py-5" data-aos="fade-up">
    <h1 class="display-5 fw-bold text-center mb-5 text-primary">📋 Project Management</h1>

    <!-- Add New Project Form -->
    <form @submit.prevent="addProject" class="row g-3 mb-4">
      <div class="col-md-4">
        <input v-model="newProject.clientName" type="text" class="form-control" placeholder="Nama Klien" required />
      </div>
      <div class="col-md-4">
        <input v-model="newProject.clientEmail" type="email" class="form-control" placeholder="Email Klien" required />
      </div>
      <div class="col-md-4">
        <input v-model="newProject.clientPhone" type="tel" class="form-control" placeholder="Nomor HP Klien" required />
      </div>
      <div class="col-md-4">
        <input v-model="newProject.projectTitle" type="text" class="form-control" placeholder="Judul Proyek" required />
      </div>
      <div class="col-md-4">
        <input v-model="newProject.deadline" type="date" class="form-control" required />
      </div>
      <div class="col-md-4">
        <input v-model="newProject.rate" type="number" class="form-control" placeholder="Tarif (Rp)" required />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-success w-100">Tambah Proyek</button>
      </div>
    </form>

    <!-- Project Table -->
    <table class="table table-hover table-bordered">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Nama Klien</th>
          <th>Email</th>
          <th>HP</th>
          <th>Proyek</th>
          <th>Deadline</th>
          <th>Tarif</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="project.id">
          <td>{{ index + 1 }}</td>
          <td>{{ project.clientName }}</td>
          <td>{{ project.clientEmail }}</td>
          <td>{{ project.clientPhone }}</td>
          <td>{{ project.projectTitle }}</td>
          <td>{{ project.deadline }}</td>
          <td>Rp {{ Number(project.rate).toLocaleString() }}</td>
          <td>
            <button @click="removeProject(index)" class="btn btn-danger btn-sm">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toast Notification -->
    <transition name="fade-slide">
      <div
        v-if="showToast"
        class="toast-container position-fixed bottom-0 end-0 p-3"
        style="z-index: 1055;"
      >
        <div class="toast align-items-center text-white bg-success border-0 show" role="alert">
          <div class="d-flex">
            <div class="toast-body">Proyek berhasil ditambahkan!</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: JSON.parse(localStorage.getItem("projects")) || [],
      newProject: {
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        projectTitle: "",
        deadline: "",
        rate: "",
      },
      showToast: false,
    };
  },
  methods: {
    addProject() {
      this.projects.push({ ...this.newProject, id: Date.now() });
      this.saveToStorage();
      this.showToast = true;
      this.resetForm();
      setTimeout(() => (this.showToast = false), 2000);
    },
    removeProject(index) {
      this.projects.splice(index, 1);
      this.saveToStorage();
    },
    resetForm() {
      this.newProject = {
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        projectTitle: "",
        deadline: "",
        rate: "",
      };
    },
    saveToStorage() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
  },
};
</script>

<style scoped>
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

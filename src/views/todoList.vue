<template>
  <div class="container py-5" data-aos="fade-up">
    <h1 class="mb-4 text-center fw-bold text-primary">📝 Todo List</h1>

    <div class="card shadow mb-4">
      <div class="card-body">
        <form @submit.prevent="addTodo">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label for="taskName" class="form-label">Nama Kegiatan</label>
              <input
                v-model="newTask.name"
                type="text"
                class="form-control"
                id="taskName"
                required
              />
            </div>

            <div class="col-md-3">
              <label for="priority" class="form-label">Tingkatan</label>
              <select
                v-model="newTask.level"
                class="form-select"
                id="priority"
                required
              >
                <option value="Tidak Wajib">Tidak Wajib</option>
                <option value="Menengah">Menengah</option>
                <option value="Penting">Penting</option>
              </select>
            </div>

            <div class="col-md-3">
              <label for="deadline" class="form-label">Deadline</label>
              <input
                v-model="newTask.deadline"
                type="date"
                class="form-control"
                id="deadline"
                required
              />
            </div>

            <div class="col-md-2">
              <button type="submit" class="btn btn-success w-100">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="tasks.length > 0" class="text-end mb-3">
      <button @click="exportCSV" class="btn btn-outline-primary">
        📤 Export ke CSV
      </button>
    </div>

    <div v-if="tasks.length > 0" class="table-responsive">
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Tingkatan</th>
            <th>Deadline</th>
            <th>Selesai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <transition-group name="fade-slide" tag="tbody">
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td>{{ index + 1 }}</td>
            <td>{{ task.name }}</td>
            <td>
              <span :class="badgeClass(task.level)">{{ task.level }}</span>
            </td>
            <td>{{ task.deadline }}</td>
            <td>
              <input
                type="checkbox"
                v-model="task.done"
                @change="saveTasks"
                class="form-check-input"
              />
            </td>
            <td>
              <button
                class="btn btn-sm btn-danger me-2"
                @click="deleteTask(task.id)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>

    <transition name="fade-slide">
      <div
        v-if="showToast"
        class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-4 show"
        style="z-index: 1055"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">Tindakan berhasil disimpan!</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTask: {
        name: "",
        level: "Tidak Wajib",
        deadline: "",
        done: false,
      },
      tasks: [],
      showToast: false,
    };
  },
  mounted() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  },
  methods: {
    addTodo() {
      const id = Date.now();
      this.tasks.push({ ...this.newTask, id });
      this.saveTasks();
      this.newTask = {
        name: "",
        level: "Tidak Wajib",
        deadline: "",
        done: false,
      };
      this.showToastMessage();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
      this.showToastMessage();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    showToastMessage() {
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 2000);
    },
    badgeClass(level) {
      return {
        "badge bg-secondary": level === "Tidak Wajib",
        "badge bg-warning text-dark": level === "Menengah",
        "badge bg-danger": level === "Penting",
      };
    },
    exportCSV() {
      const header = ["Nama", "Tingkatan", "Deadline", "Selesai"];
      const rows = this.tasks.map((t) => [
        t.name,
        t.level,
        t.deadline,
        t.done ? "Ya" : "Belum",
      ]);
      const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "todo_list.csv");
      link.click();
    },
  },
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

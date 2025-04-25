<template>
  <div class="container py-5" data-aos="fade-up">
    <h1 class="display-6 fw-bold text-center mb-5 text-primary">
      💰 Financial Tracker
    </h1>

    <!-- Summary Cards -->
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="card shadow-lg border-0 text-white bg-success rounded-4">
          <div class="card-body text-center">
            <i class="bi bi-arrow-down-circle-fill fs-1 mb-2"></i>
            <h5 class="card-title fw-semibold">Total Income</h5>
            <h3>{{ formatCurrency(totalIncome) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-lg border-0 text-white bg-primary rounded-4">
          <div class="card-body text-center">
            <i class="bi bi-wallet-fill fs-1 mb-2"></i>
            <h5 class="card-title fw-semibold">Balance</h5>
            <h3>{{ formatCurrency(balance) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-lg border-0 text-white bg-danger rounded-4">
          <div class="card-body text-center">
            <i class="bi bi-arrow-up-circle-fill fs-1 mb-2"></i>
            <h5 class="card-title fw-semibold">Total Expenses</h5>
            <h3>{{ formatCurrency(totalExpenses) }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">➕ Tambah Transaksi</h5>
        <form @submit.prevent="isEditing ? updateTransaction() : addTransaction()">
          <div class="row g-3">
            <div class="col-md-3">
              <input v-model="newTransaction.item" type="text" class="form-control" placeholder="Items" required />
            </div>
            <div class="col-md-2">
              <input v-model.number="newTransaction.amount" type="number" class="form-control" placeholder="Nominal" required />
            </div>
            <div class="col-md-2">
              <select v-model="newTransaction.type" class="form-select" required>
                <option disabled value="">Tipe</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div class="col-md-2">
              <input v-model="newTransaction.date" type="date" class="form-control" required />
            </div>
            <div class="col-md-2">
              <input v-model="newTransaction.track" type="text" class="form-control" placeholder="Track info" required />
            </div>
            <div class="col-md-1 d-grid">
              <button type="submit" class="btn btn-success">
                {{ isEditing ? "Update" : "Tambah" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0">📋 Riwayat Transaksi</h5>
          <button class="btn btn-outline-secondary btn-sm" @click="printTable">
            🖨️ Print Table
          </button>
        </div>
        <div ref="printSection">
          <table class="table table-hover table-striped align-middle">
            <thead class="table-dark">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Nominal</th>
                <th>Tipe</th>
                <th>Tanggal</th>
                <th>Track</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, index) in transactions" :key="t.id">
                <td>{{ index + 1 }}</td>
                <td>{{ t.item }}</td>
                <td>{{ formatCurrency(t.amount) }}</td>
                <td>
                  <span :class="t.type === 'income' ? 'text-success fw-bold' : 'text-danger fw-bold'">
                    {{ t.type }}
                  </span>
                </td>
                <td>{{ t.date }}</td>
                <td>{{ t.track }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-2" @click="editTransaction(t)">
                    Edit
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteTransaction(t.id)">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
      newTransaction: {
        item: "",
        amount: 0,
        type: "",
        date: "",
        track: "",
      },
      isEditing: false,
      editId: null,
    };
  },
  computed: {
    totalIncome() {
      const total = this.transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
      return isNaN(total) ? 0 : total;
    },
    totalExpenses() {
      const total = this.transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
      return isNaN(total) ? 0 : total;
    },
    balance() {
      const balance = this.totalIncome - this.totalExpenses;
      return isNaN(balance) ? 0 : balance;
    },
  },
  methods: {
    addTransaction() {
      const newT = { ...this.newTransaction, id: Date.now() };
      this.transactions.push(newT);
      this.saveToLocal();
      this.resetForm();
    },
    deleteTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.saveToLocal();
    },
    editTransaction(t) {
      this.newTransaction = { ...t };
      this.editId = t.id;
      this.isEditing = true;
    },
    updateTransaction() {
      const idx = this.transactions.findIndex(t => t.id === this.editId);
      if (idx !== -1) {
        this.transactions[idx] = { ...this.newTransaction, id: this.editId };
        this.saveToLocal();
        this.resetForm();
      }
    },
    saveToLocal() {
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
    loadFromLocal() {
      const data = localStorage.getItem("transactions");
      if (data) this.transactions = JSON.parse(data);
    },
    resetForm() {
      this.newTransaction = {
        item: "",
        amount: 0,
        type: "",
        date: "",
        track: "",
      };
      this.isEditing = false;
      this.editId = null;
    },
    formatCurrency(value) {
      if (isNaN(value)) value = 0;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    printTable() {
      const printContents = this.$refs.printSection.innerHTML;
      const w = window.open("", "", "height=700,width=1000");
      w.document.write("<html><head><title>Print Transaksi</title>");
      w.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
      w.document.write("</head><body>");
      w.document.write(printContents);
      w.document.write("</body></html>");
      w.document.close();
      w.focus();
      setTimeout(() => {
        w.print();
        w.close();
      }, 500);
    },
  },
  mounted() {
    this.loadFromLocal();
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>

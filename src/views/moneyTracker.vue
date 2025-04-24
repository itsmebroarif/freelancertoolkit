<template>
  <div class="container py-5" data-aos="fade-up">
    <h1 class="display-6 fw-bold text-center mb-5 text-primary">
      💰 Financial Tracker
    </h1>

    <!-- Cards Section -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card text-bg-success shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Total Income</h5>
            <h3>{{ formatCurrency(totalIncome) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-bg-primary shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Balance</h5>
            <h3>{{ formatCurrency(balance) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-bg-danger shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Total Expenses</h5>
            <h3>{{ formatCurrency(totalExpenses) }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">➕ Tambah Transaksi</h5>
        <form @submit.prevent="addTransaction">
          <div class="row g-3">
            <div class="col-md-3">
              <input
                v-model="newTransaction.item"
                type="text"
                class="form-control"
                placeholder="Items"
                required
              />
            </div>
            <div class="col-md-2">
              <input
                v-model.number="newTransaction.amount"
                type="number"
                class="form-control"
                placeholder="Nominal"
                required
              />
            </div>
            <div class="col-md-2">
              <select
                v-model="newTransaction.type"
                class="form-select"
                required
              >
                <option disabled value="">Tipe</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div class="col-md-2">
              <input
                v-model="newTransaction.date"
                type="date"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-2">
              <input
                v-model="newTransaction.track"
                type="text"
                class="form-control"
                placeholder="Track info"
                required
              />
            </div>
            <div class="col-md-1 d-grid">
              <button type="submit" class="btn btn-success">Tambah</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">📋 Riwayat Transaksi</h5>
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
                <span
                  :class="
                    t.type === 'income'
                      ? 'text-success fw-bold'
                      : 'text-danger fw-bold'
                  "
                >
                  {{ t.type }}
                </span>
              </td>
              <td>{{ t.date }}</td>
              <td>{{ t.track }}</td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteTransaction(t.id)"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
    };
  },
  computed: {
    totalIncome() {
      return this.transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    totalExpenses() {
      return this.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    balance() {
      return this.totalIncome - this.totalExpenses;
    },
  },
  methods: {
    addTransaction() {
      const newT = {
        ...this.newTransaction,
        id: Date.now(),
      };
      this.transactions.push(newT);
      this.saveToLocal();
      this.resetForm();
    },
    deleteTransaction(id) {
      this.transactions = this.transactions.filter((t) => t.id !== id);
      this.saveToLocal();
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
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
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

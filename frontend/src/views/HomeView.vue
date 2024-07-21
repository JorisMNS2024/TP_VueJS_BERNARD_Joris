<template>
  <div class="home">
    <div class="mb-3">
      <button @click="$router.push({ name: 'create-bill' })" class="btn btn-outline-primary me-3">
        <i class="fa-solid fa-plus-circle me-2"></i> Ajouter une facture
      </button>

      <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
        <i class="fa-solid fa-plus-circle me-2"></i> Ajouter un client
      </button>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card mb-5">
          <div class="card-header">
            <h5>10 dernières factures en cours</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Client</th>
                  <th>Montant HT</th>
                  <th>Montant TTC</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bill in limitedBills" :key="bill.id">
                  <td>{{ bill.billnum }}</td>
                  <td>{{ bill.client.companyName }}</td>
                  <td>{{ bill.totalHT }} € HT</td>
                  <td>{{ bill.totalTTC }} € TTC</td>
                  <td class="text-end">
                    <button @click="$router.push({ name: 'edit-bill', params: { id: bill.id } })" class="btn btn-outline-info">
                      Éditer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-5">
          <div class="card-header">
            <h5>Clients</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Nom du contact</th>
                  <th>Entreprise</th>
                  <th>Date d'ajout</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in limitedClients" :key="client.idclient">
                  <td><i class="fa fa-user" aria-hidden="true"></i> {{ client.firstName }} {{ client.lastName }}</td>
                  <td>{{ client.companyName }}</td>
                  <td>{{ formatDate(client.dateAdded) }}</td>
                  <td class="text-end">
                    <button @click="$router.push({ name: 'edit-client', params: { id: client.idclient } })" class="btn btn-outline-info">
                      Éditer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClientStore } from '@/stores/client'
import { useBillStore } from '@/stores/bill'
import { mapActions, mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useClientStore, {
      recentClients: 'items',
      loadingClients: 'loading'
    }),
    ...mapState(useBillStore, {
      recentBills: 'items',
      loadingBills: 'loading',
      bills: 'items'
    }),
    // Limiter nombre de clients à 10
    limitedClients() {
      return this.recentClients.slice(0, 10)
    },
    // Limiter le nombre de factures à 10 dernières
    limitedBills() {
    // Trier les factures par date décroissante (les plus récentes en premier)
    const sortedBills = this.recentBills.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Sélectionner les 10 premières factures après tri
    return sortedBills.slice(0, 10);
  }
  },
  async mounted() {
    await this.getRecentClients()
    await this.getRecentBills()
  },
  methods: {
    ...mapActions(useClientStore, ['getRecentItems as getRecentClients']),
    ...mapActions(useBillStore, ['getRecentItems as getRecentBills']),
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
  }
}
</script>

<style>
.table th, .table td {
  vertical-align: middle;
}
</style>

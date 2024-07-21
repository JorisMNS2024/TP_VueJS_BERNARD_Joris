<template>
    <div class="clients">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 class="h3"><i class="fa-solid fa-angle-down me-2"></i>Liste des clients</h1>
        </div>
        <div class="col text-end">
          <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
            <i class="fa-solid fa-plus-circle me-2"></i> Ajouter un client
          </button>
        </div>
      </div>
  
      <ClientTableList v-if="!loading && clients">
        <ClientTableRow
          v-for="client in clients"
          :key="client.idclient"
          :client="client"
          @edit="$router.push({ name: 'edit-client', params: { id: client.idclient } })"
          @delete="deleteClient(client.idclient)"
        />
      </ClientTableList>
  
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import ClientTableRow from '@/components/tables/ClientTableRow.vue'
  import ClientTableList from '@/components/tables/ClientTableList.vue'
  import { useClientStore } from '@/stores/client'
  import { mapActions, mapState } from 'pinia'
  export default {
    components: {
      ClientTableList,
      ClientTableRow
    },
    computed: {
      ...mapState(useClientStore, {
        clients: 'items',
        loading: 'loading'
      })
    },
    async mounted() {
      await this.getClients()
    },
    methods: {
      ...mapActions(useClientStore, {
        deleteClient: 'deleteItem',
        getClients: 'getItems'
      })
    }
  }
  </script>
  
<template>
  <div v-if="!loading && client">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 v-if="isNewClient" class="h3">Créer un client</h1>
        <h1 v-else class="h3">Éditer un client</h1>
      </div>
      <div class="col d-flex justify-content-end">
        <button v-if="!isNewClient" @click="onDeleteClient(client)" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" /> Supprimer
        </button>
        <button @click="goBack" class="btn btn-outline-secondary me-2">
          <i class="fa-solid fa-arrow-left me-2"></i> Retour
        </button>
      </div>
    </div>

    <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>

    <form @submit.prevent="onSave">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Contact:</h5>
          <div class="row">
            <div class="col-md-4 mb-2">
              <label for="firstName" class="form-label">Prénom:</label>
              <input type="text" id="firstName" v-model="client.firstName" class="form-control" :class="{ 'is-invalid': !client.firstName }" />
            </div>
            <div class="col-md-4 mb-2">
              <label for="lastName" class="form-label">Nom:</label>
              <input type="text" id="lastName" v-model="client.lastName" class="form-control" :class="{ 'is-invalid': !client.lastName }" />
            </div>
            <div class="col-md-4 mb-2">
              <label for="addedDate" class="form-label">Date d'ajout:</label>
            <input type="date" id="addedDate" v-model="client.addedDate" class="form-control" :class="{ 'is-invalid': !client.addedDate }" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="function" class="form-label">Fonction:</label>
              <input type="text" id="function" v-model="client.function" class="form-control" :class="{ 'is-invalid': !client.function }" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label">Téléphone:</label>
              <input type="text" id="phone" v-model="client.phone" class="form-control" :class="{ 'is-invalid': !client.phone }" />
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="text" id="email" v-model="client.email" class="form-control" :class="{ 'is-invalid': !client.email }" />
          </div>
          <div class="mb-3">
            <label for="companyName" class="form-label">Entreprise:</label>
            <input type="text" id="companyName" v-model="client.companyName" class="form-control" :class="{ 'is-invalid': !client.companyName }" />
          </div>
        </div>

        <div class="card-body">
          <h5 class="card-title">Coordonnées</h5>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="address1" class="form-label">Adresse 1:</label>
              <input type="text" id="address1" v-model="client.address1" class="form-control" :class="{ 'is-invalid': !client.address1 }" />
            </div>
            <div class="col-md-12 mb-3">
              <label for="address2" class="form-label">Adresse 2:</label>
              <input type="text" id="address2" v-model="client.address2" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="zip" class="form-label">Code Postal:</label>
              <input type="text" id="zip" v-model="client.zip" class="form-control" :class="{ 'is-invalid': !client.zip }" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="city" class="form-label">Ville:</label>
              <input type="text" id="city" v-model="client.city" class="form-control" :class="{ 'is-invalid': !client.city }" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="country" class="form-label">Pays:</label>
              <select id="country" v-model="client.country" class="form-select">
                <option value="FRANCE">FRANCE</option>
                <option value="ROYAUME-UNI">ROYAUME-UNI</option>
                <option value="ESPAGNE">ESPAGNE</option>
                <option value="ITALIE">ITALIE</option>
                <option value="ALLEMAGNE">ALLEMAGNE</option>
                <option value="AMÉRIQUE DU NORD">AMÉRIQUE DU NORD</option>
                <option value="CANADA">CANADA</option>
                <option value="AUSTRALIE">AUSTRALIE</option>
                <option value="JAPON">JAPON</option>
                <option value="CHINE">CHINE</option>
                <option value="BRÉSIL">BRÉSIL</option>
                <option value="ARGENTINE">ARGENTINE</option>
                <option value="AFRIQUE DU SUD">AFRIQUE DU SUD</option>
                <option value="MEXIQUE">MEXIQUE</option>
                <option value="RUSSIE">RUSSIE</option>
                <option value="SÉNÉGAL">SÉNÉGAL</option>
                <option value="SUEDE">SUEDE</option>
                <option value="NORVÈGE">NORVÈGE</option>
                <option value="FINLANDE">FINLANDE</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end mt-3">
        <button type="submit" :disabled="formInvalid" class="btn btn-outline-primary">Enregistrer</button>
      </div>
    </form>
  </div>
  <div v-else>loading...</div>
</template>

<script>
import { useClientStore } from '@/stores/client'
import { mapActions, mapState, mapWritableState } from 'pinia'

export default {
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      error: false
    }
  },
  mounted() {
    this.setClient(this.id)
  },
  computed: {
    ...mapState(useClientStore, {
      loading: 'loading'
    }),
    ...mapWritableState(useClientStore, {
      client: 'item'
    }),
    isNewClient() {
      return this.id === 'new'
    },
    formInvalid() {
      return (
        !this.client ||
        !this.client.firstName ||
        !this.client.lastName ||
        !this.client.companyName ||
        !this.client.function ||
        !this.client.phone ||
        !this.client.email ||
        !this.client.address1 ||
        !this.client.zip ||
        !this.client.city ||
        !this.client.country ||
        !this.client.addedDate
      )
    }
  },
  methods: {
    ...mapActions(useClientStore, {
      setClient: 'setItem',
      updateClient: 'updateItem',
      createClient: 'createItem',
      deleteClient: 'deleteItem'
    }),
    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push({ name: 'clients' })
    },
    onSave() {
      if (this.formInvalid) {
        this.error = true
      } else {
        this.error = false
        if (this.isNewClient) {
          this.createClient(this.client)
        } else {
          this.updateClient(this.client)
        }
        this.$router.push({ name: 'clients' })
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.form-label {
  font-weight: bold;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.alert-danger {
  font-size: 1rem;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.btn-outline-danger {
  display: flex;
  align-items: center;
}

.btn-outline-danger i {
  margin-right: 0.5rem;
}

.text-end button {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>

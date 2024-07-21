<template>
    <tr>
      <td class="align-middle">
        <i class="fa fa-user" aria-hidden="true"></i> {{ client.firstName }} {{ client.lastName }}
      </td>
      <td class="align-middle">{{ client.companyName }}</td>
      <td class="align-middle">{{ formatDate(client.dateAdded) }}</td>
      <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
        <button @click="onEdit" class="btn btn-outline-info">
          <i class="fa-solid fa-pen me-2" />Éditer
        </button>
        <button @click="onDelete" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      client: {
        type: Object,
        required: true
      }
    },
    emits: ['delete', 'edit'],
    methods: {
      onDelete() {
        this.$emit('delete', this.client)
      },
      onEdit() {
        this.$emit('edit', this.client)
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
      }
    }
  }
  </script>
  
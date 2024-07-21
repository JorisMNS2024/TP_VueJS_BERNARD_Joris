import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
  state: () => ({
    items: null,
    item: null,
    loading: false
  }),
  actions: {
    async getItems() {
      this.loading = true
      try {
        const response = await this.$http.get('/clients')
        this.items = response.data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

    async getRecentItems(limit = 5) {
        this.loading = true
        try {
          const response = await this.$http.get('/clients')
          this.items = response.data.slice(-limit).reverse()
          this.loading = false
        } catch (error) {
          console.error(error)
          this.loading = false
        }
    },
  

    async setItem(id) {
      if (id === 'new') {
        this.item = { firstName: '', lastName: '', companyName: '', dateAdded: new Date().toISOString().split('T')[0] }
      } else {
        this.loading = true
        try {
          const response = await this.$http.get('/clients/' + id)
          this.item = response.data
          this.loading = false
        } catch (error) {
          console.error(error)
          this.loading = false
        }
      }
    },

    async updateItem(form) {
      this.loading = true
      try {
        const response = await this.$http.patch('/clients/' + form.idclient, form)
        console.log(response.data)
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

    async createItem(form) {
      this.loading = true
      try {
        form.dateAdded = new Date().toISOString().split('T')[0]
        const response = await this.$http.post('/clients', form)
        console.log(response.data)
        this.items.push(response.data)
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

    async deleteItem(id) {
      this.loading = true
      try {
        const response = await this.$http.delete('/clients/' + id)
        await this.getItems()
        console.log(response.data)
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    }
  }
})

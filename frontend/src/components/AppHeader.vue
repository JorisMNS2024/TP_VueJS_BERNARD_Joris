<template>
  <header class="shadow">
    <nav class="navbar navbar-expand-lg bg-white pb-0">
      <div class="container-fluid">
        <RouterLink
          class="navbar-brand pb-2 fw-bold text-bg-primary px-3 mb-2 rounded-5"
          activeClass=""
          exactActiveClass=""
          to="/"
        >SMART BILL</RouterLink>

        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link pb-3" aria-current="page" to="/" >
              <i class="fas fa-home"></i> Accueil</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link pb-3" aria-current="page" to="/bills">
              <i class="fas fa-file-alt"></i> Factures</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link pb-3" aria-current="page" to="/clients">
              <i class="fas fa-users"></i> Clients</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link pb-3" aria-current="page" to="/about">À propos</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  }
}
</script>

<style>
.nav-link {
  cursor: pointer;
}
</style>

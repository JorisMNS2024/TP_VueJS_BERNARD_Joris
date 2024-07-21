<template>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Entreprise</th>
            <th>Date d'ajout</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </template>
  
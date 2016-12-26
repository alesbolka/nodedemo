<template>
  <div class="alert alert-danger custom-error">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .custom-error {
    padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 4px;
    margin-bottom: 0;
  }
</style>
<template>
  <div class="page">
    <counter :is="useComponent"></counter>
    <p>
      To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  components: {
    Counter
  },
  computed: {
    useComponent () {
      return 'Counter';
    }
  }
}
</script>

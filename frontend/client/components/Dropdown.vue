<template>
  <div
    class="dropdown"
    @test="setDay"
    :class="{open: isOpen}"
  >
    <slot name="button">
      <button
        class="btn btn-default dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        @click="open"
      >
        {{ title }}
        <span class="caret"></span>
      </button>
    </slot>
    <ul class="dropdown-menu">
      <slot>
        <!-- Dropdown content comes here -->
      </slot>
    </ul>
  </div>
</template>

<script>
  export default {
    props: [
      'title'
    ],
    data: function () {
      return {
        isOpen: false
      }
    },
    methods: {
      open() {
        let obj = this;
        this.isOpen = true;
        setTimeout(function () {
          document.onclick = function () {
            obj.isOpen = false;
            document.onclick = undefined;
          };
        }, 0);
      },
      // onBlur (e) {
      //   console.log(e);
      //   this.isOpen = false;
      // },
      setDay () {
        console.log('dd');
      },
      toggle () {
        this.isOpen = !this.isOpen;
      }
    }
  }
</script>

<style type="text/css">
  .dropdown-menu {
    max-height: 120px;
    overflow-y: auto;
  }

  .dropdown-menu a {
    cursor: pointer;
  }
</style>
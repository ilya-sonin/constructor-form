<script>
import { RouterView } from 'vue-router'

export default {
  name: 'app',
  components: { RouterView }
}
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
.sib-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 0.25fr 1fr;
}

.sib {
  padding: 15% 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sib-logo {
  width: 117px;
  height: 30px;
}

.sib-href {
  color: var(--sib-accent-color);
}

.sib-content {
  padding-top: 4%;
  padding-left: 4%;
  padding-right: 8%;
  background-color: var(--sib-special-white);

  display: flex;
  flex-direction: column;
  gap: 2em;
}

.sib-content__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 40px;
    font-weight: 700;
  }
}

.sib-content__view {
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
}

.sib-menu-container__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

// SIB-form
.sib-form {
  background-color: #fff;
  border-radius: 20px;

  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    font-weight: 500;
  }
}
// SIB-form
</style>

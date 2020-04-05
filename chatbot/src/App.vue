<template>
  <main>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "@/assets/app.scss";

main {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
  font-size: $textSize;
}

p {
  margin: 0;
  padding: 0;
}
</style>

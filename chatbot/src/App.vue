<template>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "@/assets/app.scss";

main {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $secondaryBackgroundColor;
  color: $textColor;
  font-size: 16px;
  width: 100%;
  height: 100%;

  & > .home {
    height: 100%;
    overflow: hidden;
  }

  @include respond-to(small) {
    font-size: $textSize;
  }
}

p {
  margin: 0;
  padding: 0;
}

input[type="email"],
input[type="number"],
input[type="password"],
input[type="tel"],
input[type="text"],
input[type="url"],
textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  display: inline-block;
  min-height: 36px;
  padding: 0;
  margin: 0;
  width: 100%;
  background: transparent;
  border: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: $textSize;
  color: $textColor;
  outline: none;
}
</style>

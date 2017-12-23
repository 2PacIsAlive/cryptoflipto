<template>
  <div>
    <v-container>
      <div class="loading">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </v-container>  
  </div>
</template>

<script>
  export default {
    name: 'callback',
    props: ['auth'],
    data () {
      this.auth.handleAuthentication()
      return {}
    }
  }
</script>

<style>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .loading-bar {
    display: inline-block;
    width: 2px;
    height: 14px;
    border-radius: 2px;
    animation: loading 1s ease-in-out infinite;
  }
  .loading-bar:nth-child(1) {
    background-color: #309F87;
    animation-delay: 0;
  }
  .loading-bar:nth-child(2) {
    background-color: #309f50;
    animation-delay: 0.09s;
  }
  .loading-bar:nth-child(3) {
    background-color: #30809f;
    animation-delay: .18s;
  }
  .loading-bar:nth-child(4) {
    background-color: #9f3080;
    animation-delay: .27s;
  }

  @keyframes loading {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1, 2.2);
    }
    40% {
      transform: scale(1);
    }
  }
</style>
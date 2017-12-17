<template>
  <div id="app">
    <v-app dark>
      <div v-if="loading">
        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
        loading..
      </div>
      <div v-else>
        <v-container fluid>
          <router-view></router-view>
          <v-footer class="l">
            <div>Hacked up by <a href=https://github.com/2PacIsAlive>Jared Jolton</a>. Contact: jared@willbitcoincostmoretomorrow.cool</div>
          </v-footer>
          <v-footer dark class="l">
            <div>Donate: <a href="bitcoin:1GmT5px2b5hJTH2Lssb56v3NBUbvu9YJXc">1GmT5px2b5hJTH2Lssb56v3NBUbvu9YJXc</a></div>
          </v-footer>
          <v-footer class="l">
            <v-spacer></v-spacer>
            <div v-html="disclaimer"></div>
          </v-footer>
          <v-footer dark class="l">
            <v-spacer></v-spacer>
            <div>Coming soon: Use <a href="http://github.com/2PacIsAlive/nethub">nethub</a> to build your own bitcoin-price predicting neural networks!</div>
          </v-footer>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      disclaimer: 'Disclaimer: This website does not provide investment or trading advice.'
    }
  },
  mounted () {
    let app = this
    app.$store.commit('setLoading', false)
  },
  computed: mapState({
    answer: state => state.answer,
    loading: state => state.loading
  })
}
</script>

<style>
* {
  font-family: 'Inconsolata', monospace;
}

#app {  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e3ebbf;
  margin-top: 3px;
}

a {
  color: #309F87;
}
</style>

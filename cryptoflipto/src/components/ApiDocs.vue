<template>
  <div class="apidocs">
    <v-container>
    <v-card hover dark>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">crypto&#607;l&#7433;d&#647;o <small>api docs</small></h3>
          <div>flip yo crypto like a pro</div>
        </div>
      </v-card-title>
      <v-card-text>
        <template v-for="method in api">
          <v-card hover>
            <v-card-title primary-title>
              <h3 class="headline mb-0" v-html="method.name"></h3> 
              <div>
                {{ method.description }}
              </div>
            </v-card-title>
            <v-card-text>
              <codemirror v-model="method.example" :options="getOptions(false)" @ready="setSize"></codemirror>
            </v-card-text>
          </v-card>
          <hr/>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn flat outline @click.native="toRoot()">write script</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
    </v-container>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/mbo.css'

export default {
  name: 'ApiDocs',
  data () {
    return {
      api: [
        {
          name: '<pre><code>getPrice(<i>pair</i>, <i>market</i>)</code></pre>',
          example: `api.getPrice("btcusd", "gdax")\n12533`,
          description: 'Retrieve the last price for the specified pair at the specified market'
        }, {
          name: '<pre><code>getMarket(<i>market</i>)</code></pre>',
          example: `api.getMarket("gdax")
[
    "btcusd",
    "btceur",
    "btcgbp",
    "ethusd",
    "ethbtc",
    "ltcusd",
    "ltcbtc",
    "etheur",
    "ltceur"
]`,
          description: 'Retrieve a list of the pairs traded at the specified market'
        }, {
          name: '<pre><code>getAsset(<i>asset</i>)</code></pre>',
          example: `api.getAsset("doge")
[
    {
        "market": "kraken",
        "pair": "dogebtc"
    },
    {
        "market": "poloniex",
        "pair": "dogebtc"
    }
]`,
          description: 'Retrieve a list of markets and the pairs they trade for the specified asset'
        }
      ]
    }
  },
  components: {
    codemirror
  },
  methods: {
    toRoot () {
      this.$router.push('/')
    },
    setSize (cm) {
      cm.setSize(null, '100%')
    },
    getOptions (readOnly) {
      return {
        lineWrapping: true,
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'mbo',
        lineNumbers: true,
        line: true,
        readOnly: readOnly,
        float: 'center',
        width: '1000%',
        height: '1000%'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor {  
  width: 100%
}
* {
  font-family: 'Inconsolata', monospace;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.CodeMirror {
  border: 1px solid #eee;
  float: center; 
  width: 100%; 
  height: 100%;
  viewportMargin: Infinity;
}
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
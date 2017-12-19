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
        <div> 
          <template v-for="method in api">
            <v-card hover>
              <v-card-title primary-title>
                <div>
                  <a :id="method.tag"></a>
                  <h3 class="headline mb-0" v-html="method.name"></h3>
                  <div v-text="method.description"></div>
                  <p v-for="arg in method.args" v-html="args[arg]"></p>
                </div>
              </v-card-title>
              <v-card-text>
                <div>
                  <codemirror v-model="method.example" :options="getOptions(true)" @ready="setSize"></codemirror>
                </div>  
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn outline @click.native="tryIt(method.example)">try it</v-btn>
              </v-card-actions>
            </v-card>
            <hr/>
          </template>
        </div>  
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
      args: {
        pair: '<i>pair</i>: a currency pair (see <a href="/#/docs#getPairs">api.getPairs()</a>)',
        market: '<i>market</i>: a cryptocurrency trading-place (see <a href="/#/docs#getMarkets">api.getMarkets()</a>)',
        asset: '<i>asset</i>: a currency (crypto or fiat) (see <a href="/#/docs#getAssets">api.getAssets()</a>)'
      },
      api: [
        {
          name: '<pre><code>getPrice(<i>pair</i>, <i>market</i>)</code></pre>',
          tag: 'getPrice',
          example: `api.getPrice("btcusd", "gdax")`,
          description: 'Retrieve the last price for the specified pair at the specified market',
          args: ['pair', 'market']
        }, {
          name: '<pre><code>getMarket(<i>market</i>)</code></pre>',
          tag: 'getMarket',
          example: `api.getMarket("gdax")`,
          description: 'Retrieve a list of the pairs traded at the specified market',
          args: ['market']
        }, {
          name: '<pre><code>getAsset(<i>asset</i>)</code></pre>',
          tag: 'getAsset',
          example: `api.getAsset("btc")`,
          description: 'Retrieve a list of markets and the pairs they trade for the specified asset',
          args: ['asset']
        }, {
          name: '<pre><code>getAssets()</code></pre>',
          tag: 'getAssets',
          example: `api.getAssets()`,
          description: 'Retrieve a list of all supported currencies (crypto and fiat)',
          args: []
        }, {
          name: '<pre><code>getMarkets()</code></pre>',
          tag: 'getMarkets',
          example: `api.getMarkets()`,
          description: 'Retrieve a list of all supported trading-places',
          args: []
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
    tryIt (example) {
      this.$router.push(`/?script=module.exports = function() { return ${example} }`)
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
</style>

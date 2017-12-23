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
          <template v-for="module in Object.keys(api)">
            <h1>&#8669; {{ module }}</h1>
            <template v-for="method in api[module]">
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
        pair: '<i>pair</i>: a currency pair (see <a href="/docs#pairs">api.data.pairs()</a>)',
        market: '<i>market</i>: a cryptocurrency trading-place (see <a href="/docs#markets">api.data.markets()</a>)',
        asset: '<i>asset</i>: a currency (crypto or fiat) (see <a href="/docs#assets">api.data.assets()</a>)'
      },
      api: {
        data: [
          {
            name: '<pre><code>price(<i>pair</i>, <i>market</i>)</code></pre>',
            tag: 'price',
            example: `api.data.price("btcusd", "gdax")`,
            description: 'Retrieve the last price for the specified pair at the specified market',
            args: ['pair', 'market']
          }, {
            name: '<pre><code>market(<i>market</i>)</code></pre>',
            tag: 'market',
            example: `api.data.market("gdax")`,
            description: 'Retrieve a list of the pairs traded at the specified market',
            args: ['market']
          }, {
            name: '<pre><code>asset(<i>asset</i>)</code></pre>',
            tag: 'asset',
            example: `api.data.asset("btc")`,
            description: 'Retrieve a list of markets and the pairs they trade for the specified asset',
            args: ['asset']
          }, {
            name: '<pre><code>assets()</code></pre>',
            tag: 'assets',
            example: `api.data.assets()`,
            description: 'Retrieve a list of all supported currencies (crypto and fiat)',
            args: []
          }, {
            name: '<pre><code>markets()</code></pre>',
            tag: 'markets',
            example: `api.data.markets()`,
            description: 'Retrieve a list of all supported trading-places',
            args: []
          }
        ],
        indicators: [
          {
            name: '<pre><code>moneyFlowIndex(<i>high</i>, <i>low</i>, <i>close</i>, <i>volume</i>, <i>period</i>, <i>callback</i>)</code></pre>',
            tag: 'moneyFlowIndex',
            example: `var indicator;\nvar candles = api.data.candles("btcusd", "gdax", 86400);\napi.indicators.moneyFlowIndex(\n\tcandles.map(function(candle) { return candle.high }),\n\tcandles.map(function(candle) { return candle.low }),\n\tcandles.map(function(candle) { return candle.close }),\n\tcandles.map(function(candle) { return candle.volume }),\n\t14\n\tfunction (result) { indicator = result })\n)return indicator`,
            description: 'Retrieve the last price for the specified pair at the specified market',
            args: ['high', 'low', 'close', 'volume', 'period', 'callback']
          }
        ],
        overlays: [

        ]
      }
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

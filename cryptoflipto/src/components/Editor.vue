<template>
  <div class="editor">
    <v-container>
    <v-card hover dark>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">crypto&#607;l&#7433;d&#647;o</h3>
          <div>flip yo crypto like a pro</div>
        </div>
      </v-card-title>
      <v-card-text>
        <template v-if="loadingResultDISABLED">
          <v-container>
            <div class="loading">
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
            </div>
          </v-container>
        </template>
	      <template>
          <v-container fluid>
            <codemirror v-model="scriptText" :options="getOptions(false)" @ready="onCmReady"></codemirror>
          </v-container>  
          <v-container v-if="hasResult">
            <v-card hover>
              <v-card-title secondary-title>
                <div>
                  result:
                </div>
              </v-card-title>
              <v-card-text>
                <codemirror v-model="result" :options="getOptions(true)"></codemirror>
              </v-card-text>
            </v-card>
          </v-container>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn flat outline @click.native="toApiDocs()">api docs</v-btn>
        <v-spacer/>
        <v-btn secondary outline :loading="loadingResult" @click.native="testScript()">test</v-btn>
        <template v-if="authenticated">
          <v-btn v-if="authenticated" outline>deploy</v-btn>
        </template>
        <template v-else>  
          <v-btn disabled outline slot="activator">authenticate to deploy</v-btn>
        </v-tooltip>
        </template>  
      </v-card-actions>
    </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import CodeMirror from 'codemirror'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/theme/mbo.css'

export default {
  name: 'Editor',
  props: {
    script: {
      default: `module.exports = function() {
  const capital = 100.00
  const prices = {
    ltcusd: {
      gdax: api.getPrice("ltcusd", "gdax")
    }, 
    btcusd: {
      gdax: api.getPrice("btcusd", "gdax")
    },
    ltcbtc: {
      kraken: api.getPrice("ltcbtc", "kraken")
    }
  }
  const ltcQty = capital / prices.ltcusd.gdax
  const btcQty = ltcQty * prices.ltcbtc.kraken
  const usdQty = btcQty * prices.btcusd.gdax 
  return {
    trades: [
      {
        pair: "ltcusd",
        side: "buy",
        exchange: "gdax",
        cost: capital,
        quantity: ltcQty,
        price: prices.ltcusd.gdax
      },{
        pair: "ltcbtc",
        side: "sell",
        exchange: "kraken",
        quantity: btcQty,
        cost: ltcQty,
        price: prices.ltcbtc.kraken
      }, {
        pair: "btcusd",
        side: "sell",
        exchange: "gdax",
        quantity: usdQty,
        cost: btcQty,
        price: prices.btcusd.gdax
      }
    ],  
    result: {
      asset: "usd",
      quantity: usdQty,
      profit: usdQty - capital,
      exchange: "gdax"
    } 
  }
}`,
      type: String
    }
  },
  data () {
    return {
      loadingResultDISABLED: false,
      scriptText: this.script,
      authenticated: false,
      result: null,
      loadingResult: false,
      hasResult: false
    }
  },
  components: {
    codemirror
  },
  methods: {
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
        height: '1000%',
        extraKeys: {
          'Ctrl-Space': 'autocomplete'
        }
      }
    },
    toApiDocs () {
      this.$router.push('/docs')
    },
    testScript () {
      const that = this
      that.loadingResult = true
      axios.post('http://cryptoflipto.cool/api/script', {
        script: that.scriptText
      }).then(function (res) {
        that.result = JSON.stringify(res.data.result, undefined, 4)
        that.loadingResult = false
        that.hasResult = true
      }).catch(function (e) {
        console.log(e)
        that.result = e.toString()
        that.loadingResult = false
        that.hasResult = true
      })
    },
    onCmReady (cm) {
      // cm.setSize('100%', null)
    },
    onCmCodeChange (newCode) {
      // console.log(newCode)
    },
    onKeyEvent: function (e) {
      CodeMirror.showHint(e)
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
.CodeMirror-hints {
    background-color: #309F87;
}
.CodeMirror-hint {
    background-color: #309f50;
}
.CodeMirror-hint-active {
    background-color: #9f3080;
    color: #30809f;
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

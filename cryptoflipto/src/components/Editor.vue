<template>
  <div class="editor">
    <v-card hover dark>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">crypto&#607;l&#7433;d&#647;o</h3>
          <div>flip yo crypto like a pro</div>
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          <v-container v-if="loadingResult">
            <div class="loading">
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
            </div>
          </v-container>
          <v-container v-else fluid>
            <codemirror v-model="code" :options="getOptions(false)" @ready="onCmReady"></codemirror>
          </v-container>  
        </div>
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
      </v-card-text>
      <v-card-actions>
        <v-btn flat outline>api docs</v-btn>
        <v-spacer/>
        <v-btn secondary outline>test</v-btn>
        <v-btn @click.native="deploy()" outline>deploy</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/mbo.css'

export default {
  name: 'Editor',
  data () {
    return {
      code: `module.exports = function() {
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
    opportunity: {
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
  }
}
      `,
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
        height: '1000%'
      }
    },
    deploy () {
      const that = this
      that.loadingResult = true
      console.log(`deploying: ${that.code}`)
      axios.post('http://cryptoflipto.cool/api/script', {
        script: that.code
      }).then(function (res) {
        console.log(res)
        that.result = JSON.stringify(res.data, undefined, 4)
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
      // cm.setSize('100%', '100%')
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
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

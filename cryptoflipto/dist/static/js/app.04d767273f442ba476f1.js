webpackJsonp([1],{

/***/ "07Cy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "1XTk":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "2q1O":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "4/hK":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "B8oD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"editor"},[(_vm.loadingResult)?_c('v-container',[_c('div',{staticClass:"loading"},[_c('div',{staticClass:"loading-bar"}),_vm._v(" "),_c('div',{staticClass:"loading-bar"}),_vm._v(" "),_c('div',{staticClass:"loading-bar"}),_vm._v(" "),_c('div',{staticClass:"loading-bar"})])]):_vm._e(),_vm._v(" "),_c('v-card',{attrs:{"hover":"","dark":""}},[_c('v-card-title',{attrs:{"primary-title":""}},[_c('div',[_c('h3',{staticClass:"headline mb-0"},[_vm._v("cryptoɟlᴉdʇo")]),_vm._v(" "),_c('div',[_vm._v("flip yo crypto like a pro")])])]),_vm._v(" "),_c('v-card-text',[_c('div',[_c('v-container',{attrs:{"fluid":""}},[_c('codemirror',{attrs:{"options":_vm.getOptions(false)},on:{"ready":_vm.onCmReady},model:{value:(_vm.code),callback:function ($$v) {_vm.code=$$v},expression:"code"}})],1)],1),_vm._v(" "),(_vm.hasResult)?_c('v-container',[_c('v-card',{attrs:{"hover":""}},[_c('v-card-title',{attrs:{"secondary-title":""}},[_c('div',[_vm._v("\n              result:\n            ")])]),_vm._v(" "),_c('v-card-text',[_c('codemirror',{attrs:{"options":_vm.getOptions(true)},model:{value:(_vm.result),callback:function ($$v) {_vm.result=$$v},expression:"result"}})],1)],1)],1):_vm._e()],1),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"flat":"","outline":""}},[_vm._v("api docs")]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"secondary":"","outline":""}},[_vm._v("test")]),_vm._v(" "),_c('v-btn',{attrs:{"outline":""},nativeOn:{"click":function($event){_vm.deploy()}}},[_vm._v("deploy")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "IcnI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__("NYxO");




__WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* default */].Store({
  state: {
    latestData: null,
    prediction: {},
    answer: 'maybe',
    loading: true
  },
  mutations: {
    setLatestData(state, latestData) {
      state.latestData = latestData;
    },
    setAnswer(state, answer) {
      state.answer = answer;
    },
    setPrediction(state, prediction) {
      state.prediction = prediction;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    getLatestData({ commit }) {
      return new Promise((resolve, reject) => {
        __WEBPACK_IMPORTED_MODULE_0_axios___default()({
          method: 'get',
          url: `https://www.quandl.com/api/v3/datasets/BCHARTS/COINBASEUSD.json?limit=1`
        }).then(response => {
          console.log(response);
          resolve(response.data.dataset.data[0].slice(1));
        }).catch(e => {
          console.log(e);
          resolve();
        });
      });
    },
    getPrediction({ commit }, latestData) {
      return new Promise((resolve, reject) => {
        if (latestData) {
          __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`/nethub/jared/cryptopticon/predict`, {
            name: 'cryptopticon',
            layers: [{
              type: 'input',
              shape: [null, 7]
            }, {
              type: 'fully_connected',
              num_units: 64,
              activation: 'linear'
            }, {
              type: 'dropout',
              keep_prob: 0.8
            }, {
              type: 'fully_connected',
              num_units: 64,
              activation: 'linear'
            }, {
              type: 'dropout',
              keep_prob: 0.8
            }, {
              type: 'fully_connected',
              num_units: 64,
              activation: 'linear'
            }, {
              type: 'fully_connected',
              num_units: 2,
              activation: 'softmax'
            }, {
              type: 'regression',
              optimizer: 'sgd',
              loss_fcn: 'categorical_crossentropy',
              learning_rate: 0.001
            }],
            data: latestData
          }).then(response => {
            if (response.status === 200) {
              if (response.data[0] > response.data[1]) {
                commit('setAnswer', 'no');
                resolve({ 'answer': 'no', 'confidence': response.data[0] * 100 });
              } else {
                commit('setAnswer', 'yes');
                resolve({ 'answer': 'yes', 'confidence': response.data[1] * 100 });
              }
            } else {
              resolve({ 'answer': 'maybe', 'confidence': 100 });
            }
          }).catch(e => {
            console.log(e);
            resolve({ 'answer': 'maybe', 'confidence': 100 });
          });
        } else {
          resolve({ 'answer': 'maybe', 'confidence': 100 });
        }
      });
    },
    getImage({ commit }, prediction) {
      return new Promise((resolve, reject) => {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`https://yesno.wtf/api?force=${prediction.answer}`).then(response => {
          response.data.confidence = prediction.confidence.toFixed(2);
          commit('setPrediction', response.data);
          resolve();
        });
      });
    }
  }
}));

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_384535cc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("bFnA");
function injectStyle (ssrContext) {
  __webpack_require__("2q1O")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_384535cc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__("IcnI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuetify__ = __webpack_require__("3EgV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuetify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuetify__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vuetify___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Editor__ = __webpack_require__("aek+");




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Editor',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Editor__["a" /* default */]
  }]
}));

/***/ }),

/***/ "aek+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Editor_vue__ = __webpack_require__("pIzI");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_535cb921_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Editor_vue__ = __webpack_require__("B8oD");
function injectStyle (ssrContext) {
  __webpack_require__("07Cy")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-535cb921"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Editor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_535cb921_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Editor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "bFnA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('main',[_c('v-app',{attrs:{"dark":""}},[(_vm.loading)?_c('div',[_c('v-progress-linear',{attrs:{"indeterminate":true}}),_vm._v("\n        loading..\n      ")],1):_c('div',[_c('v-container',{attrs:{"fluid":""}},[_c('router-view'),_vm._v(" "),_c('v-footer',{staticClass:"l"},[_c('div',[_vm._v("Hacked up by "),_c('a',{attrs:{"href":"https://github.com/2PacIsAlive"}},[_vm._v("Jared Jolton")]),_vm._v(". Contact: jared@willbitcoincostmoretomorrow.cool")])]),_vm._v(" "),_c('v-footer',{staticClass:"l",attrs:{"dark":""}},[_c('div',[_vm._v("Donate: "),_c('a',{attrs:{"href":"bitcoin:1GmT5px2b5hJTH2Lssb56v3NBUbvu9YJXc"}},[_vm._v("1GmT5px2b5hJTH2Lssb56v3NBUbvu9YJXc")])])]),_vm._v(" "),_c('v-footer',{staticClass:"l"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.disclaimer)}})]),_vm._v(" "),_c('v-footer',{staticClass:"l",attrs:{"dark":""}},[_c('div',[_vm._v("Coming soon: Use "),_c('a',{attrs:{"href":"http://github.com/2PacIsAlive/nethub"}},[_vm._v("nethub")]),_vm._v(" to build your own bitcoin-price predicting neural networks!")])])],1)],1)])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "pIzI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_codemirror__ = __webpack_require__("E5Az");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_codemirror_lib_codemirror_css__ = __webpack_require__("4/hK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_codemirror_lib_codemirror_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_codemirror_lib_codemirror_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror_mode_javascript_javascript_js__ = __webpack_require__("5IAE");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror_mode_javascript_javascript_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror_mode_javascript_javascript_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_codemirror_theme_mbo_css__ = __webpack_require__("1XTk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_codemirror_theme_mbo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_codemirror_theme_mbo_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Editor',
  data() {
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
    };
  },
  components: {
    codemirror: __WEBPACK_IMPORTED_MODULE_1_vue_codemirror__["codemirror"]
  },
  methods: {
    getOptions(readOnly) {
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
      };
    },
    deploy() {
      const that = this;
      that.loadingResult = true;
      console.log(`deploying: ${that.code}`);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('http://0.0.0.0:49161/script', {
        script: that.code
      }).then(function (res) {
        console.log(res);
        that.result = JSON.stringify(res.data, undefined, 4);
        that.loadingResult = false;
        that.hasResult = true;
      }).catch(function (e) {
        console.log(e);
        that.result = e.toString();
        that.loadingResult = false;
        that.hasResult = true;
      });
    },
    onCmReady(cm) {
      // cm.setSize('100%', '100%')
      console.log('the editor is readied!', cm);
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm);
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode);
      this.code = newCode;
    }
  }
});

/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("NYxO");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  data() {
    return {
      disclaimer: 'Disclaimer: This website does not provide investment or trading advice.'
    };
  },
  mounted() {
    let app = this;
    app.$store.commit('setLoading', false);
  },
  computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapState */])({
    answer: state => state.answer,
    loading: state => state.loading
  })
});

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.04d767273f442ba476f1.js.map
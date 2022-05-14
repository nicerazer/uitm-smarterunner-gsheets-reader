import Vue from 'vue'
import VueApollo from 'vue-apollo'
import './index.css'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import PagePendaftaranProgram from './pages/PendaftaranProgram.vue'
import PageError from './pages/404.vue'

const httpLink = createHttpLink({
    uri: 'https://belchertown.stepzen.net/smarterunner-gsheets/kertaskerja/__graphql',
    headers: {
        //   authorization: 'Bearer ' + localStorage.getItem('token'),
        authorization: 'Apikey belchertown::stepzen.net+1000::74fbc99db67e5121aeb21b971dcbbb0fdac153f62715e8434e64b1031604411e',
    },
  })

const cache = new InMemoryCache()

// Client create
const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

// Plugin usage
Vue.use(VueApollo)

// Provider instantiate
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

// Router settings
const routes = {
  'pendaftaran-program': PagePendaftaranProgram
}

// Vue App
const app = new Vue({
  el: '#app',
  render (h) { return h(this.ViewComponent) },
  computed: {
    ViewComponent () {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      return routes[params.page] || PageError
    }
  },
  apolloProvider,
})

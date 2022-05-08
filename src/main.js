import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import './index.css'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: 'https://belchertown.stepzen.net/smarterunner-gsheets/kertaskerja/__graphql',
    headers: {
        //   authorization: 'Bearer ' + localStorage.getItem('token'),
        authorization: 'Apikey belchertown::stepzen.net+1000::74fbc99db67e5121aeb21b971dcbbb0fdac153f62715e8434e64b1031604411e',
    },
  })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
  render: (h) => h(App),
  apolloProvider
})
.$mount('#app')
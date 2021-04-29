<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #00adb5">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <div>
          <q-btn flat stretch to="/home">
            <img 
              src="~assets/logoPaper.png"
              height="30px"
            />
          </q-btn>
        </div>
        <q-toolbar-title>
         <!-- title -->
        </q-toolbar-title>
        
        <div>
         <q-btn-dropdown
          flat
          color="white"
          label="User"
        >
          <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Welcome Back</div>
          <p>Username : {{ username }}</p>
          <p>last Login : {{ lastLogin }}</p>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ name }}</div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
            @click="logout"
          />
        </div>
      </div>
        </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Paperid
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Finance',
    // caption: 'finance',
    // icon: 'code',
    link: 'finance'
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    }
  },
  computed: {
    username() { return this.$store.state.account.username },
    name() { return this.$store.state.account.name },
    lastLogin() { return this.$store.state.account.lastLogin },
  },
  methods: {
    logout() {
      this.$store.commit('account/clearSession')
      this.$router.push('/')
    }
  }
}
</script>

<template>
    <div class="q-pa-md bg">
      <div class="q-pa-md q-mt-lg fixed-left text-white">
        <div>
          <h2>Masuk Ke Paper.id</h2>
          <p>Masuk dengan akun yang terdaftar di Paper.id/PayPer</p>
        </div>
        <div class="loginRow">
          <q-input v-model="username" placeholder="Username" :rules="[val => (val && val !== '') || 'Username tidak boleh Kosong']"/>
          <q-input type="password" v-model="password" placeholder="Kata Sandi" :rules="[val => (val && val !== '') || 'password tidak boleh Kosong']"/>
        </div>
        <p>Lupa kata sandi?</p>
        <q-btn rounded class="full-width" :disabled="isDisable" @click="login" color="teal-3" label="Masuk" />
      </div>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    isDisable() { return (this.username === '' || this.password === '') ? true : false},
  },
  methods: {
    async login() {
      const res = await this.$store.dispatch('account/login', {
        data :{
          username: this.username,
          password: this.password
        }
      })
      if(res.message != 'User not Found') this.$router.push('/finance')
    }
  }
};
</script>

<style lang="scss" scoped>
  .bg {
    height: 1000px;
    background-image: url('~assets/bg1.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
</style>

<template>
  <div>
    <p class="home text-center">
      123{{label}}<br>
      <v-btn large color="indigo" class="white--text mx-auto mt-10" @click.prevent="move(label)">about로 이동</v-btn>
      <Br/>
      <input v-model="text" />
      <router-link to="/" tag="li" event="alert(1)">어바우트로 떠냐요</router-link>
      <v-btn v-text="result"></v-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      label: '안녕하세요.',
      text: ''
    }
  },
  computed: {
    result () {
      console.log(this.$router)
      return '123'
    }
  },
  methods: {
    move (val) {
      this.text = val
      this.$router.back(-2)
    }
  }
}
</script>

<style scoped>
.home {
  background-color:aqua;
  width: 500px;
  height: 300px;
  margin: 100px auto
}
.red {
  color :red;
}
</style>
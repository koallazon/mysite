<template>
  <v-app>
    <!-- header -->
    <v-app-bar
      app
      color="indigo darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <title-component :title="site.title"></title-component>
      <v-spacer />
      <v-btn text @click="save()">
        <span>쓰기</span>
      </v-btn>
      <v-btn text @click="read()">
        <span>읽기</span>
      </v-btn>
      <v-btn text @click="readOne()">
        <span>한번 읽기</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      width="400"
    >
      <menu-component :items="site.menu" />
    </v-navigation-drawer> 
    <v-content>
      <div class="text-center display-1 pt-2">{{title}}</div>
      <router-view></router-view>
    </v-content>

    <!-- 꼬릿말 -->
    <footer-component :footer="site.footer"></footer-component>
  </v-app>
</template>

<script>
import axios from 'axios'
import TitleComponent from './components/title'
import menuComponent from './components/menu'
import FooterComponent from './components/footer'

export default {
  components: {
    TitleComponent,
    menuComponent,
    FooterComponent
  },
  data: () => ({
    drawer: false,
    title: null,
    site: {
      mene: [],
      title: '이태규의 블로그',
      footer: "Copyright &copy; 2020.LeeTaegyu. All rights resered"
    },
    text: null
  }),
  methods: {
    save () {
      console.log('save')
      setTimeout(() => {
        for(let i = 0; i < 3; i++) {
          this.$firebase.database().ref().child('abcd').set({
            title: 'abcd', text: "number"+i
          })
        }
      },1000)
    },
    read () {
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn)
        console.log(sn.val())
      })
    },
    async readOne () {
      const r = await this.$firebase.database().ref().child('abcd').once('value')
    },
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {        
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
        console.log(this.site)
      })
    }
  },
  created () {
    //this.getTitle()
    this.subscribe()
  }
}
</script>

<style scoped>
</style>
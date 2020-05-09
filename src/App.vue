<template>
  <v-app>
    <!-- 모바일 네비게이션 -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-group
          v-for="(item, i) in items"
          :key="i"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

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
import FooterComponent from './components/footer'

export default {
  components: {
    TitleComponent,
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
    text: null,
    items: [
      {
        title: 'home',
        icon: 'mdi-home',
        subItems: [
          {
            title: 'Dashboard',
            to: '/'
          },
          {
            title: 'About',
            to: '/about'
          }
        ]
      },
      {
        title: 'about',
        active: true,
        icon: 'mdi-account',
        subItems: [
          {
            title: 'two',
            to: '/two'
          }
        ]
      }
    ]
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
    /*
    async getTitle () {
      const res = await axios.get('http://localhost:3000/sorry')
      console.log(res)
      this.title= res.data
    },
    */
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {        
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
      })
    }
  },
  created () {
    //this.getTitle()
    this.subscribe()
  },
  mounted () {
    //console.log(this.$firebase)
  }
}
</script>

<style scoped>
</style>
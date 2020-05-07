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
    <v-footer
      color="indigo darken-4"
      app
      dark
    >
      <span>Copyright &copy; 2020.LeeTaegyu. All rights resered </span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    drawer: false,
    title: null,
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
      this.$firebase.database().ref().child('abcd').set({
        title: 'abcd', text: 'tttt'
      })
    },
    read () {
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn)
        console.log(sn.val())
      })
    },
    async readOne () {
      const r = await this.$firebase.database().ref().child('abcd').once('value')
      console.log(sn.val())
    },
    async getTitle () {
      const res = await axios.get('http://localhost:3000/sorry')
      console.log(res)
      this.title= res.data
      /*
        axios.get('http://newsapi.org/v2/top-headlines?country=kr&apiKey=3763b3e4dffb41d79e351431946efed0')
          .then(response => {
            console.log(response)
          }).catch(err => {
            console.log(err)
          })
      */
      //this.title = res.data
    }
  },
  created () {
    this.getTitle()
  },
  mounted () {
    //console.log(this.$firebase)
  }
}
</script>

<style scoped>
</style>
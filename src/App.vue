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
              <v-list-item-title v-text="item.title"></v-list-item-title>
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
      <v-toolbar-title>
        <site-title :title="title" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn text>
        <span>로그인</span>
      </v-btn>
    </v-app-bar>

    <v-content>
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
import SiteTitle from '@/components/title'

export default {
  components: {
    SiteTitle
  },
  data: () => ({
    drawer: false,
    title: '나만의 사이트',
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
  })
}
</script>

<style scoped>
</style>
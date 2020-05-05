<template>
  <v-app id="inspire">
    <!-- 모바일 네비게이션 -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- header -->
    <v-app-bar
      app
      color="indigo darken-4"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </transition>
    <br>
    <router-view class="view two" name="about"></router-view>

    <!-- 꼬릿말 -->
    <v-footer
      color="indigo darken-4"
      app
    >
      <span class="white--text">Copyright &copy; 2020.LeeTaegyu. All rights resered </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  })
}
</script>
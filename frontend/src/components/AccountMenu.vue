<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="brown" size="45">
          <v-icon color="#DABDAB" dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="#DABDAB" size="50">
            <v-icon color="brown" large dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="onLogoutClick"> LogOut </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>

export default {
  props: {
    user: Object,
  },
  methods: {
    onLogoutClick() {
      this.$emit('logout');
    },
  },
}
</script>

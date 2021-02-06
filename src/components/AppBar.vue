<template>
    <v-app-bar
      app
      color="white"
    >
      <v-tabs
          centered
          class="ml-n9"
          color="grey darken-1"
      >
        <v-tab exact :to="{ name: 'TodaysTasks' }">
          Today's Tasks
        </v-tab>
        <v-tab exact :to="{ name: 'Calendar' }">
          Calendar
        </v-tab>
        <v-tab exact :to="{ name: 'Statistics' }">
          Statistics
        </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
</template>
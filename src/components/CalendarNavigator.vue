<template>
    <v-toolbar
      flat
      color="grey lighten-5"
    >
      <template v-if="itIsToday">
        <v-btn
          @click="updateSelectedDate($moment().format('YYYY-MM-DD'))"
          outlined
          color="primary"
        >
          Today
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          @click="updateSelectedDate($moment().format('YYYY-MM-DD'))"
          color="primary"
          dark
          depressed
        >
          Today
        </v-btn>
      </template>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelPrev')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelNext')"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <BaseDatePicker :displayDate="formattedDate">
        <template v-slot="{ open }">
          <v-date-picker
              v-bind:value="selectedDate"
              @input="updateSelectedDate($event); open = false"
              min-width="290px"
          />
        </template>
      </BaseDatePicker>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span>{{ calendarType }}</span>
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
          <v-list>
            <v-list-item @click="updateCalendarType('day')">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateCalendarType('week')">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateCalendarType('month')">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BaseDatePicker from './BaseDatePicker'

export default {
    components: { BaseDatePicker },
    data: function() {
        return {
            isMenuOpen: false
        }
    },
    computed: {
      formattedDate() {
        return this.$moment(this.selectedDate).format('dddd, MMMM Do YYYY')
      },
      itIsToday() {
        return this.$moment().isSame(this.selectedDate, 'day')
      },
      ...mapState([
        'selectedDate',
        'calendarType'
      ])
    },
    methods: {
      ...mapMutations([
        'updateSelectedDate',
        'updateCalendarType'
      ])
    }
}
</script>
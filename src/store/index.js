import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moment from 'moment'

export default new Vuex.Store({
  state: {
    events: [],
    selectedDate: moment().format('YYYY-MM-DD'),
    calendarType: 'week'
  },
  mutations: {
    createEvent(state, event) {
      state.events.push(event)
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    updateSelectedDate(state, newDate) {
      state.selectedDate = newDate;
    },
    updateCalendarType(state, newType) {
      state.calendarType = newType
    },
    updateEvent(state, event) {
      for (const key in event) {
        state.events[event.id][key] = event[key]
      }
    },
    deleteAll(state) {
      localStorage.removeItem('events')
      state.events=[]
    },
    deleteEvent(state, eventid) {
      localStorage.removeItem('events')
      state.events.splice(eventid, 1);
      for( var i = eventid; i < state.events.length; i++){
            state.events[i].id=i;
      }
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    saveData(state) {
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    initialiseStore(state) {
      // Fetches data stored in the browser when the app is started
      if (localStorage.getItem('events')) {
        try {
          // A really ugly regular expression for modifying the json parser to allow for Date types
          let reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
          JSON.dateParser = function (key, value) {
            if (typeof value === 'string') {
              let arr = reISO.exec(value);
              if (arr)
                return new Date(value);
            }
            return value;
          };
          state.events = JSON.parse(localStorage.getItem('events'), JSON.dateParser);
        } catch(e) {
          localStorage.removeItem('events');
          console.error("Events data failed parsing");
        }
      }
    }
  },
  getters: {
    todaysTasks(state) {
      return state.events.filter(event => {
        return moment(event.start).isSame(moment(), 'day')
      }).sort((a, b) => a.start - b.start)
    },
    getEvent: (state) => (id) => {
      return state.events[id]
    }
  }
})

<template>
    <div>
        <v-sparkline
            :fill="true"
            :gradient="gradient"
            :line-width="2"
            :padding="8"
            :smooth="10"
            :label-size="5"
            :value="minutesOfCompletedTasksLastWeek"
            auto-draw
        >
            <template v-slot:label="item">
                {{ weekDate(item.index) }}
            </template>
        </v-sparkline>
        <div class="display-2 font-weight-thin text-center">
            <p>Daily Productivity</p>
        </div>
        <hr>
        <v-row>
            <v-card
                class="ma-2"
                color="white"
                width="850"
            >
                <v-card-text class="display-1 font-weight-bold">
                    Completed tasks in the last 7 days: {{ numCompletedTasksLastWeek }}
                </v-card-text>
            </v-card>
            <v-spacer></v-spacer>
            <v-card
                class="ma-2"
                color="white"
                width="850"
            >
                <v-card-text class="display-1 font-weight-bold">
                    All time completed tasks: {{ numCompletedTasksOverall }}
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-card
                class="ma-2"
                color="white"
                width="850"
            >
                <v-card-text class="display-1 font-weight-bold">
                    Hours of completed tasks in the last 7 days: {{ Math.trunc(sum(minutesOfCompletedTasksLastWeek) / 60) }}
                </v-card-text>
            </v-card>
            <v-spacer></v-spacer>
            <v-card
                class="ma-2"
                color="white"
                width="850"
            >
                <v-card-text class="display-1 font-weight-bold">
                    All time hours of completed tasks: {{ Math.trunc(minutesOfCompletedTasksOverall / 60) }}
                </v-card-text>
            </v-card>
        </v-row>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            gradient: ['#00c6ff', '#F0F', '#FF0']
        }
    },
    computed: {
        minutesOfCompletedTasksLastWeek() {
            // Computes the number of hours of completed tasks for each day in the last week
            let events = this.$store.state.events;
            let today = new Date();
            today.setHours(0, 0);
            let aWeekAgo = new Date();
            aWeekAgo.setHours(0, 0);
            aWeekAgo.setDate(aWeekAgo.getDate() - 7);
            let minutesOfCompletedTasks = [0,0,0,0,0,0,0];
            events.forEach(event => {
                let startDate = event.start;
                if (typeof(startDate) == Date)
                    startDate = event.start.getTime();
                let endDate = event.end;
                if (typeof(endDate) == Date)
                    endDate = event.end.getTime();
                if (endDate < aWeekAgo.getTime() || endDate > today.getTime())
                    return;
                if (event.completed) {
                    let numDaysAgo = Math.trunc((today.getTime() - endDate) / (1000 * 3600 * 24));
                    let taskDuration = (endDate - startDate)  / (1000 * 60);
                    minutesOfCompletedTasks[6 - numDaysAgo] += taskDuration;
                }
            })
            return minutesOfCompletedTasks;
        },
        numCompletedTasksLastWeek() {
            // Computes the number of tasks completed for each day in the last week
            let events = this.$store.state.events;
            let today = new Date();
            today.setHours(0, 0);
            let aWeekAgo = new Date();
            aWeekAgo.setHours(0, 0);
            aWeekAgo.setDate(aWeekAgo.getDate() - 7);
            let numCompletedTasks = 0;
            events.forEach(event => {
                let endDate = event.end;
                if (typeof(endDate) == Date)
                    endDate = event.end.getTime();
                if (endDate < aWeekAgo.getTime() || endDate > today.getTime())
                    return;
                if (event.completed)
                    numCompletedTasks++;
            })
            return numCompletedTasks;
        },
        numCompletedTasksOverall() {
            let events = this.$store.state.events;
            let numCompletedTasks = 0;
            events.forEach(event => {
                if (event.completed)
                    numCompletedTasks++;
            })
            return numCompletedTasks;
        },
        minutesOfCompletedTasksOverall() {
            let events = this.$store.state.events;
            let minutesOfCompletedTasks = 0;
            events.forEach(event => {
                if (event.completed) {
                    let startDate = event.start;
                    if (typeof(startDate) == Date)
                        startDate = event.start.getTime();
                    let endDate = event.end;
                    if (typeof(endDate) == Date)
                        endDate = event.end.getTime();
                    let taskDuration = (endDate - startDate)  / (1000 * 60);
                    minutesOfCompletedTasks += taskDuration;
                }
            })
            return minutesOfCompletedTasks;
        }
    },
    methods: {
        weekDate(numDays) {
            // Computes the date for numDays days ago in string form
            let day = new Date();
            day.setHours(0, 0);
            day.setDate(day.getDate() - 7 + numDays);
            return day.toISOString().substr(5, 5);
        },
        sum(arr) {
            return arr.reduce((acc, item) => acc + item, 0);
        }
    }
}
</script>
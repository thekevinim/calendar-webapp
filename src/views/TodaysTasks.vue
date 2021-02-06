<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <v-sheet rounded elevation="10">
                    <v-row>
                        <v-col cols="12">
                            <h2 class="display-1 pl-4">
                                {{ todaysTasks.length }} Tasks for Today
                            </h2>
                        </v-col>
                        <v-col cols="12">
                            <h2 class="mx-4 mb-2 success--text text--darken-2">
                                Completed:
                                <v-fade-transition leave-absolute>
                                    <span :key="`completed-${completedTasks.length}`">
                                        {{ completedTasks.length }}
                                    </span>
                                </v-fade-transition>
                            </h2>
                            <h2 class="mx-4 mb-2 info--text text-darken-2">
                                Remaining:
                                <v-fade-transition leave-absolute>
                                    <span :key="`remaining-${remainingTasks.length}`">
                                        {{ remainingTasks.length }}
                                    </span>
                                </v-fade-transition>
                            </h2>
                        </v-col>
                    </v-row>
                    <v-progress-linear
                        :value="progress"
                        height="25"
                        :color="progressColor"
                    >
                        <strong>{{ Math.ceil(progress) }}%</strong>
                    </v-progress-linear>
                </v-sheet>
            </v-col>
            <v-col v-if="todaysTasks.length > 0">
                <v-sheet rounded class="px-10" elevation="10">
                    <v-timeline>
                        <v-timeline-item
                            v-for="task in todaysTasks"
                            :key="task.id"
                            :color="task.color"
                            fill-dot
                        >
                            <template v-slot:opposite>
                                <span
                                    class="headline font-weight-bold"
                                    :style="{ color: task.color }"
                                >
                                    {{ task.start | moment("h:mm a") }}
                                </span>
                            </template>
                            <Task :taskId="task.id"/>
                        </v-timeline-item>
                    </v-timeline>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from '@/components/Task'

export default {
    components: {
        Task
    },
    computed: {
        ...mapGetters([ 'todaysTasks' ]),
        remainingTasks() {
            return this.todaysTasks.filter((task) => !task.completed)
        },
        completedTasks() {
            return this.todaysTasks.filter((task) => task.completed)
        },
        progress() {
            if (this.todaysTasks.length > 0)
                return this.completedTasks.length / this.todaysTasks.length * 100
            else
                return 100
        },
        progressColor() {
            if (this.progress <= 25)
                return 'info'
            else if (this.progress <= 75)
                return 'amber'
            else
                return 'green'
        }
    }
}
</script>
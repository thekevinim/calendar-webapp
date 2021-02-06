<template>
    <v-scale-transition leave-absolute origin="center center">
        <v-card
            dark
            :color="cardColor"
            elevation="10"
            @click="completed = !completed"
            :key="completed"
        >
            <v-row>
                <v-col cols="8">
                    <v-card-title>
                        {{ task.name }}
                    </v-card-title>
                    <v-card-subtitle v-html="task.description"></v-card-subtitle>
                </v-col>
                <v-col cols="4" align-self="center">
                    <v-row justify="center">
                        <v-avatar>
                            <v-icon x-large>
                                {{ icon }}
                            </v-icon>
                        </v-avatar>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-scale-transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: [
        'taskId'
    ],
    methods: {
        ...mapMutations([ 'updateEvent', 'saveData' ])
    },
    computed: {
        ...mapGetters([ 'getEvent' ]),
        task() {
            return this.getEvent(this.taskId)
        },
        completed: {
            get() {
                return this.task.completed
            },
            set(value) {
                this.updateEvent({
                    id: this.taskId,
                    completed: value
                })
                this.saveData()
            }
        },
        cardColor() {
            return this.completed ? 'green' : 'red'
        },
        icon() {
            return this.completed ? 'mdi-check' : 'mdi-close'
        }
    }
}
</script>
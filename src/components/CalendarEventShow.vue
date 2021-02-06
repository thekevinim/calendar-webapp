<template>
    <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
    >
        <v-toolbar :color="color" dark>
            <v-text-field
                v-model="nameNew"
                full-width
                hide-details
            ></v-text-field>
        </v-toolbar>
        <v-card-text>
            <v-textarea v-model="descriptionNew"></v-textarea>
            <v-checkbox
                v-model="completedNew"
                label="Completed"
            ></v-checkbox>
            <v-menu
                v-model="colorPickerOpen"
                :close-on-content-click="false"
                offset-x
            >
                <template v-slot:activator="{ on }">
                    <v-chip
                        v-on="on"
                        :color="colorNew"
                        dark
                    >
                        Color
                    </v-chip>
                </template>
                <v-card>
                    <v-card-text>
                        <v-color-picker
                            v-model="colorNew"
                            :hide-inputs="true"
                        ></v-color-picker>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="colorPickerOpen = false"
                            icon
                        >
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="save" color="success">
                Save
            </v-btn>
            <v-btn @click="close">
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="deleteevent" color="error">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: {
        selectedOpen: Boolean,
        color: String,
        name: String,
        description: String,
        completed: Boolean,
        id: Number
    },
    data: function() {
        return {
            descriptionNew: this.description,
            completedNew: this.completed,
            colorNew: this.color,
            colorPickerOpen: false,
            nameNew: this.name
        }
    },
    methods: {
        ...mapMutations([ 
            'updateEvent',
            'deleteEvent' 
        ]),
        close() {
            this.$emit('update:selectedOpen', false)
        },
        save() {
            this.updateEvent({
                id: this.id,
                description: this.descriptionNew,
                completed: this.completedNew,
                color: this.colorNew,
                name: this.nameNew
            })
            this.close()
        },
        deleteevent() {
            this.deleteEvent(this.id)
            this.close()
        }

    },
    watch: {
        selectedOpen: function () {
            this.descriptionNew = this.description
            this.completedNew = this.completed
            this.colorNew = this.color
            this.nameNew = this.name
        }
    }
}
</script>
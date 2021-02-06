<template>
    <v-menu
    v-model="open"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
    min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-bind:value="displayDate"
                readonly
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                hide-details
                single-line
            ></v-text-field>
        </template>

        <slot v-bind:open="open"></slot>
    </v-menu>
</template>

<script>
export default {
    props: [ 'displayDate' ],
    data() {
        return {
            open: false
        }
    }
}
</script>
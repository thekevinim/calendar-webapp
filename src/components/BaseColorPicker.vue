<template>
    <v-menu
    v-model="open"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                prepend-icon="mdi-clock-time-four-outline"
                v-bind="attrs"
                v-on="on"
                :color="displayColor"
                class="ml-4"
            >
                <strong style="color: white;" v-html="displayColor"></strong>
                <v-icon right color="white">
                    mdi-select-color
                </v-icon>
            </v-chip>
        </template>

        <slot v-bind:open="open"></slot>
    </v-menu>
</template>

<script>
export default {
    props: [ 'displayColor' ],
    data() {
        return {
            open: false
        }
    }
}
</script>
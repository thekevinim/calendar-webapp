<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            New Task
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <v-text-field
              label="Task Name"
              v-model="name"
            />
            <v-row justify="center">
              <v-col>
              <h2>Start Date:</h2>
              <BaseDatePicker :displayDate="startDate | moment('ddd, MMM Do YY')">
                <v-date-picker v-slot="{ open }"
                  v-model="startDate"
                  :max="endDate"
                  @change="open = false"
                />
              </BaseDatePicker>
              </v-col>
              <v-col>
              <h2>End Date:</h2>
              <BaseDatePicker :displayDate="endDate | moment('ddd, MMM Do YY')">
                <v-date-picker v-slot="{ open }" 
                  v-model="endDate"
                  :min="startDate"
                  @change="open = false"
                />
              </BaseDatePicker>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2>Start Time:</h2>
                <BaseTimePicker :displayTime="start">
                  <v-time-picker v-slot="{ open }"
                    class="time-picker"
                    ampm-in-title
                    format="ampm"
                    scrollable
                    v-model="start"
                    :max="end"
                    @change="open = false"
                  />
                </BaseTimePicker>
              </v-col>
              <v-col>
                <h2>End Time:</h2>
                <BaseTimePicker :displayTime="end">
                  <v-time-picker v-slot="{ open }"
                    class="time-picker"
                    ampm-in-title
                    format="ampm"
                    scrollable
                    v-model="end"
                    :min="start"
                    @change="open = false"
                  />
                </BaseTimePicker>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex">
                <h2>Display Color:</h2>
                <BaseColorPicker :displayColor="color">
                  <v-color-picker v-slot="{ open }"
                    justify="center"
                    hide-canvas
                    show-swatches
                    :swatches="swatches"
                    swatches-max-height="118"
                    v-model="color"
                    @change="open = false"
                  />
                </BaseColorPicker>
              </v-col>
            </v-row>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn
              class="btn-add"
              @click="$emit('addEvent', name, startDate, endDate, start, end, color); close()"
              color="success"
            >
              Add Task
            </v-btn>
            <v-btn
              class="btn-cancel"
              @click="close"
              color="error"
            >
              Cancel
            </v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import BaseDatePicker from './BaseDatePicker'
  import BaseTimePicker from './BaseTimePicker'
  import BaseColorPicker from './BaseColorPicker'

  export default {
    components: {
      BaseDatePicker,
      BaseTimePicker,
      BaseColorPicker
    },
    data: function() {
      return {
        name: "New Task",
        startDate: this.$moment().format('YYYY-MM-DD'),
        endDate: this.$moment().format('YYYY-MM-DD'),
        start: this.$moment().format('hh:mm'),
        end: this.$moment().format('hh:mm'),
        color: "#FF00FF",
        swatches: [
          ['#FF0000', '#FF00FF', '#640000'],
          ['#00FF00', '#FF6400', '#006400'],
          ['#0000FF', '#00FFFF', '#000064'],
        ],
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-y: auto;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    padding: 15px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    padding: 15px;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-cancel,
  .btn-add {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
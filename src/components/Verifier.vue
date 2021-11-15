<template>
  <div id="tutorial-wrapper" class="modal-mask"
   @mousedown.stop="showSolution = false; $emit('close-verifier')">
    <div class="modal-wrapper">
      <div class="modal-container" @mousedown.stop>
        <div class="modal-header">
          <p class="title" v-if="correctSolution">Das ist richtig!</p>
          <p class="title" v-else>Das ist leider nicht richtig!</p>
          <button class="exit-button" @click="$emit('close-verifier')">
           &times;
           </button>
        </div>
        <div class="flex-item flex-center flex-space-between flex-col">
          <div class="flex-item flex-center flex-space-between flex-row">
            <img class="corr_img" v-if="correctSolution" :src="require('@/assets/icons/correct.png')"
             draggable="false"/>
            <img class="corr_img" v-else :src="require('@/assets/icons/wrong.png')"
             draggable="false"/>
          </div>
          <hr>
          <div v-if="!correctSolution">
            {{ tip }}
          </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Verifier',
  props: [
    'correctSolution',
    'tip',
  ],
  created: function(){
    console.log("Verifier activated")
  },
  methods: {
    reloadPage(){
      location.reload()
    },

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  hr {
  width: 50%;
}
.description > p {
  margin: 1em;
  text-align: justify;
  font-size: 1.5em !important;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.tutorial-container {
  background-color: #fff;
}

.exit-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    width: 2em;
    height: 2em;
    text-align: center;
    padding: 0;
    background: #f5f5f5;
    font-size: 1.5em;
    line-height: 1.7em;
    border-radius: 3px;
}
.modal-container {
  position: relative;
  margin: 0px auto;
  width: 40%;
  min-width: 500px;;
  padding: 20px 30px 40px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.25em;
}
.modal-header {
  padding-bottom: 30px;
}
.modal-header h3 {
  font-size: 1.4em;
}
.modal-body {
  margin: 20px 0;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal-default-button {
  float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.corr_img {
  animation: shake 0.5s; 
  animation-iteration-count: 2s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

</style>

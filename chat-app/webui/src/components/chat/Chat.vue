<template>
    <div slot="content" class="px-2 mt-4 full-heigth">
      <div class="block -mx-2">
        <div
          class="chat-message"
          v-for="(data, index) in messages"
          :key="index"
        >
          <span class="text-gray font-small">{{ data.message.username }}</span>
          <div class="flex items-end">
            <div
              class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
            >
              <div>
                <span
                  class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                  >{{ data.message.message }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex m-4 bottom-0 fixed">
          <input
            v-model="messagetosend"
            class="shadow appearance-none border rounded mywidth py-2 px-3 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roomcreation"
            type="text"
            placeholder="message"
          />
          <button
            v-on:click="send"
            class="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    project: String,
  },
  data() {
    return {
      dataSet: [],
      messagetosend: "",
    };
  },
  methods: {
    getStaCount(name) {
      console.log(name);
    },
    send() {
     let payload = {
        room: this.selectedRoom,
        mutation: "",
        message: { username: this.user.user, message: this.messagetosend }
      };
      this.$socket.send(JSON.stringify(payload));
    },
  },
  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    messages() {
      if(this.$store.state.socketstore.messages){
        return this.$store.state.socketstore.messages.filter((value) => {
          console.log(value.room)
          if (value && value.room == this.selectedRoom) {
            return true;
          }
          return false;
        });
      }
      return []
    },
    selectedRoom() {
      return this.$store.state.datastore.selectedRoom;
    },
  },
};
</script>

<style scoped>
.full-heigth {
  height: 80vh;
}
/* Tab content - closed */
.tab-content {
  max-height: 0;
}
/* :checked - resize to full height */
.tab input:checked ~ .tab-content {
  max-height: 100%;
}
.mywidth{
  width: 50rem;
}
/* Label formatting when open */
.tab input:checked + label {
  /*@apply text-xl p-5 border-l-2 border-indigo-500 bg-gray-100 text-indigo*/
  font-size: 1.25rem; /*.text-xl*/
  border-left-width: 2px; /*.border-l-2*/
  border-color: #6574cd; /*.border-indigo*/
  background-color: #f7fafc54; /*.bg-gray-100 */
  color: #6574cd; /*.text-indigo*/
}
/* Icon */
.tab label::after {
  float: right;
  right: 0;
  top: 0;
  display: block;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
}
/* Icon formatting - closed */
.tab input[type="checkbox"] + label::after {
  content: "+";
  font-weight: bold; /*.font-bold*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #313131; /*.border-grey*/
}
.tab input[type="radio"] + label::after {
  content: "\25BE";
  font-weight: bold; /*.font-bold*/
  border-width: 1px; /*.border*/
  border-radius: 9999px; /*.rounded-full */
  border-color: #313131; /*.border-grey*/
}
/* Icon formatting - open */
.tab input[type="checkbox"]:checked + label::after {
  transform: rotate(315deg);
  background-color: #6574cd; /*.bg-indigo*/
  color: #f8fafc; /*.text-grey-lightest*/
  border-color: #f8fafc;
}
.tab input[type="radio"]:checked + label::after {
  transform: rotateX(180deg);
  background-color: #6574cd; /*.bg-indigo*/
  color: #f8fafc; /*.text-grey-lightest*/
  border-color: #f8fafc;
}
</style>
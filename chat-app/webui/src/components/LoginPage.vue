<template>
  <div class="w-full max-w-xs m-auto mt-4">
    <div class="bg-white shadow-md rounded px-8 pt-40 pb-8 mb-4">
      <form @submit.prevent="handleSubmit">
        <div class="login__check w-32 absolute"></div>
        <h2>Welcome to Space Tugs Chat</h2>
        <br>
        <div class="text-gray-600 inline-flex items-center flex-1 m-1">
          
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            <svg
              class="h-8 w-8 hash overflow-visible mr-3"
              viewBox="0 0 448 512"
            >
              <defs>
                <linearGradient id="hashchart-gradient">
                  <stop offset="0%" stop-color="#1177eb" />
                  <stop offset="100%" stop-color="#001eca" />
                </linearGradient>
              </defs>
              <path
                stroke="url(#hashchart-gradient)"
                d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"
              ></path>
            </svg>
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-4 px-4 rounded-full">
            GO
          </button>
        </div>
      </form>
    </div>
    <p class="text-center text-gray-500 text-xs">
      &copy;Made by Space Tug team.
    </p>
  </div>
</template>

<script>
import { router } from '../services/router';
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleSubmit() {
       console.log("send data")
      if (this.username) {
        this.$http
          .post(
            this.$store.state.datastore.backendUrl + "/login",
            JSON.stringify({user:this.username})
          )
          .then(response => {
            console.log(response.data)
            this.$store.dispatch("authentication/loginSuccess",{user:this.username})
            localStorage.setItem('spacetugsuser', JSON.stringify({user:this.username}));
            response.data.forEach(element => {
                console.log(element)
                this.$store.commit("SOCKET_ONMESSAGE",element)
            });
            router.push('/');
          })
          .catch((error) => {
            this.$toast.open({
              message: error,
              type: "error",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.hash path {
    fill: none;
    stroke-width: 30
  } 
.last path {
    fill: none;
    stroke-width: 30
  } 
.hash path {
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
      animation: animatePath 2s 0.5s forwards;
    }
.last path {
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
      animation: animatePath 2s 0.5s forwards;
    }
@keyframes animatePath {
  to {
    stroke-dashoffset: 0;
  }
}
.login__check {
  width: 6rem;
  height: 1.5rem;
  margin-left: 7rem;
  top: 7rem;
  background: rgb(51, 51, 51);
  transform-origin: 0 100%;
  transform: rotate(-45deg);
}

.login__check:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 1.5rem;
  height: 3rem;
  background: rgb(201, 201, 201);
  box-shadow: inset -0.2rem -2rem 2rem rgba(0, 0, 0, 0.5);
}
@keyframes animatePath {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
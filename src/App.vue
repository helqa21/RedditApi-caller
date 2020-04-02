<template>
  <div id="app" class="container">
    <div style="margin-left:auto;margin-right:auto;">
      <center>
        <small id="tex"
          >🌛 &copy; BlackHole🌌Studio LLC | Made with 💘 by an 👽 on a 💻 for
          👽 | 2020 | E.A.N aka ZTF 🌜</small
        >
      </center>
    </div>
    <div class="mt-5 container-fluid">
      <form @submit.prevent="load">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model="query"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-danger" type="button">
              👽
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- posts -->
    <div class="container mt-5">
      <center>
        <h1>
          <strong v-if="query != ''">{{ query }}</strong>
        </h1>
      </center>
    </div>
    <div class="container mt-5">
      <ul class="list-unstyled">
        <li v-for="post in subposts" :key="post.id" class="media m-3">
          <div
            v-if="
              post.data.thumbnail != 'self' && post.data.thumbnail != 'default'
            "
          >
            <img
              class="mr-3"
              :src="post.data.thumbnail"
              width="100"
              height="64"
              alt="img"
            />
          </div>
          <div v-else>
            <img
              class="mr-3"
              src="./assets/reddit-icon.png"
              width="100"
              height="64"
            />
          </div>

          <div class="media-body">
            <h5 class="mt-0 mb-1">
              <a :href="redirectUrl(post.data.permalink)" target="_">{{
                post.data.title
              }}</a>
            </h5>
            <p>
              👾 {{ post.data.author }} | 🗓️ {{ format(post.data.created) }}
            </p>

            <p>
              <span class="badge badge-info">{{ post.data.ups }} ☝️</span>
              |
              <span class="badge badge-info"
                >{{ post.data.num_comments }}✒️</span
              >
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import parse from "date-fns/parse";
// import distanceInWords from "date-fns/formatDistanceToNow";
export default {
  name: "App",
  data() {
    return {
      subposts: [],
      query: ""
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (this.query != "") {
        //call of the api
        const api = "https://www.reddit.com/" + this.query + "/top/.json";
        fetch(api)
          .then(response => response.json())
          .then(result => {
            console.log(result.data.children);
            this.subposts = result.data.children;
          });
      }
    },
    format(something) {
      const date = new Date(something * 1000);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "numeric",
        year: "numeric"
      });
      return formattedDate;
    },
    redirectUrl(posturl) {
      return `https://www.reddit.com` + posturl;
    }
  }
};
</script>

<style>
#tex {
  color: aliceblue;
  font-size: 12px;
}
</style>

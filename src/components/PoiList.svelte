<script>
  import { user } from "../store.js";
  import { getContext, onMount} from "svelte";
 
  const monumentService = getContext("MonumentService");

  let placeList = [];
  let userList = "";
  let userPlaces = [];
  let currentUser = "";
  
  onMount(async () => {
    const userEmail = $user.email
    
    placeList = await monumentService.getPlaces();
    userList = await monumentService.getUsers();
    currentUser = userList.find(user => user.email === userEmail);
    console.log("User id is: ", currentUser._id)
    userPlaces = placeList.filter(place => place.userid.indexOf(currentUser._id)
     !== -1);
  });

  async function placeView(place) {
    await monumentService.placeView(place);
      console.log(place.name)
      console.log(place._id)
    }
</script>

{#each userPlaces as place}
<div class="box">
    <h1>{place.name}</h1>
    <a href="/#/place/" on:click={placeView(place)} class="column">
      <i class="far fa-folder"></i>
    </a>
</div>
{/each}
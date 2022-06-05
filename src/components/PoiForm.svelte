<script>
  import { user } from "../store.js";
  import { getContext, onMount} from "svelte";
 
  const monumentService = getContext("MonumentService");

  let placeName = "";
  let message = "";
  let userid = "";
  let userList = "";
  let currentUser = "";
  
  onMount(async () => {
    const userEmail = $user.email
    userList = await monumentService.getUsers();
    currentUser = userList.find(user => user.email === userEmail);
  });

  export async function addPlace() {
    if(placeName) {
      userid = currentUser._id

      let success = await monumentService.addPlace(placeName, userid);
      console.log(placeName)
      console.log(success)
      if (success) {
        message = "Thank you for adding a place of interest!";
      }
      } else {
        message = "Error Trying to add place of interest";
        
    }
  }
</script>


<form on:submit|preventDefault={addPlace}>
  <div class="field">
    <label class="label" for="placeName">Enter Place Name</label> 
    <input bind:value={placeName} class="input" id="placeName"
                                                                  name="placeName" placeholder="Place name" type="text">
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-link is-light">Add</button>
    </div>
  </div>
  <div class="section">
    {message}
  </div>
</form>
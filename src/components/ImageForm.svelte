<script>
    import { user, placeV } from "../store.js";
    import { getContext, onMount } from 'svelte';;
    import { get } from "svelte/store";

    const monumentService = getContext("MonumentService");
    let monumentList = [];
    let categoryList = [];
    let placeMonuments = [];
    let placeList = [];
    let reloadPlace = "";
    let currentPlace = "";

    onMount(async () => {
      
      currentPlace = $placeV.name;
      console.log("current place is: ", currentPlace);
      monumentList = await monumentService.getMonuments();
      console.log("List of monuments: ", monumentList);
      
      placeList = await monumentService.getPlaces();
      console.log("List of places: ", placeList) 
      
      reloadPlace = placeList.find(place => place.name === currentPlace)
      console.log("Reload place is: ", reloadPlace);
      placeMonuments = monumentList.filter(monuments => monuments.placeid.indexOf(reloadPlace._id)
      !== -1);
      console.log("Current monument places: ", placeMonuments)  

      categoryList = await monumentService.getCategories();
      console.log("List of categories", categoryList);
    });

  let fileVar;
  let message = "";

  export async function submitForm(monument) {
// need monumentid and imagefile.
const monumentId = monument._id
const fileName = fileVar;
let success = await monumentService.addImage(fileName.name, monumentId);
      console.log("The uploaded file is: ",fileName)
      console.log(monumentId)
      if (success) {
        message = "Thank you for adding a place of interest!";
      } else {
        message = "Error Trying to add place of interest";
        
    }
  }
  </script>
  
  {#each placeMonuments as monument}
  <div class="box">
      <h1>{monument.name}</h1>
      <a href="/#/place/"  class="column">
      </a>
      <div>
        <form 
        on:submit|preventDefault={submitForm(monument)}>
          <input class="input" id="upload"
            type="file" 
            bind:files={fileVar}/>
          <br />
          <input class="button" type="submit" />
        </form>
      </div>
      <div class="section">
        {message}
      </div>
  </div>
  {/each}

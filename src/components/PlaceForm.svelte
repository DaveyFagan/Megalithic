<script>
    import { user, placeV } from "../store.js";

    import { createEventDispatcher, getContext, onMount } from 'svelte';
 
    import Coordinates from "./Coordinates.svelte";

    const dispatch = createEventDispatcher();
    
    const monumentService = getContext("MonumentService");
    let message = "";
    let name = "";
    let description = "";
    let categoryList = [];
    let categories = "";
    let lat = "";
    let lng = "";
    let rp = "";
    let placeList = [];
    
  
    onMount(async () => {
      
      const currentPlace = $placeV;
      console.log("current place is: ", currentPlace); 

      placeList = await monumentService.getPlaces();
      rp = placeList.find(place => place.name === currentPlace.name)

      const currentPlaceId = rp._id;
      console.log("Current place id is: ", currentPlaceId)

      categoryList = await monumentService.getCategories();
      console.log("List of categories", categoryList);
    });

  
    async function addMonument() {
      if (name && description && categories){
        const currentPlaceId = $placeV.placeid;
        const selectedCategory = categoryList.find(category => category.typeMonument === categories);
        console.log("The selected category is : ", selectedCategory);
        const monument = {
          name: name,
          description: description,
          location: 
          {
            lat: lat,
            lng: lng,
          },
          category: selectedCategory,
          placeid: currentPlaceId
        };
        const success = await monumentService.addMonument(monument);
        if (!success) {
          message = "Monument not added - some error occurred";
          return;
        }
        message = `Thanks! You added a monument`;
        dispatch("message", {monument: monument,})
      } else {
        message = "Please fill out all sections";
      }
    }
  

  
  </script>
  
  
  <form on:submit|preventDefault={addMonument}>
    <div class="field">
      <label class="label" for="name">Enter Monument Name</label> <input bind:value={name} class="input" id="name"
                                                                    name="name" placeholder="Monument name" type="text">
    </div>
    <div class="field">
      <label class="label" for="description">Enter Description</label> <input bind:value={description} class="input" id="description"
                                                                    name="description" placeholder="description" type="text">
    </div>
    <div class="field">
      <div class="select">
        <select bind:value={categories}>
          {#each categoryList as category}
            <option>{category.typeMonument}</option>
          {/each}
        </select>
      </div>
    </div>
    <Coordinates bind:lat={lat} bind:lng={lng}/>
    <div class="field">
      <div class="control">
        <button class="button is-link is-light">Add</button>
      </div>
    </div>
    <div class="section">
      {message}
    </div>
  </form>
  

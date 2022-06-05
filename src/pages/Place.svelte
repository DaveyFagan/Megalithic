<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import { placeV } from "../store.js"
    import PlaceForm from "../components/PlaceForm.svelte";
    import MonumentMap from "../components/MonumentMap.svelte";
    import ImageForm from "../components/ImageForm.svelte";
    import SatMap from "../components/SatMap.svelte";

    let monumentMap = null;
    let satMap = null;
    const placeName = $placeV.name;
    const placeId = $placeV.placeid;


    console.log("Place id for reload: ", placeId);
    console.log("name for reload: ", placeName);
    function monumentMade(event) {
    monumentMap.addMonumentMarker(event.detail.monument);
  }
  </script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
      <TitleBar subTitle={"Please add a monument"} title={"Monument Services Inc."}/>
    </div>
    <div class="column">
      <MainNavigator/>
    </div>
  </div>
  
  <div class="columns is-vcentered">
    <div class="column has-text-centered">
      <MonumentMap bind:this={monumentMap}/>
    </div>
    <div class="column box has-text-centered">
      <div class="column box has-text-centered">
        <SatMap bind:this={satMap}/>
      <h1 class="title is-4">{placeName}</h1>
   </div>
      <div class="column box has-text-centered">
        <PlaceForm on:message={monumentMade}/>
      </div>
    </div>
  </div>
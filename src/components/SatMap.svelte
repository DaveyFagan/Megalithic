<script>
   // import 'leaflet/dist/leaflet.css';
    import {SatMap} from '../services/sat-map';
    import {getContext, onMount} from 'svelte'
    import {placeV} from "../store.js"
    
  
    const monumentService = getContext("MonumentService");
    let recentPlaceMonument = "";
    let monumentList = [];
    let placeMonument = [];
    let lat = "";
    let lng = "";
 
  
    onMount(async () => {
      monumentList = await monumentService.getMonuments();
      console.log("The monuments are: ", monumentList)
      placeMonument = monumentList.filter(monument => monument.placeid.name === $placeV.name);
      console.log("The places monuments:", placeMonument)
      recentPlaceMonument = placeMonument[placeMonument.length-1]
      console.log("Most recent monumnet:", recentPlaceMonument)
      lat = recentPlaceMonument.location.lat;
      lng = recentPlaceMonument.location.lng;
      const mapConfig = {
       
       location: {lat: lat, lng: lng},
       zoom: 15,
       minZoom: 1,
     };
      const map = new SatMap("sat-map", mapConfig);
      console.log("mapconfig lat and lng:", mapConfig)
      map.showZoomControl();

      console.log("the lat and long are:", lat, lng)
    });

   
  </script>
  
  <div class="box" id="sat-map" style="height:300px">
  </div>
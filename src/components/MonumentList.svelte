<script>
  import {getContext, onMount} from 'svelte'
 

  const monumentService = getContext("MonumentService");
  let monumentList = [];

  onMount(async () => {
    monumentList = await monumentService.getMonuments();
  });
</script>



<table class="table is-fullwidth">
  <thead>
    <th>Place</th>
    <th>Name</th>
    <th>Description</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Category</th>
  </thead>
  <tbody>
    {#each monumentList as monument}
      <tr>
        <td>{monument.placeid.name}</td>
        <td>{monument.name}</td>
        <td>{monument.description}</td>
        <td>{monument.location.lat} </td>
        <td>{monument.location.lng}</td>
        <td>{monument.category.typeMonument}</td>
      </tr>
    {/each}
  </tbody>
</table>

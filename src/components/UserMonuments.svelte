<script>
    import {getContext, onMount} from 'svelte'
    import {placeV, user} from "../store.js"

    const monumentService = getContext("MonumentService");
    let monumentList = [];
    const currentUser = $user;
    let userList = [];
    let userId = "";
    let userMonuments = [];
    const unsignedUploadPreset = ''

    onMount(async () => {
      userList = await monumentService.getUsers();
      console.log("users: ", userList)
      const userDetails = userList.filter(user => user.email === currentUser.email)
      console.log("The current user details", userDetails)
      userId = userDetails[0]._id;
      console.log("The current user id is : ",userId) 
      monumentList = await monumentService.getMonuments();
      console.log("List of Monuments: ", monumentList)
      userMonuments = monumentList.filter(monuments => monuments.placeid.userid === userId);
      console.log("The users monuments are: ", userMonuments)
    });

    let fileVar;
    let message = "";

  export async function submitForm(monument) {
    // need monumentid and imagefile.
    
    var formData = new FormData();
    const monumentId = monument._id
    const fileName = fileVar;

console.log("the file name is:", fileName)
    formData.append("file", fileName[0], fileName.name)
    formData.append('upload_preset', unsignedUploadPreset);
    formData.append('tags', 'browser_upload');

    console.log("Form data is : ", formData)

    let success = await monumentService.addImage(formData, monumentId);
      console.log("The uploaded file is: ",fileName[0])
      console.log(monumentId)
      if (success) {
        message = "Thank you for adding a place of interest!";
      } else {
        message = "Error Trying to add place of interest";
        
    }
  }
  </script>
  
  
  <table class="table is-fullwidth">
    <thead>
      <th>Place</th>
      <th>Name</th>
      <th>Category</th>
      <th></th>
    </thead>
    <tbody>
      {#each userMonuments as monument}
        <tr>
          <td>{monument.placeid.name}</td>
          <td>{monument.name}</td>
          <td>{monument.category.typeMonument}</td>
          <td> <form 
            on:submit|preventDefault={submitForm(monument)}>
              <input class="input" id="upload"
                type="file" name="file"
                bind:files={fileVar}/>
              <br />
              <input class="button" type="submit" />
            </form>
         </td>
        </tr>
      {/each}
    </tbody>
  </table>
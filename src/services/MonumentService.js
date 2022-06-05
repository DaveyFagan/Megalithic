import axios from "axios";
import { identity } from "svelte/internal";
import { user, placeV } from "../store.js"

export class MonumentService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const monumentCredentials = localStorage.monument
    const placeCredentials = localStorage.placeV
    if (monumentCredentials) {
      const savedUser = JSON.parse(monumentCredentials)
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
    if (placeCredentials) {
      const savedPlace = JSON.parse(placeCredentials)
      placeV.set({
        placeid: savedPlace._id,
        name: savedPlace.name,
        
      })
    }
  }

  async placeView(place) {
    placeV.set({
      placeid: place._id,
      name: place.name,
      
    })
    localStorage.placeV = JSON.stringify({name:place.name, placeid:place._id});
    console.log(placeV)
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
          
        });
        localStorage.monument = JSON.stringify({email:email, token:response.data.token});
        console.log("user set is :", user)
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("monument");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      const as = await axios.post(this.baseUrl + "/api/users", userDetails);
      console.log(as)
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPlaces() {
    try {
      const response = await axios.get(this.baseUrl + "/api/places");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  async getMonuments() {
    try {
      const response = await axios.get(this.baseUrl + "/api/monuments");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + "/api/category");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  async addMonument(monument) {
    try {
      const response = await axios.post(this.baseUrl + "/api/places/" + monument.placeid + "/monuments", monument);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }

  async addPlace(placeName, userid) {
    try {
      const placeDetails = {
        name: placeName,
        userid: userid
      }
      // const response = await axios.post(this.baseUrl + "/api/places", placeDetails );
      await axios.post(this.baseUrl + "/api/places", placeDetails );
      // console.log(response)
      // return response.status == 200;
      return true;
    } catch (error) {
      return false;
    }
  }

  async addImage(fileVar, monumentId) {
    try {
      const monument = {
        img: fileVar,
        id: monumentId
      }
      console.log("The monument payload sent from addImage: ", monument)
      const response = await axios.post(this.baseUrl + "/api/monuments/" + monumentId + "/uploadimage", monument);
      console.log("Response to post request: ", response)
      return true;
    } catch (error) {
      return false;
    }
  }
  

  async getUserById(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/user/{id}");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  async getCategoryById(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/category/{id}");
      console.log(response.data);
      return response.data
    } catch (error) {
      return [];
    }
  }

  
}


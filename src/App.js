/* 
  Copyright (c) 2023 Promineo Tech
  Author:  Promineo Tech Academic Team
  Subject:  React Week 15 - REST, Fetch, Functional Components, and Best Practices
  FE Lab Week 15
*/

/* ----------------------------------------------------- */
// Key Term List:
// REST
// RESTful API
// CRUD: Create Read Update Delete
// HTTP Methods: POST, GET, PUT/PATCH, DELETE
// Fetch
// Functional Component
// Spread Operator
// Destructuring
// Hooks
// useState
// useEffect
// Async/Await
// JSON.stringify()
// fetch(URL, options)
// onClick={(e) => myFunction(e)}
// onChange={(e) => setState(e.target.value)}
// onSubmit={(e) => myFunction(e)}
//          // e.preventDefault()
//


/*-- ALL IMPORTS HERE -- */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

import {PersonVcard} from 'react-bootstrap-icons';
import {Journals} from "react-bootstrap-icons";
import {PersonGear} from "react-bootstrap-icons";
import {Trash3} from "react-bootstrap-icons";
import {Magic} from "react-bootstrap-icons";
// Ideally this would be import * as Icon from 'react-bootstrap-icons' either here or index.js; instead - but this works for now!

import './App.css'
import {useState, useEffect} from 'react'


function App() {
  /* -- YOUR CODE/CRUD OPERATIONS HERE --*/

  const API_URL = "https://64f42331932537f4051a219d.mockapi.io/players"

  const [players, setPlayers] = useState([{}])

  /*
  const [players, setPlayers] = useState([{
    playername: "Jessica Helmers",
    charname: "Thaddeus J. Sunflowershield",
    charclara: "Gnome Ranger",
    groupname: "Terra Elemental",
  }])

  console.log(players);

  // Set useState as the array info for each player's attibutes (info)
      Current console.log will show what is the default CONST info and then updated from API in getPlayers function below */

// Add new Plauyer and array data set (attributes)

  const [newPlayerPlayername, setNewPlayerPlayername] = useState('')
  const [newPlayerCharname, setNewPlayerCharname] = useState('')
  const [newPlayerCharclara, setNewPlayerCharclara] = useState('')
  const [newPlayerGroupname, setNewPlayerGroupname] = useState('')

// Updated array items for each data set

  const [updatedPlayerPlayername, setUpdatedPlayerPlayername] = useState('')
  const [updatedPlayerCharname, setUpdatedPlayerCharname] = useState('')
  const [updatedPlayerCharclara, setUpdatedPlayerCharclara] = useState('')
  const [updatedPlayerGroupname, setUpdatedPlayerGroupname] = useState('')

// Create 4 functions: getPlayers(){}, deletePlayer(){}, updatePlayer(){}, and postNewPlayer(){} - replaced "user" with "player" for my API
/* Step 2: In our getUsers function:
*         1) Use fetch(URL) to get from the API
*         2) Convert the data to JSON
*         3) setUsers() to result of that data.
*/

  function getPlayers(){
    fetch(API_URL)
    .then(data => data.json())
    .then(data => setPlayers(data))
  }

  useEffect (() => {
    getPlayers()
    console.log(players)
  }, [])

  /* Network call from MockAPI for D&D "players" endpoint
  *  Make readable in .json
  *  console.log for confirmation/review of what is returned from API call - .then(data => console.log(data))
  *  Take data, setPlayers to be whatever is response-d back from API
  *  Run useEffect function to display getPlayers whenever component re-renders
  *  Use empty Array to only run once for App
  *  console.log for confirmation/review of what is returned from API call
  * */


/** Reminder: fetch(url, {options})
 *
 * Step 1: Put id as a parameter in our deleteUser() function, and update
 *         our URL in fetch(API_URL) with the id parameter.
 * Step 2: Add method: "DELETE" key/value pair to our options object
 * Step 3: call .then(() => getUsers()) after your fetch() to ensure that our component
 *         gets re-rendered with the updated information.
 */

  function deletePlayer(id){
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => getPlayers())
  }

/**
 * Step 1: Inside our postNewUser() function, set up fetch() to POST.
 *         Reminder: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * Step 2: Create 3 new variables with useState(): newPlayerName, newPlayerCharname, newPlayerCharclara, newPlayerGroupname
 *         Set them to an empty string
 *         Update the body: {} part of our fetch() to POST with our new variables.
 */

  function postNewPlayer(event){

    event.preventDefault()

    console.log("New Player Added: "+ newPlayerPlayername, newPlayerCharname, newPlayerCharclara, newPlayerGroupname)

/*
    let data = {
      playername: newPlayerPlayername,
      charname: newPlayerCharname,
      charclara: newPlayerCharclara,
      groupname: newPlayerGroupname,
    }

    This could be used and then (data) called in "body" of below script or the full API list of 
    data attributes added into the "body" JSON.stringify element directly - either way works.
*/

    fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        playername: newPlayerPlayername,
        charname: newPlayerCharname,
        charclara: newPlayerCharclara,
        groupname: newPlayerGroupname,
      })
    })

    .then(() => getPlayers())

  }

  /*
  * Add headers and make sure contains above Content-Type for proper receipt of new data
  * If missing, will POST data that back-end doesn't know how to read or parse into correct location
  * Could use "let" and then put "data" in after JSON.stringify with same results
  */


 /* Step 1: Set up fetch() to UPDATE in our updateUser() function.
  *         Pass in playerObject as a parameter.
  *         Be sure to update the URL with playerObject.id
  *         Reminder: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  *         Consider the necessary options key:value pairs; method/headers/body
  *
  * Step 2: Create 3 new variables with useState() like we did for POST, but for UPDATE:
  *         updatedName, updatedJobTitle, and updatedCompanyName
  *
  * Step 3: Inside the updateUser() function body, create a new variable: updatedplayerObject
  *         updatedplayerObject should be playerObject, with it's updated name/title/company name
  *
  */

  function updatePlayer(event, playerObject){

    event.preventDefault()

    let updatedPlayerObject = {
      ...playerObject, 
      playername: updatedPlayerPlayername,
      charname: updatedPlayerCharname,
      charclara: updatedPlayerCharclara,
      groupname: updatedPlayerGroupname,
    }

    // Let all value pairs for playerObject pass through, then update values

    fetch(`${API_URL}/${playerObject.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPlayerObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    .then(() => getPlayers())

  }

// Use "players.json" to reset the MockAPI list when done testing CRUD operations ////////////////////////////////////

  return (
    <div className="App">
      
      { <div className="appTitle"><h1>D&D Player Book</h1></div>
      }

      {
/* CODE BELOW: PART: 5.3 Connecting our POST 
 *         Create a form above your .map method to post a new user.
 * 
 *         Use the onChange property and setMyVariable() on each corresponding input
 * 
 *         Connect your postNewUser() function to your form button.
 *              We do need event.preventDefault() because it's inside of a form.
 * 
 *         You should now be POSTing new users! Is your state re-rendering?
 *            If not, your hint in how is in Part 2: Setting up DELETE
 *
 *  e. or event.target.value is what is being typed by end-user, then the value of that input is being set as 
 *  whichever setNew{attribute} is being entered and then saved, added to API, and shown in the table
 * 
 *  Make Player card element into table for displaying information and making styling easier (after tutorial!)
 *  or use <div className='playerDescription'> for all Labels and Details to style all elements
 */
        <div className='container formNewPlayer'>
          <form>
            <h3>Add a New Player <PersonVcard/></h3>
            <p className='crudOperation'>(POST/CREATE)</p>
            <label>Player Name</label><br/>
            <input onChange={(event) => setNewPlayerPlayername(event.target.value)} 
            placeholder="Enter the player's name..."></input>
            <br/>
            <label>Character Name</label><br/>
            <input onChange={(event) => setNewPlayerCharname(event.target.value)}
            placeholder="Jackmerius Tacktheratrix"></input>
            <br/>
            <label>Character Race/Origin & Class</label><br/>
            <input onChange={(event) => setNewPlayerCharclara(event.target.value)}
            placeholder="Dwarf Barbarian, etc."></input>
            <br/>
            <label>Adventuring Group/Guild Name</label><br/>
            <input onChange={(event) => setNewPlayerGroupname(event.target.value)}
            placeholder="Baldur's Greatest"></input>
            <br/>
            <div className='btn-center'><button onClick={(event) => postNewPlayer(event)} className='btn btn-primary'>Submit</button></div>
          </form>
        </div>
 }

  {<div className="appTitle2"><h1>Alter Player Characteristics <Magic/></h1></div>}

      {players.map((player, index) => (
        <div key={index} className='playerCard container'>
            <div className='playerInfo'>
              <h3>Player Info <Journals/></h3>
              <span className='playerLabel'>Player Name:</span><br/>
              <span className='playerDetails'>{player.playername}</span><br/>
              <span className='playerLabel'>Character Name:</span><br/>
              <span className='playerDetails'>{player.charname}</span><br/>
              <span className='playerLabel'>Character Race/Origin & Class:</span><br/>
              <span className='playerDetails'>{player.charclara}</span><br/>
              <span className='playerLabel'>Adventuring Group:</span><br/>
              <span className='playerDetails'>{player.groupname}</span><br/>
              <div className='btn'><button onClick={() => deletePlayer(player.id)} className='btn btn-danger'>
                Remove Player <Trash3/></button></div>
            </div>
            <form className='formUpdatePlayer'>
              <h3>Change/Update Player Info <PersonGear/></h3>
              <p className='crudOperation'>(PUT/UPDATE)</p>
              <p>Be sure to copy all current info and submit with changes.</p>
              <label>Player Name</label><br/>
              <input onChange={(event) => setUpdatedPlayerPlayername(event.target.value)} 
              placeholder={player.playername}></input>
              <br/>
              <label>Character Name</label><br/>
              <input onChange={(event) => setUpdatedPlayerCharname(event.target.value)}
              placeholder={player.charname}></input>
              <br/>
              <label>Character Race/Origin & Class</label><br/>
              <input onChange={(event) => setUpdatedPlayerCharclara(event.target.value)}
              placeholder={player.charclara}></input>
              <br/>
              <label>Adventuring Group/Guild Name</label><br/>
              <input onChange={(event) => setUpdatedPlayerGroupname(event.target.value)}
              placeholder={player.groupname}></input>
              <br/>
              <div className='btn-right'><button onClick={(event) => 
                updatePlayer(event, player)}className='btn btn-dark'>Update Info</button></div>
            </form>
        </div>
      ))}

      {/* CODE BELOW: PART 5.1: Connecting our GET:
          .map over our users variable and display every users name/jobTitle/companyName */

/*   * Step 2: Connecting our DELETE:
 *         Under our map, give every user a button to delete. Return of the trash-bin: 🗑
 *             It's not in a form, so we don't need event.preventDefault(). This is needed in a form to
 *             control re-rendering when changes are made.
 *
 *         Use .then(() => getUsers()) after our fetch to re-render the page with the updated information.
*/

/*  PART 5.4: Connecting our UPDATE
 *     1)  There's MANY ways to handle UPDATE.
 *         For this example, we're going to give every user a form to update their data attributes
 *
 *     2)   Inside our .map() method, below our delete button,
 *          create a new form with labels/inputs for
                * playername: updatedPlayerPlayername,
                * charname: updatedPlayerCharname,
                * charclara: updatedPlayerCharclara,
                * groupname: updatedPlayerGroupname,
 *          Include a button at the bottom (this will update on click).
 *
 *     3)   Set up the onChange property on your inputs similiar to Step 3: Connecting our POST
 *     4)   Give your button an onClick property. Connect your updateUser() function to it.
 *          For this function, we have two goals:
        *       1. Prevent the button from refreshing the page
        *       2. Pass in a an entire user object.
 *          Set up your onClick to do both.
 *
 *     5)   Test it out! Your update should now be working!
 *          Make sure the page is re-rendering with the updated information
 *          and not refreshing the page.
 *
 * Optional: Set the input values in your update form to be equal to user.name/user.jobTitle etc,
 *           so they don't initially submit empty strings.
*/}

    </div>
  )
}

export default App

/**
 *     While this lab focused mostly on functionality over practicality,
 *     here's a couple ideas you can try implementing to make the UI/UX more user-friendly:
 *
 *    1: Having a form laid out for EVERY user isn't very UI friendly, nor realistic.
 *       Consider using a styling library like Bootstrap React/MaterialUI/SemanticUI to put
 *       each of those forms in a modal. The form inside the modal only pops up when a
 *       "update user" button gets clicked, and only updates the user when that modal gets submitted.
 *
 * Docs: https://react-bootstrap.github.io/components/modal/
 *
 *
 *    2: Organize the users somehow. You can use a table, CSS grid/flex.
 *       Possibly put all the users in a container, and look at the CSS property overflow:
 *
 * Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 *
 */

# Bus stops interview task

Your have to implement simple board for bus stops. Directory `docs` contains `openapi` specification for the `api` response - feel free to play with that to check how api was implemented. <strong>Don't install any other library</strong>

# Solution Notes

Added dependencies:

```
@types/node - Added to support type for 'process.env'
```

Code design notes:

- For ui not to be blocked while app is fetching data and store is being initialised, store contains `StoreActionStates`.

  - data fetching - store `actionState`: `loading` - user sees skeleton for the content
  - network error/ error fetching data - store `actionState`: `error` - redirecting to error page
  - data fetching complete, but store data structure has not being set up - `actionState`: `loaded` - user sees bus line buttons in desabled state
  - data exists in structured format and is ready to be accessed - `actionState`: `initialised` - user can see enabled bus lines and interact with data

- Data is stored in Javascript Map (`store.state.schedule`) and is accessed through store getters
- Components interact with store via actions, actions commit mutations, mutations update state

- For consistency Composition API is used throughout all components of the app to make project code consistent and clean. For a real project, alternative would be to define project-wide rule of when each of the styles make more sense per components. (For example, options API could be a cleaner choice than composition API for stateless UI components which require reactive props)

Possible future improvements:

- Add mocks for integration testing simulation
- Unit tests for util functions would be nice :)
- Define and enforce formatting rules - for example use prettier
- Use eslint accessibility plugin
- Use bootstrap utilities and maps for more consistent style rules, define body color, secondary color and etc.

## Required environment

`npm 8.11` and `node 16.15`

## Installed packages ready to use

    "axios": "^0.27.2",
    "bootstrap": "^5.2.1",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0"
    "sass": "^1.32.7",
    "typescript": "~4.5.5"

`Font: Inter 300, 400, 500, 700`

## Required open ports in environment

`8080` - for the Vue application <br/>
`3000` - for the API server

## How to start environment

1. `npm install` - install dependencies
2. `npm run api` - run the API
3. `npm run serve` - for the Vue application

## User stories

1. As a user I can open the url `http://localhost:8080` and see entry page with listed lines (https://www.figma.com/file/Dj4FdiwG7uYUqV8ml7xKSL/Interview-Task---Frontend-Dev?node-id=2%3A57)

   1. User can see title "Stops Board"
   2. User can see navigation with links "Lines" and "Stops" ("Lines" is active link)
   3. User can see listed "lines". The "lines" should be sorted in the ascending order
   4. User can see placeholder "Please select a line"
   5. User can click at line
      1. Placeholder disappear and user can see listed stops. Stops should be sorted ascending by field `order` from the api (https://www.figma.com/file/Dj4FdiwG7uYUqV8ml7xKSL/Interview-Task---Frontend-Dev?node-id=701%3A27993)
      2. Use can see placeholder "Please select a stop"
   6. User can click at stop when line is selected
      1. Placeholder about selecting the stop disappear
      2. User can see listed hours for the selected stop sorted (https://www.figma.com/file/Dj4FdiwG7uYUqV8ml7xKSL/Interview-Task---Frontend-Dev?node-id=701%3A36989)

2. As a user I can open the url `http://localhost:8080/stops` and see "stops" page with listed stops (https://www.figma.com/file/Dj4FdiwG7uYUqV8ml7xKSL/Interview-Task---Frontend-Dev?node-id=701%3A38100)
   1. User can see title "Stops board"
   2. User can see navigation with links "Lines" and "Stops" ("Stops" is active link)
   3. User can see the search bar
   4. User can see listed "stops" sorted in the descending order
   5. User can filter list by the search bar
      1. The "stops" list should be filtered after user input
      2. If search bar is empty all stops should be visible

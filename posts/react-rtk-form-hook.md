---
title: 'Using React + RTK Query + React Hook Form'
date: '2022-11-18'
---
Something I've used in the past to call my APIs inside my React applications is RTK Query. If you are already using Redux in your application this is a nobrainer.

Note: In this article I am assuming that you already have an API you want to call. If you want to see how I've built my tasks API, then read my post about it.

First thing you need to do is define your APIs. I am going to start this with a very basic example of listing tasks.

I know that the response from calling my tasks API would be an array of tasks, that will look like this: 
```json
[
  {
    "id": 1,
    "title": "Clean my room",
    "done": false
  },
  {
    "id": 2,
    "title": "Water the plants",
    "done": true
  }
]
```

So what I am going to do is define an interface that will reflect that: 

```ts
interface ListTasksResponse {
  id: number;
  title: string;
  done: boolean;
}
```


```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// the name of my api e.g. tasks + Api
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    // The URL for the APIs that allow me to list/modify my tasks
    baseUrl: `/api/tasks`,
  }),
  endpoints: (builder) => ({
    // The definition of my endpoint - request method, response type, request values type
    tasks: builder.query<ListTasksResponse, void>({
      query: () => `/`,
    }),
  }),
});

// Exporting the call to list my tasks - "use" + {endpoint name} + {call type; here "query"}
export const { useTasksQuery } = tasksApi;

```

Steps to do that: 
 - Give your API a name - I use whatever the object is I am going to be listing/modifying e.g. `tasks` + `Api`
 - My request needs to be in the form of a GET request to `https://todanni.com/api/tasks`
   - Set the base URL for your API - in my case that would be `/api/tasks` since my API is served on the same domain - todanni.com
   - I add a record to the endpoint for `tasks`, which is how I am going to call my get tasks API later on
   - This record is a `query` because that's the equivalent of a GET request for RTK Query
   - The request is sent to `/` because there's nothing else to add to my path - result is as we want it to be `https://todanni.com/api/tasks/`

Once your API is defined, you need to add that to your store so you can use it. Go to your `store.ts` file and add it to your store like so: 

```ts
import { tasksApi } from '../api/tasks';

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			tasksApi.middleware,
		]),
});
```

Now I can use the API in my component that will display all of my tasks. RTK Query provides some very useful methods for you to make your UI responsive, such as `isLoading`, `error`, `isSuccess`:

```tsx
import { useTasksQuery } from '../../api/tasks';

export default function ListTasksPage(){
  // This is how we call the API
  const { data, error, isLoading, isSuccess } = useTasksQuery();

  return (
    <div>
      {/* If the API call isn't finished, don't display anything */}
      {isLoading && <div/>}
      
      {/* If the API call returned and error, display the error */}
      {error && <h1> error </h1>}

      {/* If the API call was successful, you can use the values from it */}
      {isSuccess && (
        <div>
          {data.map((task) => (
            <TaskCard
              id={task.ID}
              title={task.title}
              done={task.done}
            />
          ))}
        </div>
      )}
  </div>
  );
}
```




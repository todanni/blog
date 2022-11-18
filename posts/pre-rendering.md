---
title: 'Using Vault to secure your GitHub workflows'
date: '2022-11-01'
syntax: go
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

```js
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

```

```go
// Parse the body of the request to get the email of the invited user
var requestBody models.DashboardCreateRequest
err = json.NewDecoder(r.Body).Decode(&requestBody)
if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
}
```
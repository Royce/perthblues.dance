# A website for Perth Blues Dancing in Perth

I use **Gatsby + GraphQL + ReactJs** and a bunch of plugins to turn markdown and yaml into a very boring and not very pretty [website about blues music and dancing](http://perthblues.dance).

There is a bit of TypeScript in there amongst the Javascript, but honestly I'm not really using the full extend of the type-checking that TypeScript is all about. Maybe later!?

There's some experimentation with runtime typechecking (because the Gatsby queries[^1] are strings and could return anything) using `fp-ts` and `io-ts`. I don't love it, but I don't hate it either.

I deploy using Amazon S3.

[^1]: I think since I started this website, Gatsby added a nicer way of using typed GraphQL queries.

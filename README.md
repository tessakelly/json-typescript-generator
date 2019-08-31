# json-typescript-guesser

Try it here: [mchalk.github.io/json-typescript-guesser](https://mchalk.github.io/json-typescript-guesser)

This project generates Typescript interfaces that describe whatever JSON you put in. For example,

```json
{
  "document": [{
    "title": "Document 1",
    "score": 0.98
  }, {
    "title": "Document 2",
    "score": 0.76,
    "new": true
  }]
}
```

would be converted to:

```typescript
export interface Type {
  document: Array<Document>;
}

export interface Document {
  title: string;
  score: number;
  new?: boolean;
}
```

Generating type interfaces like this can be a useful starting point when working with complex JSON objects in Typescript such as large API responses.

---

Issues and contributions welcome.

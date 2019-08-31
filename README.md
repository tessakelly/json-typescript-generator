# json-typescript-generator

Try it here: [m-chael.github.io/json-typescript-generator](https://m-chael.github.io/json-typescript-generator)

This project generates TypeScript interfaces that describe whatever JSON you put in. For example,

```json
{
  "documents": [{
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

Generating type interfaces like this can be a useful starting point when working with complex JSON objects in TypeScript such as large API responses.

---

Issues and contributions welcome.

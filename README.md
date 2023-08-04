# Location Tracking Test

Hasura / GraphQL / URQL / React + Vite / React Native + Expo

[Hasura Console](https://cloud.hasura.io/project/57b9a7ff-0d40-4904-aaaa-1ffe2aa03e85/console/api/api-explorer)

## Get Started

Console:

```
cd web-console
npm i && npm run dev
```

Expo app:

```
cd expo-app
npm i
npm start
```

GraphQL types generated in both. Admin secret in `.env` to auth Hasura introspection then:

```
npm run codegen:watch
```

Also see https://github.com/byCedric/office-marathon

WIP

Location tracjing kinda working in bg?
Neither new dev build or prod apk build show fg notification though

Next: Try build of actual office marathon app? ...although this is most of it so f knows...

Actually try adding expo notifications next https://github.com/expo/expo/issues/22445

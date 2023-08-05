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

## WIP

- Location tracking works for both platforms on dev builds
- FG service notification on Android displaying
- Works real world on Android
- URQL in task works + plots back on map.
- NEXT: offline exchanges + cache for urql

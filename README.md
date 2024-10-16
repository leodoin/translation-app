# About this project
This is a monorepo project for a realtiem translations web based app.
Client app run based on nextjs and server app is a simple node.js express app.


# WEB APP URL
[https://translation-app-web.vercel.app/](url)

# Running locally

turborebo setup will launch and watch all apps under ./apps/* with:
```sh
yarn dev
```

# CI
Client is hosted on vercel and server is hosted on gcloud. Both are automaticaly deployed on pushes to to the main brach with any changes under apps/web/* or apps/api/*

# task list
- [x] CI setup
- [x] multi language translation input fileds with onclick translations
- [ ] add voice recording supprot
- [ ] add voide streaming with realtime tranlations
- [ ] add ability to sync two users via QR code
- [ ] add security and auth 

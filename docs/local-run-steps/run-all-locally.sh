## 1 clone

git clone -b master git@github.com:Jamespot/jamespot-user-api.git
git clone -b master git@github.com:Jamespot/jamespot-react-components.git
git clone -b master git@github.com:Jamespot/jamespot-react-core.git
git clone -b master git@github.com:Jamespot/jamespot-react-extensions.git
git clone -b main git@github.com:Jamespot/jamespot-react-appstudio.git
git clone -b master git@github.com:Jamespot/jamespot-react-boilerplate.git
git clone -b master git@github.com:Jamespot/jamespot-dev-proxy.git


## 2 build

cd jamespot-user-api
npm install
npm run build
cd ..

cd jamespot-react-components
npm install
npm run build
cd ..

cd jamespot-react-core
npm install
npm run build
cd ..

cd jamespot-react-extensions
npm install
npm run build
cd ..

cd jamespot-react-appstudio
npm install
cd ..

cd jamespot-react-boilerplate
npm install
cd ..

cd jamespot-dev-proxy
npm install
cd ..

# 👨‍💻👨‍💻👨‍💻 (in second terminal)
## 3 run storybook 

# cd jamespot-react-components
# npm run storybook


# 👨‍💻👨‍💻👨‍💻 (in other terminal) 
## 4 run local server

# 📦 core
# cd jamespot-react-core
# npm run local

# 📦 extensions
# cd jamespot-react-extensions
# npm run local

# 📦 appstudio
# cd jamespot-react-appstudio
# npm run local

# 📦 boilerplate
# cd jamespot-react-boilerplate
# npm run local


# 👨‍💻👨‍💻👨‍💻 (in other terminal) 
## 5 run dev proxy 

# 🪧 change domain in recipes/jamespot-react/index file !!
# cd jamespot-dev-proxy
# node recipes/jamespot-react/index.js


## 6 visit 

# https://jamespot.proxy:3443/ng/r/app/studio
# https://jamespot.proxy:3443/ng/r/group/create

# https://jamespot.proxy:3443/react-core/app.bundle.js
# https://jamespot.proxy:3443/react-extension/app.bundle.js
# https://jamespot.proxy:3443/react-boilerplate/app.bundle.js
# https://jamespot.proxy:3443/react-appstudio/app.bundle.js

# https://jamespot.proxy:3444/ng/r/app/studio?debug_REACT_USE=1&debug_REACT_USE_LOCAL=1


## 7 extra 
# 🪧 activer JSHook sur la plateforme
# 🪧 désactiver le CDN
# (+ de détails note `docs/settingUpReact_V3.md`)
## 1 clone

git clone -b master git@github.com:Jamespot/jamespot-user-api.git
git clone -b master git@github.com:Jamespot/jamespot-react-components.git
git clone -b master git@github.com:Jamespot/jamespot-react-core.git
git clone -b master git@github.com:Jamespot/jamespot-react-extensions.git

## 2 build

cd jamespot-user-api
npm install
# build is triggered after npm install (see npm prepare)
cd ..

cd jamespot-react-components
npm install
# build is triggered after npm install (see npm prepare)
cd ..

cd jamespot-react-core
# TEMP HACK TO SOLVE cb() never called ----- lié aux projets imbriqués je pense (user-api + compo)
rm package-lock.json
# npm cache clean --force
# TEMP HACK -----
npm install
npm run build
cd ..

cd jamespot-react-extensions
# TEMP HACK TO SOLVE cb() never called ----- lié aux projets imbriqués je pense (user-api + compo + core)
rm package-lock.json
# npm cache clean --force
# TEMP HACK -----
npm install
npm run build
cd ..

## 3 use

echo "🎸🎸🎸🎸"
ls ./jamespot-react-core/build
echo "🛼🛼🛼🛼"
ls ./jamespot-react-extensions/build

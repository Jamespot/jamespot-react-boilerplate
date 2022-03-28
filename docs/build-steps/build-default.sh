## 1 clone

git clone -b master git@github.com:Jamespot/jamespot-user-api.git
git clone -b master git@github.com:Jamespot/jamespot-react-components.git
git clone -b master git@github.com:Jamespot/jamespot-react-core.git
git clone -b master git@github.com:Jamespot/jamespot-react-extensions.git

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

## 3 use

echo "🎸🎸🎸🎸"
ls ./jamespot-react-core/build
echo "🛼🛼🛼🛼"
ls ./jamespot-react-extensions/build

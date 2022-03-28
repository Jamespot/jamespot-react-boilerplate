# Bundle analyze

Voici un petite procédure pour analyzer notre bundle avec webpack-bundle-analyzer

https://github.com/webpack-contrib/webpack-bundle-analyzer

Tous d'abord, le mieux est d'installer la lib en dépendance global et non sur chaque projet

    npm install -g webpack-bundle-analyzer

Ensuite, il faut compiler notre bundle avec des options de profile qui génére un json

https://webpack.js.org/api/stats/

    # Webpack 4
    npx webpack --profile --json > compilation-stats.json

    # Webpack 5
    npx webpack --profile --json=compilation-stats.json

Une fois le fichier json générer il suffit de lancer l'analyzer. Celui-ci lance un petit serveur qui est accessible via navigateur pour visualiser la composition du bundle.

    webpack-bundle-analyzer compilation-stats.json

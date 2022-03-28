Anciennes notes indiquant comment utiliser une VM local avec les projets react.

🎅 Notes probablement obsoletes.

////////////////////////////////////////////////////////////////////

# Run sur VM de dev
Se connecter en ssh sur la VM
```
    ssh root@k2018
```

Ouvrir une console sur le pod dédié au core
```
    k_exec node-react-core /bin/sh
```
De rendre dans le proet core
```
    cd react/jamespot-react-core
```
Lancer le projet
```
    npm run dev
```

Ouvrir une console sur le pod dédié à votre projet
```
    k_exec node-react-extension /bin/sh
```
De rendre dans le projet extension
```
    cd react/jamespot-react-extension
```
Lancer le projet
```
    npm run dev
```


////////////////////////////////////////////////////////////////////

# Setup react environment on computer/VM

## Make dir and Git clone

    cd C:\jamespot\svn_davinci\github
    git clone https://github.com/Jamespot/jamespot-react.git

## Add host to computer

    192.168.56.110  react-jamesdev.jamespot.pro
    192.168.56.110  storybook-jamesdev.jamespot.pro

## Add host to VM

    127.0.0.1 react
    127.0.0.1 storybook
    192.168.56.110  vm

## Install package :

    apt-get install npm
    npm install -g npx

## Install service

    cd /fslinks
    ln -s /home/local/jamespot/svn_davinci/projets/jamespot_pro/dev/ .
    cd dev
    ln -s /fslinks/dev/React.service /etc/systemd/system/multi-user.target.wants/
    ln -s /fslinks/dev/Storybook.service /etc/systemd/system/multi-user.target.wants/
    systemctl daemon-reload
    systemctl enable React.service
    systemctl enable Storybook.service
    systemctl start React.service
    systemctl start Storybook.service

## Add to jpro/inc/constants-local.i.php

    JPUtils::defineEnvDefault("REACT_PORT", 3021);
    JPUtils::defineEnvDefault("REACT_HOST", "https://react-jamesdev.jamespot.pro:" . REACT_PORT);

## If setup is correct

https://react-jamesdev.jamespot.pro:3021/

https://storybook-jamesdev.jamespot.pro:3023/
No newline at end of file

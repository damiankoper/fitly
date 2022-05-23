# Fitly

## Dataflow setup

Every command is intenden to be executed from workspace root.

### General
Make sure to have `nx` and dependencies installed
```bash
$ npm install -g nx
$ npm install
```

If you want to non-docker ML setup install `pipenv`, python 3.9 and dependencies
```bash

$ sudo apt install pipenv python3.9 # Ubuntu
$ nx run ml:install-all # or "pipenv install --skip-lock"
```

Copy `.env.example` to `.env` and fill it:
1. Replace `localhost` in `BRIDGE_BASE_URL` with your server IP address.
2. Fill FTP data

#### ML

To run ML server in docker execute:
```bash
$ docker-compose --project-directory apps/ml up
```

To run ML in venv execute:
```bash
$ nx run ml:serve
```

#### ML-Bridge

To run bridge execute:
```bash
$ nx run ml-bridge:serve
```

#### Ui-mobile

First you have to bootstrap nx integration with react-native (once)
```bash 
$ nx run ui-mobile:ensure-symlink
$ nx run ui-mobile:sync-deps
```

Then run the app with your phone plugged in and USB debugging enabled
```bash 
$ nx run ui-mobile:run-android
```

To connect to MetaWear band:
1. **DO NOT** pair the band with your phone in Bluetooth settings;
2. give the app premission to location in Android settings;

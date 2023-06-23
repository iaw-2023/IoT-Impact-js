#!/bin/bash

source /home/wecher/Scripts/telegram.sh

send "Starting deploy: Burger Planet (react)"

# Para que funcione sin problemas NPM
#export NVM_DIR="/home/wecher/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


echo "ACTUALIZANDO REACT"
cd /home/wecher/Git/IoT-Impact-js/
git pull
npm install
npm run build

send "End deploy: Burger Planet (react)"

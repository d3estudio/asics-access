echo INITIALIZING DEPLOY

if [ "$1" = "production"  ]; then
    REMOTEIP="107.170.123.42"
elif [ "$1" = "staging"  ]; then
    REMOTEIP="162.243.29.123"
else
    echo "should run 'deploy.sh production' or 'deploy.sh staging'"
    exit 0
fi

if [ "$2" = "--soft"  ]; then
    SCRIPT="bash scripts/prod-soft.sh"
elif [ "$1" = "--softest"  ]; then
    SCRIPT="echo DONE"
else
    SCRIPT="bash scripts/prod.sh"
fi

ssh -T asics@$REMOTEIP bash -c "'
echo ENTERING FOLDER
cd asics-access

echo PULLING UPDATES FROM GIT MASTER
git fetch --all
git reset --hard origin/master

${SCRIPT}
'"

echo DEPLOY COMPLETED

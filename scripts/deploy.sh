echo INITIALIZING DEPLOY

if [ "$1" = "production"  ]; then
    REMOTEIP="107.170.123.42"
elif [ "$1" = "staging"  ]; then
    REMOTEIP="162.243.29.123"
else
    echo "should run 'deploy.sh production' or 'deploy.sh staging'"
    exit 0
fi

ssh asics@$REMOTEIP <<'ENDSSH'
echo ENTERING FOLDER
cd asics-access
bash scripts/prod.sh
ENDSSH

echo DEPLOY COMPLETED

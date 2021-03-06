set -e # stop if any of these commands fail

if [ "$DISABLE_BACKUP" = "TRUE"  ]; then
    echo "DATABASE AUTO BACKUP DISABLED"
    exit 0
fi

: ${POSTGRES_USER:?"--POSTGRES_USER is not set"}
: ${AWS_ACCESS_KEY_ID:?"-e AWS_ACCESS_KEY_ID is not set"}
: ${AWS_SECRET_ACCESS_KEY:?"-e AWS_SECRET_ACCESS_KEY is not set"}
: ${S3_BUCKET_NAME:?"-e S3_BUCKET_NAME is not set"}
: ${PREFIX:?"-e PREFIX is not set"}

echo "Cleaning env file..."
> /tmp/env.sh
echo "Writing env file..."
cat <<EOT >> /tmp/env.sh
export POSTGRES_USER=${POSTGRES_USER}
export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
export S3_BUCKET_NAME=${S3_BUCKET_NAME}
export PREFIX=${PREFIX}
EOT


echo "Fixing Permissions..."
chmod +x /code/run-backup.sh

echo "Creating log file..."
touch /code/cron.log


echo "Writing crontab file..."
cat /code/crontab-source | crontab -

echo "Starting cron daemon..."
service cron start

echo "Tailing logs"
tail -f /code/cron.log

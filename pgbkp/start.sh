set -e # stop if any of these commands fail

: ${POSTGRES_HOST:?"--POSTGRES_HOST is not set"}
: ${AWS_ACCESS_KEY_ID:?"-e AWS_ACCESS_KEY_ID is not set"}
: ${AWS_SECRET_ACCESS_KEY:?"-e AWS_SECRET_ACCESS_KEY is not set"}
: ${S3_BUCKET_NAME:?"-e S3_BUCKET_NAME is not set"}
: ${PREFIX:?"-e PREFIX is not set"}

# Write out runtime ENV vars so that cron can load them in.
echo "Writing env file..."
env > /tmp/env.sh

echo "Starting cron daemon..."
service cron start

echo "Tailing logs"
tail -f /code/backups-cron.log

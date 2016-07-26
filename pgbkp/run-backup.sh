#!/bin/sh

# stop if any of these commands fail
set -e

# logs results of this script to stdout and to file
exec &> >(tee -a /code/cron.log)

echo "Starting Postgres backup procedure"

# source all env from temp file created by start.sh
source /tmp/env.sh

DATE=$(date +%Y%m%d_%H%M%S)
PGDUMPFILE="/tmp/$HOSTNAME-$PREFIX-$DATE.sql"
S3_URI="s3://$S3_BUCKET_NAME/"

echo "Running pg_dumpall with user $POSTGRES_USER"
PGPASSWORD="$POSTGRES_PASSWORD" pg_dumpall -h postgres -U "$POSTGRES_USER" > $PGDUMPFILE

echo "Uploading to S3"
/usr/local/bin/aws s3 mv "$PGDUMPFILE" "$S3_URI"

echo "Done."

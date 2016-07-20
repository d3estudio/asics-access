# Credit for lots of this goes to: https://github.com/siomiz/PostgreSQL-S3
set -e # stop if any of these commands fail
source /tmp/env.sh

echo "*** Starting run-backup.sh ***"

DATE=$(date +%Y%m%d_%H%M%S)
PGDUMPFILE="/tmp/$PREFIX-$DATE.sql"
S3_URI="s3://$S3_BUCKET_NAME/$PREFIX-$DATE.sql"

echo "> Running pg_dumpall with user $POSTGRES_USER"
PGPASSWORD="$POSTGRES_PASSWORD" pg_dumpall -h postgres -U "$POSTGRES_USER" > $PGDUMPFILE

echo "> Uploading to S3"
aws s3 cp "$PGDUMPFILE" "$S3_URI"

# Clean up
rm $PGDUMPFILE

echo "Done."

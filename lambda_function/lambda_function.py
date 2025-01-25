import os
import boto3
import json
import psycopg2
import sys

user_name = os.environ['DB_USER']
password = os.environ['DB_PASSWORD']
host = os.environ['DB_HOST']
port = os.environ['DB_PORT']
database = os.environ['DB_NAME']

try:
    conn = psycopg2.connect(
        user=user_name,
        password=password,
        host=host,
        port=port,
        database=database
    )
except Exception as e:
    print(e)
    sys.exit(1)
    
def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
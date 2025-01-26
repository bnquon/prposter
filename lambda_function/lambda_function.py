import os
import boto3
import psycopg2
import sys

# additional layer needed, https://medium.com/@bloggeraj392/creating-a-psycopg2-layer-for-aws-lambda-a-step-by-step-guide-a2498c97c11e

user_name = os.environ['DB_USER']
password = os.environ['DB_PASSWORD']
host = os.environ['DB_HOST']
port = os.environ['DB_PORT']
database = os.environ['DB_NAME']

s3Client = boto3.client('s3')

try:
    conn = psycopg2.connect(
        user=user_name,
        password=password,
        host=host,
        port=port,
        database=database
    )
except Exception as e:
    print(f"Database connection error: {e}")
    sys.exit(1)
    
def lambda_handler(event, context):
    try:
        sql = """ UPDATE public.posts
                SET public_url = %s
                WHERE post_id = %s"""
        
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']
        response = s3Client.get_object(Bucket=bucket, Key=key)

        post_id = response["Metadata"]["post_id"]
        post_id = int(post_id)  # Convert to integer
        
        mediaUrl = f"https://{bucket}.s3.us-west-2.amazonaws.com/{key}"

        with conn.cursor() as cursor:
            cursor.execute(sql, (mediaUrl, post_id))
            conn.commit()

        return {
            'statusCode': 200,
            'body': "URL updated successfully"
        }
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': f"Error: {e}"
        }
    finally:
        conn.close()

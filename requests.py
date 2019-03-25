import os
import json
import requests
from requests_oauthlib import OAuth1
import keys
import tweepy
import base64

def setup():
   # auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
   # auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

   # api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

   request_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=shedd_aquarium'
   auth = OAuth1(keys.CONSUMER_KEY, keys.CONSUMER_SECRET, keys.ACCESS_TOKEN, keys.ACCESS_SECRET)
   tweets = requests.get(url, auth=auth)
   json_rep = json.loads(tweets.text)
   print(json_rep)

if __name__ == "__main__":
   setup()

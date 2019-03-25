import gensim
import json
import sys
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer

# https://towardsdatascience.com/topic-modeling-and-latent-dirichlet-allocation-in-python-9bf156893c24
# https://radimrehurek.com/gensim/models/ldamodel.html

data = [
'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
'Maecenas urna mi, efficitur id congue at, accumsan eu tellus',
'Aliquam sodales turpis ut efficitur placerat',
'Aliquam erat volutpat',
'Etiam posuere egestas massa ac luctus',
'Nunc lobortis elementum leo eu viverra',
'Nunc placerat aliquet sapien posuere vulputate',
'Pellentesque sed nisi et nisi commodo maximus nec non nisl. Nunc fermentum turpis metus, vel blandit ligula pellentesque vitae',
'In vel tincidunt lorem',
'Nunc erat turpis, iaculis id sodales eget, hendrerit ac quam',
'Nunc at libero sapien',
'Nulla in tristique arcu',
'Aenean ligula urna, tristique a velit non, aliquet malesuada nunc',
'Quisque cursus congue bibendum',
'Vestibulum egestas viverra imperdiet',
'Aliquam pellentesque efficitur enim nec dignissim',
'Mauris ac dui est',
'Pellentesque vitae blandit ligula',
'Sed mollis risus et porttitor sodales',
'Nulla id tortor sollicitudin, vehicula velit et, volutpat dui',
'Praesent a molestie nulla',
'Maecenas pulvinar ipsum lorem, ut gravida libero ornare id',
'Proin et pharetra magna',
'In ullamcorper lacus sed ligula pulvinar tincidunt',
'Proin efficitur diam at libero pellentesque maximus',
'Curabitur interdum ornare lacus, vel auctor eros varius eu',
'Sed venenatis viverra augue, in sodales elit dictum quis',
'Donec volutpat ex quis sollicitudin maximus',
'Nam pharetra vel ligula quis posuere',
'Donec vitae ligula malesuada, volutpat nulla eget, laoreet metus',
'Sed libero quam, tincidunt quis pellentesque non, pharetra et ligula',
'Sed venenatis elit vitae dui laoreet, et hendrerit magna lobortis',
'Ut at laoreet arcu',
'In scelerisque sapien ut venenatis tincidunt',
'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos',
'Sed sit amet arcu lacus',
'Vestibulum sollicitudin magna id pretium vestibulum',
'Duis convallis suscipit dolor, convallis interdum lectus convallis ac',
'Nam imperdiet nulla non dolor maximus rutrum'
]

with open('tweets.txt','r') as f:
   data = f.readlines()

lemmatizer = WordNetLemmatizer()

processed_tweets = []
for line in data:
   # line = line.lower().split(' ')
   line = word_tokenize(line.decode('utf8'))
   line = [lemmatizer.lemmatize(w) for w in line if (len(w) > 3)]
   processed_tweets.append(line)

# create model
dictionary = gensim.corpora.Dictionary(processed_tweets)
bow_corpus = [dictionary.doc2bow(doc) for doc in processed_tweets]
tfidf = gensim.models.TfidfModel(bow_corpus)
tfidf_corpus = tfidf[bow_corpus]
model = gensim.models.LdaModel(bow_corpus, num_topics=10, id2word=dictionary)

# sort tweets into topics
# [ (topic_id, tweet) ]
topic_tweets = []
for i in range(len(tfidf_corpus)):
   text = data[i]
   tfidf_tweet = tfidf_corpus[i]
   topics = model.get_document_topics(tfidf_tweet)
   topics.sort(key=lambda x:x[1])
   top_topic = topics[0][0]
   topic_tweets.append((top_topic,text))

# get top words for all topics
# [ ( topic_id, [ words ] ) ]
topic_words = model.show_topics(formatted=False,num_topics=-1,num_words=5)
topic_words = [(x[0], [y[0] for y in x[1]]) for x in topic_words]

# put the above two lists into one json
# [ { topic_id : { tweets : [], words : [] } } ]
finalData = {}
for topic in topic_words:
   finalData[topic[0]] = { 'tweets' : [], 'words' : topic[1] }
for tweet in topic_tweets:
   finalData[tweet[0]]['tweets'].append(tweet[1])

with open('sorted_tweet_data.json', 'w') as outfile:
   json.dump(finalData, outfile)

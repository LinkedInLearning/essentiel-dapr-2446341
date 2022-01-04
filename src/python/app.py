#dependencies
from cloudevents.sdk.event import v1
from dapr.ext.grpc import App
import logging
import json

#code
app = App()
logging.basicConfig(level = logging.ERROR)
#Subscribe to a topic 
@app.subscribe(pubsub_name='linkedin-dapr-pubsub', topic='product-created')
def mytopic(event: v1.Event) -> None:
    data = json.loads(event.Data())
    logging.info('Message reçu : ' + str(data))

logging.info('Application lancée !')

app.run(6002)
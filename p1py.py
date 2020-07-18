import sys
from pycricbuzz import Cricbuzz
import json
c = Cricbuzz()
matches = c.matches()
eyed=matches[0]["id"]
# def live_score(eyed):
data = c.livescore(eyed)


resp = {
"Response":200,
"msg" : "Hello",
"Data": data

}
print(json.dumps(resp,indent=4))
sys.stdout.flush()

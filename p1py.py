import sys
from pycricbuzz import Cricbuzz
import json
c = Cricbuzz()
matches = c.matches()
# print(json.dumps(matches,indent=4))
livematchesinfo=list()
for i in range(len(matches)):
    eyed=matches[i]["id"]
    info=c.livescore(eyed)
    livematchesinfo.append(info)
# def live_score(eyed):


resp = {
"Response":200,
"msg" : "Hello",
"livematchesinfo": livematchesinfo,
"livematches":matches

}
print(json.dumps(resp,indent=4))
sys.stdout.flush()

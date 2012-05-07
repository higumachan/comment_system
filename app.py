from flask import *
import pymongo

app = Flask(__name__);

@app.before_request
def before_request():
    g.db = pymongo.Connection().test_comment;

@app.route("/")
def index():
    enbeded_url = request.args["url"]
    return (render_template("presentation.html", url=enbeded_url));

@app.route("/post", methods=["GET", "POST"])
def post_comment():
    if (request.method == "POST"):
        result = make_response(redirect("/post"));
        comment = request.form["comment"];
        new_id = g.db.comments.count();
        g.db.comments.insert({"_id": new_id, "comment": comment, "show": False});
    else:
        result = make_response(render_template("post_comment.html"));
    
    return (result);

@app.route("/getcomment")
def get_comment():
    result = list(g.db.comments.find({"show": False}));
    for res in result:
        res["show"] = True;
        g.db.comments.save(res);
    #g.db.comments.update({"show": False}, {"$set": {"show": True}}, False, True);

    return (json.dumps(list(result)));

if __name__ == "__main__":
    app.debug = True;
    app.run();


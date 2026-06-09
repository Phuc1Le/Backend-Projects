from flask import Flask, request
from proxy import proxy_request

app = Flask(__name__)


@app.route(
    "/",
    defaults={"path": ""}
)
@app.route("/<path:path>")
def proxy(path):
    return proxy_request(
        path,
        request.query_string.decode()
    )


if __name__ == "__main__":
    app.run(port=3000)
from flask import Flask, request
from proxy import proxy_request
import argparse
import config

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
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--port",
        type=int,
        required=True
    )
    parser.add_argument(
        "--origin",
        required=True
    )
    args = parser.parse_args()
    config.PORT = args.port
    config.ORIGIN = args.origin
    app.run(port = config.PORT)
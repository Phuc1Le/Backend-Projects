import requests
from flask import Response
from flask import request
from cache import (
    get_cache,
    set_cache
)

ORIGIN = "https://dummyjson.com"

def proxy_request(path, query_string):
    cache_key = path
    if query_string:
        cache_key += f"?{query_string}"
    cached_response = get_cache(cache_key)
    if cached_response:
        print(f"CACHE HIT: {cache_key}")
        return Response(
            cached_response["content"],
            status=cached_response["status"],
            content_type=cached_response["content_type"],
            headers={
                "X-Cache": "HIT"
            }
        )
    print(f"CACHE MISS: {cache_key}")
    target_url = f"{ORIGIN}/{cache_key}"
    response = requests.get(target_url)
    set_cache(
        cache_key,
        {
            "content": response.content,
            "status": response.status_code,
            "content_type": response.headers.get(
                "Content-Type",
                "application/json"
            )
        }
    )
    return Response(
        response.content,
        status=response.status_code,
        content_type=response.headers.get(
            "Content-Type",
            "application/json"
        ),
        headers={
            "X-Cache": "MISS"
        }
    )
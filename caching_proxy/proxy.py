import requests
from flask import Response
import time
from cache import (
    get_cache,
    set_cache,
    delete_cache
)
import config
CACHE_TTL = 10
def proxy_request(path, query_string):
    target_url = (
        f"{config.ORIGIN}/{path}"
    )
    
    if query_string:
        target_url += f"?{query_string}"
    cache_key = target_url
    cached_response = get_cache(cache_key)
    if cached_response:
        age = time.time() - cached_response["cached_at"]
        if age < CACHE_TTL:
            print(f"CACHE HIT: {cache_key}")
            return Response(
                cached_response["content"],
                status=cached_response["status"],
                content_type=cached_response["content_type"],
                headers={
                    "X-Cache": "HIT"
                }
            )
        delete_cache(cache_key)
    print(f"CACHE MISS: {cache_key}")
    
    response = requests.get(target_url)
    set_cache(
        cache_key,
        {
            "content": response.content,
            "status": response.status_code,
            "content_type": response.headers.get(
                "Content-Type",
                "application/json"
            ),
            "cached_at": time.time()
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
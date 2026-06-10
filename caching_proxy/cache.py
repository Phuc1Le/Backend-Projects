cache = {}


def get_cache(key):
    return cache.get(key)


def set_cache(key, value):
    cache[key] = value

def delete_cache(key):
    cache.pop(key, None)
    
def clear_cache():
    cache.clear()
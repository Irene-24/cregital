const staticAssets =
[
    './',
    './style.css',
    './index.js',
    './img/vamera.png',
    './img/boat.jpg',
    './results.html',
    './results.css',
];


self.addEventListener('install', async event =>
{
    const cache = await caches.open('pv');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event =>
{
  const req =  event.request;
  const url = new URL(req.url);
  
  if(url.origin === location.origin)
  {
    event.respondWith(cacheFirst(req));
  }
  else
  {
    event.respondWith(networkFirst(req));
  }
 
});

async function cacheFirst(req)
{
    const cachedResp = await caches.match(req);
    return cachedResp || fetch(req);
}

async function networkFirst(req)
{
    const cache = await caches.open('pv-dynamic');

    try 
    {
        const res = await fetch(req);
        cache.put(req,res.clone());
        return res;
    } 
    catch (error) 
    {
        const cachedResp = await cache.match(req);
        return cachedResp || 'You are not connected';
    }


    
}

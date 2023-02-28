# crawlPhotos

We use this service to crawl animal photos and aggregate the results. This service allow us to change source of photos or any changes that require, will happen here.

## Arguments

`series: number`: How much time to crawl for every type of animal. For example we have 3 types of animals right now, so 1 series will fetch at the end 3 photos. For 2 series, it will fetch 6 photos and etc.

## Returns

Array of photos structure below:

```
[
  {
    type: 'fox' | 'cat' | 'dog';
    url: string;
  }
]
```

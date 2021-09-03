# Category-Tree

[https://category-tree.app](https://category-tree-hv9gxsdrs-vitamin4ik.vercel.app/)

## Save (and Load) this Category-Tree in LocalStorage

- Save on event `beforeunload`, load then app starts.

## Testing

- add **jest** to project

## Typings

- add TypeScript version (git branch typeScript)

## Deployment

- Used pre-commit git hook to generate new Service Worker before each commit.
- Add **.git/hooks/pre-commit** file

```js
#!/bin/sh
if workbox generateSW workbox-config.ts ; then
  git add sw.js
  exit 0
else
  echo "Cannot generate sw.js"
  echo "Aborting"
fi
```

- Add a webhook by setting up a basic CI/CD process using [Travis CI](https://travis-ci.org/) and [AWS](https://aws.amazon.com/)
- Through [AWS Console](https://console.aws.amazon.com/console/home) S3 service, create two buckets for staging (develop branch) and production (main branch)
- Create **.travis.yml**.

```js
language: node_js
node_js:
  - 11.13.0
script:
  - npm install --global workbox-cli
  - workbox generateSW workbox-config.ts
deploy:
  - provider: s3
    skip_cleanup: true
    access_key_id: $ACCESS_KEY_ID
    secret_access_key: $SECRET_ACCESS_KEY
    bucket: "category-tree-staging"
    region: eu-central-1
    acl: public_read
    on:
      branch: develop
  - provider: s3
    skip_cleanup: true
    access_key_id: $ACCESS_KEY_ID
    secret_access_key: $SECRET_ACCESS_KEY
    bucket: "category-tree-production"
    region: eu-central-1
    acl: public_read
    on:
      branch: main
```

- integrate with [Zeit Now](https://vercel.com/)
- add **now.json** and run `sudo npm install --global --unsafe-perm now`

const sanityClient = require('@sanity/client')

export const client = sanityClient({
  projectId: 't5wbn8ep',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: 'skl6WAsz7FxgWywXbzRZgNydG6cpHd5PRZpUYeXFQ5JZz16EJQE56GkCbjRr90lhgPfbG4f3eNJjyfs5i6F7M1mOoktpKBECr8TMrTahL3q1o0pZcIm6vqwFnt27dqKJTxq28mfu4Udnw5lXCsDWUmnZ8uw8mLmZDFAQ5iasWi3DXSbMKaNz'
});

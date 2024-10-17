import express from 'express';
import { translationApi } from './src/translation-api';
import { helloWorldApi } from './src/hello-world-api';

const app = express()

const port = 8080

app.use(express.json())


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})

app.get('/', helloWorldApi)

app.post('/api/translation', translationApi)

export default app;
import expressAsyncHandler from 'express-async-handler'

export const helloWorldApi = expressAsyncHandler(async (req, res) => {
    res.send('Hello World!')
});
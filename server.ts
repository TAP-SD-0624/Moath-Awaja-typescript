import express from 'express';
import imageRoutes from './src/routes/imageRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/images', imageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

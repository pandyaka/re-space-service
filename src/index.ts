import { createApp } from './app';

(async () => {
    try {
        const app = await createApp();
        const port: number = Number(process.env.PORT) || 3000;
        app.listen(port, () => {
            console.log('App is starting');
        });
    } catch (error) {
        console.log(error);
    }
})();

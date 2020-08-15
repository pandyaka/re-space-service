import { Dockest } from 'dockest'; // eslint-disable-line

const dockest = new Dockest({
    composeFile: 'docker-compose.test.yml'
});

const dockestServices = [
    {
        serviceName: 'postgres-test'
    }
];

dockest.run(dockestServices);

import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: ClientsModuleOptions = [
  {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'task-manager',
        brokers: ['kafka:9093'], // Assure-toi que ce hostname est bien celui défini dans docker-compose
      },
      consumer: {
        groupId: 'notification-group',
      },
    },
  },
];

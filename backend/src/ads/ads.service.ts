import { Inject, Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';


@Injectable()
export class AdsService {

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9093'],
      },
    },
  })
  private client: ClientKafka;

  constructor(
    @InjectModel(Ad.name) private adModel: Model<Ad>,
    // @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

  create(createAdDto: CreateAdDto) {
    // const newAd = new this.adModel(createAdDto);
    // const savedAd = newAd.save();

    // Publier un événement sur Kafka après l'enregistrement
    // this.kafkaClient.emit('ad.created', { id: savedAd._id, ...createAdDto });

    // this.client.emit('ad.added', savedAd);

    // return savedAd;

    const newAd = new this.adModel(createAdDto);
    return newAd.save();
  }

  findAll() {
    return this.adModel.find().exec();
  }

  findOne(id: string) {
    return this.adModel.findById(id).exec();
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return this.adModel.findByIdAndUpdate(id, updateAdDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.adModel.findByIdAndDelete(id).exec();
  }
}

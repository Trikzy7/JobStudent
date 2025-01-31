import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad.name) private adModel: Model<Ad>) {}


  create(createAdDto: CreateAdDto) {
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

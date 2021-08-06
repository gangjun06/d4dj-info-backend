import { Card, Character, Unit } from '@/character/character';
import { Music } from '@/music/music';
import { PrismaService } from '@/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { Resource, ResourceType } from './resource';

@Injectable()
export class ResourceService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // ex) StartDate -> startDate
  private formatText(str: string): string {
    const splited = str.replace(/__/gi, '').split('');
    return splited[0].toLowerCase() + splited.slice(1).join('');
  }

  private parse<T>(json: object): T[] {
    let newObj: T[] = [];
    Object.keys(json).forEach((key) => {
      let objItem: T = {} as T;
      Object.keys(json[key]).forEach((key2) => {
        objItem[this.formatText(key2)] = json[key][key2];
      });
      newObj.push(objItem as T);
    });
    return newObj;
  }

  async getResources(target: ResourceType): Promise<void> {
    if (target === ResourceType.Music) {
      const res = await axios.get(
        'https://api.d4dj.info/api/file/download?path=Master/MusicMaster.json',
      );
      const result = this.parse<Music>(res.data);
    } else if (target === ResourceType.Character) {
      {
        const res = await axios.get(
          'https://api.d4dj.info/api/file/download?path=Master/UnitMaster.json',
        );
        const result = this.parse<Unit>(res.data);
        let insertData: Prisma.UnitCreateManyInput[] = [];

        result.forEach((item) => {
          insertData.push({
            ...item,
          });
        });

        await this.prismaService.unit.createMany({
          data: insertData,
          skipDuplicates: true,
        });
      }
      {
        const res = await axios.get(
          'https://api.d4dj.info/api/file/download?path=Master/CharacterMaster.json',
        );
        const result = this.parse<Character>(res.data);
        let insertData: Prisma.CharacterCreateManyInput[] = [];

        result.forEach((item) => {
          insertData.push({
            id: item.id,
            colorCode: item.colorCode,
            firstName: item.firstName,
            firstNameEnglish: item.firstNameEnglish,
            fullName: item.fullName,
            fullNameEnglish: item.fullNameEnglish,
            unitPrimaryKey: item.unitPrimaryKey,
          });
        });
        await this.prismaService.character.createMany({
          data: insertData,
          skipDuplicates: true,
        });
      }
      {
        const res = await axios.get(
          'https://api.d4dj.info/api/file/download?path=Master/CardMaster.json',
        );
        const result = this.parse<Card>(res.data);
        let insertData: Prisma.CardCreateManyInput[] = [];

        result.forEach((item) => {
          insertData.push({
            ...item,
          });
        });
        await this.prismaService.card.createMany({
          data: insertData,
          skipDuplicates: true,
        });
      }
    }
  }
}

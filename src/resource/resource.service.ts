import { Music } from '@/music/music';
import { PrismaService } from '@/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
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
      let objItem = {};
      Object.keys(json[key]).forEach((key2) => {
        objItem[this.formatText(key2)] = json[key][key2];
      });
      newObj.push(objItem as T);
    });
    console.log(newObj);
    return newObj;
  }

  async getResources(target: ResourceType): Promise<void> {
    if (target === ResourceType.Music) {
      const res = await axios.get("https://api.d4dj.info/api/file/download?path=Master/MusicMaster.json")
      const result = this.parse<Music>(res.data);
      console.log(result)
    }
  }
}
